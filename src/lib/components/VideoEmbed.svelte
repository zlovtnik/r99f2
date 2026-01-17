<script lang="ts">
  export let url: string;
  export let title: string = 'Video';
  export let aspectRatio: '16:9' | '4:3' | '1:1' = '16:9';

  // Parse video URL to get embed URL
  function getEmbedUrl(videoUrl: string): string | null {
    if (!videoUrl) return null;

    try {
      const urlObj = new URL(videoUrl);
      const hostname = urlObj.hostname.toLowerCase();

      // YouTube
      if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
        let videoId = '';
        
        if (hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        } else if (urlObj.searchParams.has('v')) {
          videoId = urlObj.searchParams.get('v') || '';
        } else if (urlObj.pathname.includes('/embed/')) {
          videoId = urlObj.pathname.split('/embed/')[1]?.split('?')[0] || '';
        }

        if (videoId) {
          return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
        }
      }

      // Vimeo
      if (hostname.includes('vimeo.com')) {
        const vimeoId = urlObj.pathname.split('/').pop();
        if (vimeoId) {
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
