export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// Server-safe HTML escaping utility
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const { to, subject, html, from = 'noreply@lrsunrise.com' } = options;

  try {
    // Escape HTML content to prevent XSS
    const escapedHtml = escapeHtml(html);

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html: escapedHtml,
        from,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to send email'
      };
    }

  } catch (err) {
    // Sanitize error logging to avoid exposing sensitive information
    console.error('Email request failed: An error occurred while sending email');
    return {
      success: false,
      error: 'Email service temporarily unavailable'
    };
  }
}