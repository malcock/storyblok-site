<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="term-list row block" v-editable="blok">
		<h2 v-if="blok.heading" class="block-title row__label">{{ blok.heading }}</h2>
		<dl class="term-list__terms row__main">
			<StoryblokComponent v-for="term in blok.terms" :key="term._uid" :blok="term" />
		</dl>
	</section>
</template>

<style scoped>
.term-list__terms {
	max-width: var(--measure);
	border-top: var(--rule-thin) solid var(--color-rule);
}
</style>
