<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="text-section" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<StoryblokRichText v-if="blok.text" :document="blok.text" />
	</section>
</template>
