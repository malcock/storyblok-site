<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="callout row inverse slanted" v-editable="blok">
		<h2 v-if="blok.heading" class="block-title row__label">{{ blok.heading }}</h2>
		<div v-if="blok.text" class="callout__text prose row__main"><StoryblokRichText :document="blok.text" /></div>
	</section>
</template>

<style scoped>
.callout {
	margin-block: var(--space-xl);
	padding-bottom: var(--space-xl);
}

.callout__text {
	padding-top: var(--space-s);
	font-size: var(--step-1);
	line-height: 1.55;
}

.callout:last-child {
	margin-bottom: calc(var(--space-xl) * -1);
}
</style>
