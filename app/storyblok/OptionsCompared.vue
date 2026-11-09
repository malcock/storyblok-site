<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="options-compared" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<p v-if="blok.intro">{{ blok.intro }}</p>
		<ol>
			<StoryblokComponent v-for="option in blok.options" :key="option._uid" :blok="option" />
		</ol>
		<p v-if="blok.recommendation"><strong>Recommendation:</strong> {{ blok.recommendation }}</p>
	</section>
</template>
