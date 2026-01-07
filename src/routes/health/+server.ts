import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  // Perform lightweight readiness checks
  // In a real app, you might check database connections, external services, etc.
  // For now, we just return 200 OK since the app is running

  try {
    // Basic health check - app is responding
    return new Response(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    // If anything goes wrong, return unhealthy status
    return new Response(JSON.stringify({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
};