/**
 * Google Analytics 4 utility functions
 * Requires VITE_GA_MEASUREMENT_ID environment variable
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

interface GtagConfig {
  [key: string]: any;
}

interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag: (command: 'config' | 'event' | 'js', targetId: string, config?: GtagConfig | GtagEvent) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics 4
 * Injects GA4 script tag into document head
 * Should be called once on app initialization (in root layout)
 */
export function initializeGA(): void {
  // Validate GA ID exists
  if (!GA_ID) {
    if (typeof globalThis !== 'undefined' && !('__SVELTEKIT_ADAPTER__' in globalThis)) {
      console.warn('Google Analytics 4 ID (VITE_GA_MEASUREMENT_ID) not configured. Analytics disabled.');
    }
    return;
  }

  // Inject GA4 script
  if (typeof globalThis !== 'undefined' && 'document' in globalThis) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // Initialize gtag function
    (globalThis as any).dataLayer = (globalThis as any).dataLayer || [];
    (globalThis as any).gtag = function (...args: any[]) {
      (globalThis as any).dataLayer.push(args);
    };
    (globalThis as any).gtag('js', new Date());
    (globalThis as any).gtag('config', GA_ID);
  }
}

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>): void {
  if (!GA_ID || typeof globalThis === 'undefined' || !(globalThis as any).gtag) {
    return;
  }
  (globalThis as any).gtag('event', eventName, eventData);
}

/**
 * Track a page view (called when route changes)
 */
export function trackPageView(path: string, title?: string): void {
  if (!GA_ID || typeof globalThis === 'undefined' || !(globalThis as any).gtag) {
    return;
  }
  (globalThis as any).gtag('config', GA_ID, {
    page_path: path,
    page_title: title
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent('form_submission', {
    form_name: formName,
    success: success
  });
}

/**
 * Track contact/service request
 */
export function trackContactRequest(service: string): void {
  trackEvent('contact_request', {
    service: service
  });
}
