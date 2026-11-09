<script setup>
defineProps({ blok: Object });
</script>

<template>
	<!-- Plain for now: shows the Mermaid source. Swap for a rendered SVG later. -->
	<figure class="diagram row block" v-editable="blok">
		<pre class="diagram__source row__main" tabindex="0" :aria-label="blok.caption || 'Diagram source'">{{ blok.mermaid }}</pre>
		<figcaption v-if="blok.caption" class="diagram__caption row__main">{{ blok.caption }}</figcaption>
	</figure>
</template>

<style scoped>
.diagram {
	row-gap: var(--space-s);
}

.diagram__source {
	overflow-x: auto;
	padding: var(--space-m) var(--space-l);
	background: var(--color-surface-raised);
	border-top: var(--rule-heavy) solid var(--color-rule);
	font-family: var(--font-code);
	font-size: var(--step--1);
	line-height: 1.7;
	tab-size: 2;
}

.diagram__caption {
	font-size: var(--step--1);
	font-style: italic;
	color: var(--color-text-muted);
	max-width: var(--measure);
}
</style>
