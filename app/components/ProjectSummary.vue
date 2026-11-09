<script setup>
// Renders a resolved project story (from a story reference field).
// Unresolved references arrive as plain UUID strings and are skipped.
const props = defineProps({
	project: [Object, String],
	// Heading level, so the outline stays in order wherever this is used.
	level: { type: Number, default: 3 },
	// 'feature' for the Selected work list, 'compact' inside a role.
	variant: { type: String, default: 'feature' },
});
const story = computed(() => (typeof props.project === 'object' ? props.project : null));
const headingTag = computed(() => `h${Math.min(Math.max(props.level, 2), 6)}`);
</script>

<template>
	<article v-if="story" class="project-summary" :class="`project-summary--${variant}`">
		<component :is="headingTag" class="project-summary__title">
			<NuxtLink v-if="hasCaseStudy(story)" :to="storyHref(story)">{{ story.content.title || story.name }}</NuxtLink>
			<template v-else>{{ story.content.title || story.name }}</template>
		</component>
		<div class="project-summary__body">
			<p v-if="story.content.summary" class="project-summary__summary">{{ story.content.summary }}</p>
			<p v-if="hasCaseStudy(story)" class="project-summary__more label">
				<NuxtLink :to="storyHref(story)">Read the case study<ArrowIcon /></NuxtLink>
			</p>
		</div>
	</article>
</template>

<style scoped>
.project-summary__title a {
	text-decoration: none;
}

.project-summary__title a:hover {
	text-decoration: underline;
	text-decoration-color: var(--color-accent);
	text-decoration-thickness: 3px;
}

.project-summary__more a {
	display: inline-flex;
	align-items: center;
	gap: 0.4em;
	text-decoration: none;
	color: var(--color-accent);
}

.project-summary__more a:hover .arrow-icon {
	transform: translateX(0.2em);
}

.project-summary__more :deep(.arrow-icon) {
	transition: transform 160ms ease-out;
}

/* Selected work: a stacked index of heavy rows. */
.project-summary--feature {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-s) var(--space-xl);
	padding-block: var(--space-l);
	border-top: var(--rule-thin) solid var(--color-rule);
}

.project-summary--feature .project-summary__title {
	font-size: var(--step-3);
	line-height: 1.02;
}

.project-summary--feature .project-summary__body {
	display: flex;
	flex-direction: column;
	gap: var(--space-s);
	max-width: 34em;
}

@media (min-width: 52rem) {
	.project-summary--feature {
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		align-items: start;
	}

	.project-summary--feature .project-summary__body {
		padding-top: 0.35em;
	}
}

/* Inside a role: quiet, list-like. */
.project-summary--compact {
	padding-block: var(--space-s);
	border-top: var(--rule-thin) solid var(--color-rule-soft);
}

.project-summary--compact .project-summary__title {
	font-size: var(--step-1);
	line-height: 1.15;
}

.project-summary--compact .project-summary__body {
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	gap: var(--space-2xs) var(--space-m);
	margin-top: var(--space-2xs);
}

.project-summary--compact .project-summary__summary {
	font-size: var(--step--1);
	line-height: 1.5;
	color: var(--color-text-muted);
	max-width: var(--measure);
}
</style>
