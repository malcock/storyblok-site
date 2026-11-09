<script setup>
defineProps({ blok: Object });
</script>

<template>
	<main class="project" v-editable="blok">
		<header class="project__header row">
			<p class="project__back row__full label">
				<NuxtLink to="/"><ArrowIcon direction="left" /> Back</NuxtLink>
			</p>
			<svg
				class="project__geometry row__label"
				viewBox="0 0 200 200"
				aria-hidden="true"
				focusable="false"
			>
				<circle class="project__disc" cx="78" cy="96" r="62" />
				<polygon class="project__bar" points="8,186 188,26 196,36 16,196" />
			</svg>
			<div class="row__main">
				<h1 class="project__title">{{ blok.title }}</h1>
				<p v-if="blok.summary" class="project__summary">{{ blok.summary }}</p>
			</div>
		</header>

		<div class="project__meta-row row">
			<dl class="project__meta row__full">
				<div v-if="blok.client"><dt class="label">Client</dt><dd>{{ blok.client }}</dd></div>
				<div v-if="blok.year"><dt class="label">When</dt><dd>{{ blok.year }}</dd></div>
				<div v-if="blok.my_role"><dt class="label">My role</dt><dd>{{ blok.my_role }}</dd></div>
				<div v-if="blok.team"><dt class="label">Team</dt><dd>{{ blok.team }}</dd></div>
				<div v-if="blok.duration"><dt class="label">Duration</dt><dd>{{ blok.duration }}</dd></div>
				<div v-if="blok.constraints" class="project__meta-wide"><dt class="label">Constraints</dt><dd>{{ blok.constraints }}</dd></div>
				<div v-if="blok.tags?.length" class="project__meta-wide">
					<dt class="label">Tags</dt>
					<dd>
						<ul class="project__tags" role="list">
							<li v-for="tag in blok.tags" :key="tag">{{ tag }}</li>
						</ul>
					</dd>
				</div>
				<div v-if="linkHref(blok.external_link)">
					<dt class="label">Link</dt>
					<dd><a :href="linkHref(blok.external_link)">{{ linkHref(blok.external_link) }}</a></dd>
				</div>
			</dl>
		</div>

		<section v-if="blok.problem || blok.approach || blok.outcome" class="project__brief row">
			<div class="project__brief-grid row__full">
				<div v-if="blok.problem" class="project__brief-item">
					<h2 class="project__brief-heading">Problem</h2>
					<p>{{ blok.problem }}</p>
				</div>
				<div v-if="blok.approach" class="project__brief-item">
					<h2 class="project__brief-heading">Approach</h2>
					<p>{{ blok.approach }}</p>
				</div>
				<div v-if="blok.outcome" class="project__brief-item project__brief-item--outcome">
					<h2 class="project__brief-heading">Outcome</h2>
					<p>{{ blok.outcome }}</p>
				</div>
			</div>
		</section>

		<div class="project__body">
			<StoryblokComponent v-for="item in blok.body" :key="item._uid" :blok="item" />
		</div>
	</main>
</template>

<style scoped>
.project__header {
	padding-top: var(--space-l);
	padding-bottom: var(--space-xl);
}

.project__back a {
	display: inline-flex;
	align-items: center;
	gap: 0.4em;
	text-decoration: none;
}

.project__back a:hover {
	color: var(--color-accent);
}

.project__geometry {
	display: none;
}

.project__disc {
	fill: var(--color-geometry-accent);
}

.project__bar {
	fill: var(--color-geometry-strong);
}

.project__title {
	margin-top: var(--space-l);
	font-size: var(--step-4);
	line-height: 1;
	letter-spacing: -0.015em;
	max-width: 18ch;
}

.project__summary {
	margin-top: var(--space-m);
	font-size: var(--step-1);
	line-height: 1.45;
	max-width: 36em;
	color: var(--color-text-muted);
}

/* Facts: a ruled strip, read across. */
.project__meta {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 13rem), 1fr));
	gap: var(--space-m) var(--space-l);
	padding-block: var(--space-m);
	border-block: var(--rule-thin) solid var(--color-rule);
	font-size: var(--step--1);
	line-height: 1.5;
}

.project__meta dt {
	color: var(--color-text-muted);
}

.project__meta dd {
	margin-top: var(--space-2xs);
	overflow-wrap: anywhere;
}

.project__meta-wide {
	grid-column: span 2;
}

@media (max-width: 30rem) {
	.project__meta-wide {
		grid-column: auto;
	}
}

.project__tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-2xs) var(--space-xs);
	list-style: none;
}

.project__tags li {
	padding: 0.05em 0.5em;
	border: var(--rule-thin) solid var(--color-rule-soft);
}

/* Problem, approach, outcome: three heavy rules, the last in the accent colour. */
.project__brief {
	padding-block: var(--space-xl);
}

.project__brief-grid {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-l) var(--space-xl);
}

.project__brief-item {
	padding-top: var(--space-s);
	border-top: var(--rule-heavy) solid var(--color-rule);
}

.project__brief-item--outcome {
	border-top-color: var(--color-accent);
}

.project__brief-heading {
	font-size: var(--step-1);
	text-transform: uppercase;
	letter-spacing: 0.02em;
	margin-bottom: var(--space-s);
}

.project__brief-item--outcome .project__brief-heading {
	color: var(--color-accent);
}

.project__brief-item p {
	max-width: var(--measure);
}

@media (min-width: 60rem) {
	.project__geometry {
		display: block;
		width: 100%;
		max-width: 12rem;
		height: auto;
		margin-top: var(--space-l);
		justify-self: start;
	}

	.project__brief-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
}

.project__body {
	padding-bottom: var(--space-xl);
}
</style>
