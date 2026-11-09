<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li class="option-item" :class="{ 'option-item--chosen': blok.chosen }" v-editable="blok">
		<strong class="option-item__name">{{ blok.name }}</strong><span v-if="blok.chosen" class="option-item__chosen label"> (chosen)</span>
		<p v-if="blok.summary" class="option-item__summary">{{ blok.summary }}</p>
	</li>
</template>

<style scoped>
.option-item {
	padding-top: var(--space-s);
	border-top: var(--rule-thin) solid var(--color-rule);
}

.option-item--chosen {
	border-top: var(--rule-heavy) solid var(--color-accent);
}

.option-item__name {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-1);
	line-height: 1.15;
}

.option-item__chosen {
	margin-left: 0.25em;
	color: var(--color-accent);
}

.option-item__summary {
	margin-top: var(--space-xs);
	color: var(--color-text-muted);
}

.option-item--chosen .option-item__summary {
	color: var(--color-text);
}
</style>
