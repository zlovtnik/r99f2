<script lang="ts">
  export let icon: string;
  export let colorClass: string = 'text-white';

  function getIconPath(iconName: string): string {
    switch (iconName) {
      case 'trending-up':
        return 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6';
      case 'zap':
        return 'M13 10V3L4 14h7v7l9-11h-7z';
      case 'shield':
        return 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z';
      case 'palette':
        return 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z';
      case 'clock':
        return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return 'M9 12l2 2 4-4m6 10.5V7l-3-3H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z'; // document page with checkmark overlay
    }
  }
</script>

<svg class="w-3 h-3 {colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(icon)}/>
</svg>