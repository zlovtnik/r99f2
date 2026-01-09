import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
	build: {
		// Relying on SvelteKit and Vite defaults for cssCodeSplit and chunkSizeWarningLimit
		// SvelteKit handles optimal code splitting automatically
	}
});
