<script setup>
// Renders a resolved project story (from a story reference field).
// Unresolved references arrive as plain UUID strings and are skipped.
const props = defineProps({ project: [Object, String] });
const story = computed(() => (typeof props.project === 'object' ? props.project : null));
</script>

<template>
	<article v-if="story" class="project-summary">
		<h4>
			<NuxtLink v-if="hasCaseStudy(story)" :to="storyHref(story)">{{ story.content.title || story.name }}</NuxtLink>
			<template v-else>{{ story.content.title || story.name }}</template>
		</h4>
		<p v-if="story.content.summary">{{ story.content.summary }}</p>
		<p v-if="hasCaseStudy(story)"><NuxtLink :to="storyHref(story)">Read the case study</NuxtLink></p>
	</article>
</template>
