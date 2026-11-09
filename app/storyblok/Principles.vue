<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="principles row" v-editable="blok">
		<h2 v-if="blok.heading" class="section-title row__label">{{ blok.heading }}</h2>
		<div class="principles__list row__main">
			<StoryblokComponent v-for="item in blok.items" :key="item._uid" :blok="item" />
		</div>
	</section>
</template>

<style scoped>
.principles {
	padding-block: var(--space-xl);
}

.principles__list {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-xl);
}

@media (min-width: 44rem) {
	.principles__list {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
</style>
