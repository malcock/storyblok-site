<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="sequence" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<ol>
			<StoryblokComponent v-for="step in blok.steps" :key="step._uid" :blok="step" />
		</ol>
	</section>
</template>
