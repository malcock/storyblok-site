<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li class="sequence-step" v-editable="blok">
		<strong class="sequence-step__title">{{ blok.title }}</strong>
		<p v-if="blok.text" class="sequence-step__text">{{ blok.text }}</p>
	</li>
</template>

<style scoped>
/* Numbered stations on one ink line; the last station is filled with the accent. */
.sequence-step {
	--node: 2.5rem;
	position: relative;
	counter-increment: step;
	padding-left: calc(var(--node) + var(--space-m));
	padding-bottom: var(--space-l);
	min-height: calc(var(--node) + var(--space-s));
}

.sequence-step::before {
	content: counter(step);
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	display: grid;
	place-items: center;
	width: var(--node);
	height: var(--node);
	border: 2px solid var(--color-rule);
	border-radius: 50%;
	background: var(--color-surface);
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-0);
	line-height: 1;
	font-variant-numeric: tabular-nums;
}

.sequence-step::after {
	content: '';
	position: absolute;
	left: calc(var(--node) / 2 - 1px);
	top: var(--node);
	bottom: 0;
	width: 2px;
	background: var(--color-rule);
}

.sequence-step:last-child {
	padding-bottom: 0;
}

.sequence-step:last-child::after {
	display: none;
}

.sequence-step:last-child::before {
	background: var(--color-accent);
	border-color: var(--color-accent);
	color: var(--color-accent-contrast);
}

.sequence-step__title {
	display: block;
	padding-top: 0.35rem;
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-1);
	line-height: 1.15;
}

.sequence-step__text {
	margin-top: var(--space-2xs);
}
</style>
