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

// Page titles and descriptions come from the story's own fields, so they stay
// in step with the content (and update live in the Visual Editor).
const SITE_NAME = 'Martin Alcock';

const hero = computed(() => story.value?.content?.body?.find?.((blok) => blok.component === 'hero'));

const pageTitle = computed(() => {
	const content = story.value?.content;
	if (!content || hero.value) return SITE_NAME;
	const title = content.title || story.value.name;
	return title ? `${title} · ${SITE_NAME}` : SITE_NAME;
});

const pageDescription = computed(() => {
	const content = story.value?.content;
	return hero.value?.headline || content?.summary || content?.standfirst || undefined;
});

useSeoMeta({
	title: pageTitle,
	ogTitle: pageTitle,
	description: pageDescription,
	ogDescription: pageDescription,
});
</script>

<template>
	<StoryblokComponent v-if="story" :blok="story.content" />
</template>
