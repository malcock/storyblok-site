<script setup>
const props = defineProps({ blok: Object });
const evidence = computed(() => (typeof props.blok.evidence === 'object' ? props.blok.evidence : null));
</script>

<template>
	<div class="principle" v-editable="blok">
		<h3 class="principle__title">{{ blok.title }}</h3>
		<p v-if="blok.text" class="principle__text">{{ blok.text }}</p>
		<p v-if="evidence" class="principle__evidence">
			<span class="label">See:</span>
			<NuxtLink v-if="hasCaseStudy(evidence)" :to="storyHref(evidence)">{{ evidence.content.title || evidence.name }}</NuxtLink>
			<template v-else>{{ evidence.content.title || evidence.name }}</template>
		</p>
	</div>
</template>

<style scoped>
.principle {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: var(--space-s);
	padding-top: var(--space-m);
	border-top: var(--rule-thin) solid var(--color-rule);
}

/* A short accent slab sitting on the rule: the only accent per principle. */
.principle::before {
	content: '';
	position: absolute;
	top: -3px;
	left: 0;
	width: 3rem;
	height: 5px;
	background: var(--color-geometry-accent);
}

.principle__title {
	font-size: var(--step-2);
}

.principle__text {
	max-width: var(--measure);
}

.principle__evidence {
	margin-top: auto;
	padding-top: var(--space-xs);
	font-size: var(--step--1);
	line-height: 1.45;
	color: var(--color-text-muted);
}

.principle__evidence .label {
	margin-right: 0.4em;
	color: var(--color-text);
}

.principle__evidence a {
	color: var(--color-text);
}
</style>
