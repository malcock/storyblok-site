<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="options-compared row block" v-editable="blok">
		<h2 v-if="blok.heading" class="block-title row__label">{{ blok.heading }}</h2>
		<div class="row__main">
			<p v-if="blok.intro" class="options-compared__intro">{{ blok.intro }}</p>
			<ol class="options-compared__list">
				<StoryblokComponent v-for="option in blok.options" :key="option._uid" :blok="option" />
			</ol>
			<p v-if="blok.recommendation" class="options-compared__recommendation">
				<strong class="label">Recommendation:</strong> {{ blok.recommendation }}
			</p>
		</div>
	</section>
</template>

<style scoped>
.options-compared__intro {
	max-width: var(--measure);
	padding-top: var(--space-s);
	margin-bottom: var(--space-l);
}

.options-compared__list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	gap: var(--space-l);
	list-style: none;
}

.options-compared__recommendation {
	margin-top: var(--space-l);
	max-width: var(--measure);
}

.options-compared__recommendation .label {
	display: block;
	margin-bottom: var(--space-2xs);
	color: var(--color-accent);
}
</style>
