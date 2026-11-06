/**
 * Register every component in app/storyblok under its exact Storyblok block
 * name too (TrackSection.vue -> "track_section"). The SDK looks a block up by
 * that name first; without this it logs a "could not be found" error before
 * falling back to the hyphenated name.
 */
const files = Object.keys(import.meta.glob('../storyblok/*.vue'));

export default defineNuxtPlugin((nuxtApp) => {
	const app = nuxtApp.vueApp;
	for (const path of files) {
		const name = path.split('/').pop()!.replace(/\.vue$/, '');
		const blockName = name.replace(/(?<!^)([A-Z])/g, '_$1').toLowerCase();
		const component = app.component(name);
		if (component && !app.component(blockName)) app.component(blockName, component);
	}
});
