/**
 * Google Analytics 4 utility functions
 * Requires VITE_GA_MEASUREMENT_ID environment variable
 */

function isValidGAMeasurementId(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Avoid shipping the placeholder measurement id
  if (trimmed === 'G-XXXXXXXXXX') return false;
  return /^G-[A-Z0-9]+$/i.test(trimmed);
}

const GA_ID_RAW = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GA_ID = isValidGAMeasurementId(GA_ID_RAW) ? GA_ID_RAW.trim() : undefined;

interface GtagConfig {
  page_path?: string;
  page_title?: string;
  [key: string]: any;
}

interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

// Track whether GA initialization failed
let gaInitFailed = false;

declare global {
  interface Window {
    gtag: {
      (command: 'js', timestamp: Date): void;
      (command: 'config', targetId: string, config?: GtagConfig): void;
      (command: 'event', eventName: string, params?: GtagEvent): void;
    };
    dataLayer: any[];
  }
}

/**
 * Check if GA initialization failed
 */
export function isGAInitFailed(): boolean {
  return gaInitFailed;
}

/**
 * Initialize Google Analytics 4
 * Injects GA4 script tag into document head
 * Should be called once on app initialization (in root layout)
 */
export function initializeGA(): void {
  // Validate GA ID exists
  if (!GA_ID) {
    if (typeof window !== 'undefined') {
      console.warn(
        'Google Analytics disabled: set VITE_GA_MEASUREMENT_ID (e.g. G-4SZN0VFKVC) in your environment.'
      );
    }
    return;
  }

  // Inject GA4 script
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    
    // Add error handler for script loading failures
    script.onerror = (error) => {
      gaInitFailed = true;
      console.error(`Failed to load Google Analytics script for GA_ID: ${GA_ID}`, error);
    };
    
    document.head.appendChild(script);

    // Initialize gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
}

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>): void {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }
  window.gtag('event', eventName, eventData);
}

/**
 * Track a page view (called when route changes)
 */
export function trackPageView(path: string, title?: string): void {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }
  window.gtag('config', GA_ID, {
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
