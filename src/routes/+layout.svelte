<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeGA } from '$lib/utils/analytics';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		// Initialize Google Analytics 4 on app load (browser only)
		try {
			initializeGA();
		} catch (error) {
			const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'not configured';
			console.error(`Failed to initialize Google Analytics (GA_ID: ${gaId}):`, error);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
