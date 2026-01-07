import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const eventData = await request.json();

    // Validate request payload
    if (!eventData || typeof eventData !== 'object') {
      return json({
        success: false,
        error: 'Invalid request body'
      }, { status: 400 });
    }

    const { event, parameters } = eventData;

    // Validate event field
    if (!event || typeof event !== 'string' || event.trim().length === 0) {
      return json({
        success: false,
        error: 'Event name is required and must be a non-empty string'
      }, { status: 400 });
    }

    // Validate parameters field
    if (parameters !== undefined && (typeof parameters !== 'object' || parameters === null)) {
      return json({
        success: false,
        error: 'Parameters must be an object or omitted'
      }, { status: 400 });
    }

    // In development, just log the event
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', { event, parameters, timestamp: new Date().toISOString() });
    }

    // In production, you would send to GA4 or other analytics service
    // For now, just return success

    return json({
      success: true
    });

  } catch (err) {
    console.error('Analytics error:', err);
    throw error(500, 'Internal server error');
  }
};