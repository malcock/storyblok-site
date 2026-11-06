<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<ul>
			<StoryblokComponent v-for="stat in blok.stats" :key="stat._uid" :blok="stat" />
		</ul>
	</section>
</template>
