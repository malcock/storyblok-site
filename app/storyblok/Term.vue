<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div class="term" v-editable="blok">
		<dt class="term__name">{{ blok.term }}</dt>
		<dd class="term__definition">{{ blok.definition }}</dd>
	</div>
</template>

<style scoped>
/* Name and definition side by side on wide screens, stacked on narrow ones. */
.term {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-2xs) var(--space-l);
	padding-block: var(--space-s);
	border-bottom: var(--rule-thin) solid var(--color-rule-soft);
}

@media (min-width: 40rem) {
	.term {
		grid-template-columns: 11rem minmax(0, 1fr);
	}
}

.term__name {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-1);
	line-height: 1.2;
	text-transform: uppercase;
	letter-spacing: 0.01em;
}
</style>
