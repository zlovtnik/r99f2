/**
 * Formats a phone number string into a readable US format.
 * Handles 10-digit US numbers, 11-digit numbers with leading '1',
 * and returns the original string for other formats.
 * 
 * @param phone - The phone number string to format
 * @returns Formatted phone number or original string if format not recognized
 */
export function formatPhoneNumber(phone: string): string {
  // Strip all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Handle 11-digit numbers starting with '1' (US country code)
  if (digits.length === 11 && digits.startsWith('1')) {
    const areaCode = digits.slice(1, 4);
    const exchange = digits.slice(4, 7);
    const subscriber = digits.slice(7, 11);
    return `(${areaCode}) ${exchange}-${subscriber}`;
  }
  
  // Handle standard 10-digit US numbers
  if (digits.length === 10) {
    const areaCode = digits.slice(0, 3);
    const exchange = digits.slice(3, 6);
    const subscriber = digits.slice(6, 10);
    return `(${areaCode}) ${exchange}-${subscriber}`;
  }
  
  // Return original for other formats (international, extensions, etc.)
  return phone;
}
