<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="principles" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<StoryblokComponent v-for="item in blok.items" :key="item._uid" :blok="item" />
	</section>
</template>
