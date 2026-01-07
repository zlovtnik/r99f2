<script lang="ts">
  import type { SchemaMarkup } from '$lib/types/seo';

  export let schema: SchemaMarkup;
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
