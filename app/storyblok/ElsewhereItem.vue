<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div class="elsewhere-item" v-editable="blok">
		<dt class="elsewhere-item__label">
			<a v-if="linkHref(blok.link)" :href="linkHref(blok.link)">{{ blok.label }}</a>
			<template v-else>{{ blok.label }}</template>
		</dt>
		<dd v-if="blok.detail" class="elsewhere-item__detail">{{ blok.detail }}</dd>
	</div>
</template>

<style scoped>
.elsewhere-item {
	padding-top: var(--space-s);
	border-top: var(--rule-thin) solid var(--color-rule);
}

.elsewhere-item__label {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-1);
	line-height: 1.15;
}

.elsewhere-item__detail {
	margin-top: var(--space-xs);
	color: var(--color-text-muted);
	max-width: var(--measure);
}
</style>
