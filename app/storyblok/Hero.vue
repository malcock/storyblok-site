<script setup>
defineProps({ blok: Object });
</script>

<template>
	<header class="hero" v-editable="blok">
		<p v-if="blok.name" class="hero__name label">{{ blok.name }}</p>
		<svg
			class="hero__geometry"
			viewBox="0 0 400 400"
			aria-hidden="true"
			focusable="false"
		>
			<circle class="hero__disc" cx="236" cy="168" r="132" />
			<polygon class="hero__bar" points="18,372 380,52 392,66 30,386" />
			<line class="hero__hairline" x1="40" y1="300" x2="398" y2="300" />
		</svg>
		<div class="hero__main">
			<h1 class="hero__headline">{{ blok.headline }}</h1>
			<div v-if="blok.intro" class="hero__intro prose"><StoryblokRichText :document="blok.intro" /></div>
			<div v-if="blok.location || blok.links?.length" class="hero__meta">
				<p v-if="blok.location" class="label">{{ blok.location }}</p>
				<ul v-if="blok.links?.length" class="hero__links" role="list">
					<li v-for="link in blok.links" :key="link._uid" class="label">
						<StoryblokComponent :blok="link" />
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<style scoped>
.hero {
	display: grid;
	grid-template-columns: 1.5rem minmax(0, 1fr);
	align-items: end;
	grid-template-areas:
		'name geo'
		'main main';
	column-gap: var(--space-m);
	padding-block: var(--space-xl) var(--space-2xl);
	padding-inline: max(var(--gutter), calc((100% - var(--max-width)) / 2));
}

.hero__name {
	grid-area: name;
	align-self: start;
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	letter-spacing: 0.24em;
	color: var(--color-accent);
	padding-top: var(--space-s);
	border-right: var(--rule-heavy) solid var(--color-accent);
	padding-right: var(--space-xs);
	justify-self: center;
}

.hero__geometry {
	grid-area: geo;
	justify-self: end;
	width: min(48vw, 13rem);
	height: auto;
	margin-bottom: var(--space-m);
}

.hero__disc {
	fill: var(--color-geometry-accent);
}

.hero__bar {
	fill: var(--color-geometry-strong);
}

.hero__hairline {
	stroke: var(--color-geometry-strong);
	stroke-width: 1.5;
}

.hero__main {
	grid-area: main;
	min-width: 0;
}

.hero__headline {
	font-size: var(--step-5);
	line-height: 0.98;
	letter-spacing: -0.005em;
	word-spacing: 0.04em;
	max-width: 15ch;
}

.hero__intro {
	margin-top: var(--space-l);
	font-size: var(--step-1);
	line-height: 1.5;
	max-width: 38em;
}

.hero__intro :deep(p:first-child) {
	color: var(--color-text);
}

.hero__intro :deep(p + p) {
	font-size: var(--step-0);
	line-height: 1.6;
	color: var(--color-text-muted);
}

.hero__meta {
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	gap: var(--space-xs) var(--space-l);
	margin-top: var(--space-l);
	padding-top: var(--space-s);
	border-top: var(--rule-thin) solid var(--color-rule);
	max-width: 38em;
}

.hero__links {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xs) var(--space-m);
	list-style: none;
}

@media (min-width: 60rem) {
	.hero {
		grid-template-columns: 2rem minmax(0, 8fr) minmax(0, 4fr);
		grid-template-areas: 'name main geo';
		column-gap: var(--space-xl);
		padding-block: var(--space-2xl) var(--space-xl);
	}

	.hero__geometry {
		align-self: start;
		width: 100%;
		max-width: 28rem;
		margin: 0;
	}

	.hero__headline {
		max-width: 16ch;
	}
}
</style>
