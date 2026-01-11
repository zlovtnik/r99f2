<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeGA, initializeCloudflare } from '$lib/utils/analytics';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'not configured';
		const tasks = [
			Promise.resolve()
				.then(() => initializeGA())
				.catch((error) => {
					console.error(`Failed to initialize Google Analytics (GA_ID: ${gaId}):`, error);
					throw error;
				}),
			Promise.resolve()
				.then(() => initializeCloudflare())
				.catch((error) => {
					console.error('Failed to initialize Cloudflare Web Analytics:', error);
					throw error;
				})
		];

		void Promise.all(tasks).catch((error) => {
			console.error('One or more analytics initializers failed:', error);
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
