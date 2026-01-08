<script lang="ts">
  export let heightValue: string = '12rem';
  export let rounded: boolean = true;
  export let lines: number = 3;

  $: safeLines = Math.max(1, Math.floor(Number(lines) || 3));
</script>

<div class="animate-pulse">
  <div class="bg-gray-200 mb-4" style="height: {heightValue}" class:rounded={rounded}></div>
  <div class="space-y-2">
    {#each Array.from({ length: safeLines }) as _}
      <div class="h-4 bg-gray-200 rounded"></div>
    {/each}
  </div>
</div>