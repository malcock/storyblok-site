<script setup>
const slug = useRoute().params.slug;
const { storyblokVersion } = useRuntimeConfig().public;

// Drafts while developing (and in the Visual Editor); published content in builds.
const version = storyblokVersion || (import.meta.dev ? 'draft' : 'published');

// Case study references are stored as UUIDs; resolve them to full stories.
const resolveRelations = ['track_section.case_studies', 'role.case_studies'];

const { story } = await useAsyncStoryblok(
	slug && slug.length > 0 ? slug.join('/') : 'home',
	{
		api: {
			version,
			resolve_relations: resolveRelations.join(','),
		},
		// Live editing only makes sense against drafts.
		bridge: version === 'draft' ? { resolveRelations } : false,
	},
);

if (!story.value) {
	throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}
</script>

<template>
	<StoryblokComponent v-if="story" :blok="story.content" />
</template>
