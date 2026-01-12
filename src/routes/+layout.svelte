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
				init: initializeGA
			},
			{
				name: 'Cloudflare Web Analytics',
				init: initializeCloudflare
			}
		];

		void Promise.all(
			initializers.map((initializer) =>
				Promise.resolve(initializer.init())
					.then(() => ({ name: initializer.name, success: true }))
					.catch((error) => {
						return { name: initializer.name, success: false, error };
					})
			)
		).then((results) => {
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
