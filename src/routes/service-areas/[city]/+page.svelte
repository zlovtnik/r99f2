<script lang="ts">
  import ServiceAreaPage from '$lib/components/ServiceAreaPage.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ServiceAreaPage areaSlug={data.city} />