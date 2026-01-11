<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeGA, initializeCloudflare } from '$lib/utils/analytics';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'not configured';
		const initializers = [
			{
				name: 'Google Analytics',
				run: () =>
					initializeGA()
						.then(() => ({ name: 'Google Analytics', success: true }))
						.catch((error) => {
							console.error(`Failed to initialize Google Analytics (GA_ID: ${gaId}):`, error);
							return { name: 'Google Analytics', success: false, error };
						})
			},
			{
				name: 'Cloudflare Web Analytics',
				run: () =>
					initializeCloudflare()
						.then(() => ({ name: 'Cloudflare Web Analytics', success: true }))
						.catch((error) => {
							console.error('Failed to initialize Cloudflare Web Analytics:', error);
							return { name: 'Cloudflare Web Analytics', success: false, error };
						})
			}
		];

		void Promise.all(initializers.map((initializer) => initializer.run())).then((results) => {
			const failures = results.filter((result) => !result.success);
			if (failures.length > 0) {
				console.error('One or more analytics initializers failed:', failures);
			}
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
