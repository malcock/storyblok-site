<script setup>
const slug = useRoute().params.slug;
const { storyblokVersion } = useRuntimeConfig().public;

// Story-reference fields that should arrive as full stories, not UUIDs.
const relations = ['principle.evidence', 'featured_work.projects', 'role.projects'];

const { story } = await useAsyncStoryblok(
	slug && slug.length > 0 ? slug.join('/') : 'home',
	{
		api: {
			version: storyblokVersion,
			resolve_relations: relations,
		},
		bridge: {
			resolveRelations: relations,
		},
	},
);

if (!story.value) {
	throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}
</script>

<template>
	<StoryblokComponent v-if="story" :blok="story.content" />
</template>
