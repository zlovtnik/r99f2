import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			runtime: 'nodejs24.x'
		}),
		alias: {
			$components: 'src/lib/components',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils',
			$data: 'src/lib/data',
			$config: 'src/lib/config'
		}
	}
};

export default config;
