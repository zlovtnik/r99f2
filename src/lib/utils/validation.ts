import type { ContactFormData } from '../types';
import { services } from '../data/services';

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

  const validServiceSlugs = services.map(service => service.slug);
  if (!data.service || !validServiceSlugs.includes(data.service)) {
    errors.service = 'Please select a valid service';
  }

  if (!data.zipCode || !/^\d{5}(?:-\d{4})?$/.test(data.zipCode)) {
    errors.zipCode = 'Please enter a valid US ZIP code (e.g., 04101 or 04101-1234)';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export function validateEmail(email: string): boolean {
  // Simple and secure email regex to prevent ReDoS attacks
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replaceAll(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}
