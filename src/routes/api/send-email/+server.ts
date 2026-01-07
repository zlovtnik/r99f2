import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// HTML escaping utility
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// PII sanitization utility
function sanitizeError(errorText: string): string {
  // Redact email addresses
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
  return errorText.replaceAll(emailRegex, '[EMAIL_REDACTED]');
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate request body
    if (!body || typeof body !== 'object') {
      return json({
        success: false,
        error: 'Invalid request body'
      }, { status: 400 });
    }

    const { to, subject, html, from } = body;

    // Validate required fields
    if (!to || typeof to !== 'string' || !to.trim()) {
      return json({
        success: false,
        error: 'Recipient email is required'
      }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return json({
        success: false,
        error: 'Subject is required'
      }, { status: 400 });
    }

    if (!html || typeof html !== 'string' || !html.trim()) {
      return json({
        success: false,
        error: 'HTML content is required'
      }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return json({
        success: false,
        error: 'Invalid recipient email format'
      }, { status: 400 });
    }

    // Get API key from server environment
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SENDGRID_API_KEY not configured on server');
      return json({
        success: false,
        error: 'Email service not configured'
      }, { status: 500 });
    }

    // Note: HTML escaping should be handled by the client before sending
    const emailHtml = html;

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }],
          subject: subject,
        }],
        from: { email: from || 'noreply@lbsunrise.com' },
        content: [{
          type: 'text/html',
          value: emailHtml,
        }],
      }),
    });

    if (response.ok) {
      return json({ success: true });
    } else {
      const errorText = await response.text();
      const sanitizedError = sanitizeError(errorText);

      // Log sanitized error server-side only
      console.error('SendGrid error:', {
        status: response.status,
        sanitizedError: sanitizedError.substring(0, 200) // Limit log size
      });

      return json({
        success: false,
        error: 'Failed to send email'
      }, { status: 500 });
    }

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const sanitizedError = sanitizeError(errorMessage);

    console.error('Email sending failed:', {
      sanitizedError: sanitizedError.substring(0, 200)
    });

    return json({
      success: false,
      error: 'Failed to send email'
    }, { status: 500 });
  }
};