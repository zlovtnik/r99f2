<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeGA, initializeCloudflare } from '$utils/analytics';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	// Lazy-load non-critical UI components to reduce main thread blocking
	let FloatingCTA: typeof import('$components/FloatingCTA.svelte').default | null = $state(null);
	let ExitIntentPopup: typeof import('$components/ExitIntentPopup.svelte').default | null = $state(null);

	onMount(() => {
		// Defer analytics initialization
		const initAnalytics = () => {
			const initializers = [
				{ name: 'Google Analytics', init: initializeGA },
				{ name: 'Cloudflare Web Analytics', init: initializeCloudflare }
			];

			void Promise.all(
				initializers.map((initializer) =>
					Promise.resolve(initializer.init())
						.then(() => ({ name: initializer.name, success: true }))
						.catch((error) => ({ name: initializer.name, success: false, error }))
				)
			).then((results) => {
				const failures = results.filter((result) => !result.success);
				if (failures.length > 0) {
					console.error('One or more analytics initializers failed:', failures);
				}
			});
		};

		// Lazy-load non-critical components after initial paint
		const loadDeferredComponents = async () => {
			const [floatingCtaModule, exitIntentModule] = await Promise.all([
				import('$components/FloatingCTA.svelte'),
				import('$components/ExitIntentPopup.svelte')
			]);
			FloatingCTA = floatingCtaModule.default;
			ExitIntentPopup = exitIntentModule.default;
		};

		// Use requestIdleCallback for analytics, setTimeout for component loading
		if (typeof requestIdleCallback === 'function') {
			requestIdleCallback(initAnalytics, { timeout: 3000 });
		} else {
			setTimeout(initAnalytics, 100);
		}

		// Load deferred components after a short delay to not block main thread
		setTimeout(loadDeferredComponents, 1500);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main id="main-content">
	{@render children()}
</main>

<!-- Mobile floating CTA buttons (lazy-loaded) -->
{#if FloatingCTA}
	<FloatingCTA />
{/if}

<!-- Exit intent popup (desktop, lazy-loaded) -->
{#if ExitIntentPopup}
	<ExitIntentPopup enabled={true} delay={5000} cookieDays={7} />
{/if}
