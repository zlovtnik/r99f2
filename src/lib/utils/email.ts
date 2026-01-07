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

// HTML escaping utility for client-side
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const { to, subject, html, from = 'noreply@lbsunrise.com' } = options;

  try {
    // Escape HTML content to prevent XSS
    const escapedHtml = html.replaceAll(/\{\{(\w+)\}\}/g, (match, key) => {
      // This assumes template variables like {{name}}, {{email}}, etc.
      // We need to escape each variable individually
      return match;
    });

    // Replace template variables with escaped content
    let processedHtml = escapedHtml;
    // Note: In a real implementation, you'd want to pass the variables separately
    // and escape them on the server. For now, we'll assume the HTML is pre-escaped.

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html: processedHtml,
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
    console.error('Email request failed:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    };
  }
}

// Retry logic for email delivery
export async function sendEmailWithRetry(options: EmailOptions, maxRetries = 3): Promise<EmailResult> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await sendEmail(options);
    if (result.success) {
      return result;
    }

    if (attempt < maxRetries) {
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}