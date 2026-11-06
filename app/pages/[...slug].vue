<script setup>
const slug = useRoute().params.slug;

// Case study references are stored as UUIDs; resolve them to full stories.
const resolveRelations = ['track_section.case_studies', 'role.case_studies'];

const { story } = await useAsyncStoryblok(
	slug && slug.length > 0 ? slug.join('/') : 'home',
	{
		api: {
			version: 'draft',
			resolve_relations: resolveRelations.join(','),
		},
		bridge: { resolveRelations },
	},
);

if (!story.value) {
	throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}
</script>

<template>
	<StoryblokComponent v-if="story" :blok="story.content" />
</template>
