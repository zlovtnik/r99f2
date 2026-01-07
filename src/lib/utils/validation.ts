import type { ContactFormData } from '../types';

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!data.phone || !/^\d{10}$/.test(data.phone.replaceAll(/\D/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export function validateEmail(email: string): boolean {
  // Simplified but effective email regex that handles most common cases
  // Allows: local@domain.tld, user.name+tag@domain.co.uk, "quoted"@domain.com
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return emailRegex.test(email);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replaceAll(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}
