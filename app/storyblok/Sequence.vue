<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="sequence row block" v-editable="blok">
		<h2 v-if="blok.heading" class="block-title row__label">{{ blok.heading }}</h2>
		<ol class="sequence__steps row__main">
			<StoryblokComponent v-for="step in blok.steps" :key="step._uid" :blok="step" />
		</ol>
	</section>
</template>

<style scoped>
.sequence__steps {
	list-style: none;
	counter-reset: step;
	padding-top: var(--space-s);
	max-width: var(--measure);
}
</style>
