<script lang="ts">
  export let url: string;
  export let title: string = 'Video';
  export let aspectRatio: '16:9' | '4:3' | '1:1' = '16:9';

  // Valid YouTube hostnames (exact match)
  const YOUTUBE_HOSTNAMES = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
    'www.youtu.be'
  ]);

  // Valid Vimeo hostnames (exact match)
  const VIMEO_HOSTNAMES = new Set([
    'vimeo.com',
    'www.vimeo.com',
    'player.vimeo.com'
  ]);

  // YouTube video IDs: 11 characters, alphanumeric plus dash and underscore
  const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

  // Vimeo video IDs: numeric only
  const VIMEO_ID_PATTERN = /^\d+$/;

  // Parse video URL to get embed URL
  function getEmbedUrl(videoUrl: string): string | null {
    if (!videoUrl) return null;

    try {
      const urlObj = new URL(videoUrl);
      const hostname = urlObj.hostname.toLowerCase();

      // YouTube - strict hostname check
      if (YOUTUBE_HOSTNAMES.has(hostname)) {
        let videoId = '';
        
        if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
          // Short URL: https://youtu.be/VIDEO_ID
          videoId = urlObj.pathname.slice(1).split('/')[0] || '';
        } else if (urlObj.searchParams.has('v')) {
          // Standard URL: https://www.youtube.com/watch?v=VIDEO_ID
          videoId = urlObj.searchParams.get('v') || '';
        } else if (urlObj.pathname.startsWith('/embed/')) {
          // Embed URL: https://www.youtube.com/embed/VIDEO_ID
          videoId = urlObj.pathname.split('/embed/')[1]?.split('/')[0] || '';
        } else if (urlObj.pathname.startsWith('/v/')) {
          // Old format: https://www.youtube.com/v/VIDEO_ID
          videoId = urlObj.pathname.split('/v/')[1]?.split('/')[0] || '';
        }

        // Clean the ID (remove any query/hash fragments that might have slipped through)
        videoId = videoId.split('?')[0].split('#')[0];

        // Validate YouTube ID format
        if (videoId && YOUTUBE_ID_PATTERN.test(videoId)) {
          return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
        }
      }

      // Vimeo - strict hostname check
      if (VIMEO_HOSTNAMES.has(hostname)) {
        // Extract ID from pathname, handling various formats
        // /VIDEO_ID, /video/VIDEO_ID, /channels/CHANNEL/VIDEO_ID
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        let vimeoId = '';

        // Find the numeric ID in the path
        for (let i = pathParts.length - 1; i >= 0; i--) {
          const part = pathParts[i].split('?')[0].split('#')[0];
          if (VIMEO_ID_PATTERN.test(part)) {
            vimeoId = part;
            break;
          }
        }

        // Validate Vimeo ID is numeric
        if (vimeoId && VIMEO_ID_PATTERN.test(vimeoId)) {
          return `https://player.vimeo.com/video/${vimeoId}?dnt=1`;
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  $: embedUrl = getEmbedUrl(url);
  $: aspectClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square'
  }[aspectRatio];
</script>

{#if embedUrl}
  <div class="video-embed rounded-xl overflow-hidden shadow-lg bg-gray-900">
    <div class={aspectClass}>
      <iframe
        src={embedUrl}
        {title}
        class="w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
      ></iframe>
    </div>
  </div>
{:else}
  <div class="video-embed-error bg-gray-100 rounded-xl p-8 text-center">
    <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
    <p class="text-gray-600">Video unavailable</p>
    <p class="text-gray-400 text-sm mt-1">Please check the video URL</p>
  </div>
{/if}

<style>
  .aspect-4\/3 {
    aspect-ratio: 4 / 3;
  }
</style>
