<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="work-history" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<p v-if="blok.intro">{{ blok.intro }}</p>
		<StoryblokComponent v-for="role in blok.roles" :key="role._uid" :blok="role" />
	</section>
</template>
