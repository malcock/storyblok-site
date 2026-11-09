<script setup>
defineProps({ blok: Object });
</script>

<template>
	<!-- A field note: the context sits in the margin, the words get the room. -->
	<blockquote class="observation row block" v-editable="blok">
		<p class="observation__text row__main">{{ blok.text }}</p>
		<footer v-if="blok.context" class="observation__context row__label label">
			<svg class="observation__mark" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
				<circle cx="8" cy="8" r="7" />
			</svg>
			<small>{{ blok.context }}</small>
		</footer>
	</blockquote>
</template>

<style scoped>
.observation__text {
	position: relative;
	max-width: 30em;
	padding-top: var(--space-s);
	font-size: var(--step-2);
	font-style: italic;
	line-height: 1.38;
	text-indent: -0.42em;
}

.observation__text::before {
	content: '\201C';
	color: var(--color-accent);
}

.observation__text::after {
	content: '\201D';
	color: var(--color-accent);
}

.observation__context {
	display: flex;
	align-items: flex-start;
	gap: var(--space-xs);
	color: var(--color-text-muted);
}

.observation__context small {
	font-size: inherit;
}

.observation__mark {
	flex: none;
	width: 0.9rem;
	height: 0.9rem;
	margin-top: 0.1em;
	fill: none;
	stroke: var(--color-geometry-accent);
	stroke-width: 2.5;
}

@media (min-width: 60rem) {
	.observation__text {
		grid-row: 1;
	}

	.observation__context {
		grid-row: 1;
		padding-top: var(--space-s);
		border-top: var(--rule-thin) solid var(--color-rule);
		align-self: start;
	}
}
</style>
