<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="elsewhere row" v-editable="blok">
		<h2 v-if="blok.heading" class="section-title row__label">{{ blok.heading }}</h2>
		<dl class="elsewhere__list row__main">
			<StoryblokComponent v-for="item in blok.items" :key="item._uid" :blok="item" />
		</dl>
	</section>
</template>

<style scoped>
.elsewhere {
	padding-block: var(--space-xl);
}

.elsewhere__list {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-l) var(--space-xl);
}

@media (min-width: 44rem) {
	.elsewhere__list {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
</style>
