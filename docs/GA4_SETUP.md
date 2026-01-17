# Google Analytics 4 Setup Guide

## Quick Start

### 1. Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for "lrsunrise.com"
3. Configure it as a **website** property
4. Get your **Measurement ID** (format: G-XXXXXXXXXX)

### 2. Configure Environment Variable

**Development:**
```bash
# Create .env.local file in project root (backup existing file if present)
[ -f .env.local ] && cp .env.local .env.local.backup
echo "VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env.local
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

**Production (Vercel):**
1. Go to Vercel dashboard → Project settings → Environment Variables
2. Add new variable: `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
3. Apply to Production, Preview, and Development environments

### 3. Test Analytics

**In Development:**
```bash
npm run dev
```

Open browser DevTools → Network tab:
- Search for `gtag` requests
- Should see requests to `googletagmanager.com`
- Check Console for any warnings about missing GA ID

**Real-Time Dashboard:**
1. Navigate to Google Analytics console
2. Go to Real-Time dashboard
3. Navigate through your website
4. You should see live user activity

### 4. Test Events

The following events are automatically tracked:

- **Page Views**: When user navigates to a page
- **form_submission**: When contact form is submitted
- **contact_request**: When user clicks on a service or service area

### 5. Validation

- GA4 ID is validated at app startup
- If missing in development, a console warning is logged
- Production deployment requires GA4 ID in Vercel environment variables

## File Locations

- **Analytics Implementation**: `src/lib/utils/analytics.ts`
- **Initialization**: `src/routes/+layout.svelte` (in `onMount` hook)
- **Environment Example**: `.env.example`
- **Development Config**: `.env.local` (not committed, local development only)

## Troubleshooting

### No events appearing in GA4
1. Verify `VITE_GA_MEASUREMENT_ID` is set correctly
2. Check DevTools Network tab for gtag requests
3. Check DevTools Console for any errors
4. Allow 24-48 hours for GA4 to fully activate

### GA4 ID validation fails
1. Ensure ID format is correct (G-XXXXXXXXXX)
2. Verify ID is copied exactly from Google Analytics console
3. Check that environment variable is properly set

### Analytics not loading on production
1. Verify environment variable is set in Vercel dashboard
2. Trigger a new deployment after setting the variable
3. Check Vercel deployment logs for any errors

## Links

- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)
- [GA4 Property ID](https://support.google.com/analytics/answer/12270356)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Verify GA Implementation](https://support.google.com/analytics/answer/1008080)
