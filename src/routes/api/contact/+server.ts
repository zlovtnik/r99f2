import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateContactForm } from '$lib/utils/validation';
import { sendEmail } from '$lib/utils/email';

const RATE_LIMIT_WINDOW_SECONDS = Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 60);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 10);

type RateLimitRecord = {
  count: number;
  expiresAt: number;
};

const rateLimitStore = new Map<string, RateLimitRecord>();

function getClientKey(request: Request, getClientAddress: () => string): string {
  const forwardedHeader = request.headers.get('x-forwarded-for');
  if (forwardedHeader) {
    const ip = forwardedHeader.split(',')[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  try {
    return getClientAddress();
  } catch {
    return 'unknown';
  }
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW_SECONDS * 1000;
  const record = rateLimitStore.get(key);

  if (!record || record.expiresAt <= now) {
    rateLimitStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((record.expiresAt - now) / 1000) };
  }

  record.count += 1;
  return { allowed: true };
}

// HTML escaping utility
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  if (!ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is required to send contact form emails.');
    return json({
      success: false,
      error: 'Email service not configured'
    }, { status: 500 });
  }

  const clientKey = getClientKey(request, getClientAddress);
  const rateStatus = checkRateLimit(clientKey);

  if (!rateStatus.allowed) {
    const headers: HeadersInit | undefined = rateStatus.retryAfter
      ? { 'Retry-After': String(rateStatus.retryAfter) }
      : undefined;
    return json({
      success: false,
      error: 'Too Many Requests'
    }, { status: 429, headers });
  }

  try {
    const formData = await request.json();
    const { name, email, phone, zip, service, message } = formData;

    // Validate form data
    const validation = validateContactForm({ name, email, phone, zipCode: zip, service, message });
    if (Object.keys(validation).length > 0) {
      return json({
        success: false,
        errors: validation
      }, { status: 400 });
    }

    // Escape user inputs to prevent XSS
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = escapeHtml(phone);
    const escapedZip = escapeHtml(zip);
    const escapedService = escapeHtml(service);
    const escapedMessage = escapeHtml(message);

    // Send email
    const emailResult = await sendEmail({
      to: ADMIN_EMAIL,
      subject: 'New Contact Form Submission - LB Sunrise Roofing',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Phone:</strong> ${escapedPhone}</p>
        <p><strong>ZIP Code:</strong> ${escapedZip}</p>
        <p><strong>Service:</strong> ${escapedService}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage.replaceAll('\n', '<br>')}</p>
      `
    });

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return json({
        success: false,
        error: 'Failed to send email. Please try again later.'
      }, { status: 500 });
    }

    return json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.'
    });

  } catch (err) {
    console.error('Contact form error:', err);
    throw error(500, 'Internal server error');
  }
};