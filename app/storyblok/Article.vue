<script setup>
defineProps({ blok: Object });
</script>

<template>
	<main class="article" v-editable="blok">
		<header class="article__header row">
			<p class="article__back row__full label">
				<NuxtLink to="/"><ArrowIcon direction="left" /> Back</NuxtLink>
			</p>
			<svg
				class="article__geometry row__label"
				viewBox="0 0 200 200"
				aria-hidden="true"
				focusable="false"
			>
				<polygon class="article__wedge" points="10,190 190,10 190,190" />
				<rect class="article__bar" x="10" y="150" width="120" height="16" />
			</svg>
			<div class="row__main">
				<p v-if="blok.label" class="article__label label">{{ blok.label }}</p>
				<h1 class="article__title">{{ blok.title }}</h1>
				<p v-if="blok.standfirst" class="article__standfirst">{{ blok.standfirst }}</p>
			</div>
		</header>

		<div class="article__body">
			<StoryblokComponent v-for="item in blok.body" :key="item._uid" :blok="item" />
		</div>
	</main>
</template>

<style scoped>
.article__header {
	padding-top: var(--space-l);
	padding-bottom: var(--space-l);
	border-bottom: var(--rule-heavy) solid var(--color-rule);
}

.article__back a {
	display: inline-flex;
	align-items: center;
	gap: 0.4em;
	text-decoration: none;
}

.article__back a:hover {
	color: var(--color-accent);
}

.article__geometry {
	display: none;
}

.article__wedge {
	fill: var(--color-geometry-accent);
}

.article__bar {
	fill: var(--color-geometry-strong);
}

.article__label {
	margin-top: var(--space-l);
	color: var(--color-accent);
}

.article__title {
	margin-top: var(--space-s);
	font-size: var(--step-4);
	line-height: 1;
	letter-spacing: -0.015em;
	text-transform: uppercase;
	max-width: 16ch;
}

.article__standfirst {
	margin-top: var(--space-m);
	font-size: var(--step-1);
	line-height: 1.45;
	max-width: 36em;
	color: var(--color-text-muted);
}

@media (min-width: 60rem) {
	.article__geometry {
		display: block;
		width: 100%;
		max-width: 10rem;
		height: auto;
		margin-top: var(--space-l);
		align-self: end;
		justify-self: start;
	}
}

.article__body {
	padding-bottom: var(--space-xl);
}
</style>
