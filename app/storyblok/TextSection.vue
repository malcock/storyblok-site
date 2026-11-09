<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="text-section row block" v-editable="blok">
		<h2 v-if="blok.heading" class="block-title row__label">{{ blok.heading }}</h2>
		<div v-if="blok.text" class="text-section__text prose row__main"><StoryblokRichText :document="blok.text" /></div>
	</section>
</template>

<style scoped>
.text-section__text {
	padding-top: var(--space-s);
}

.text-section__text :deep(a) {
	text-decoration-thickness: 2px;
}
</style>
