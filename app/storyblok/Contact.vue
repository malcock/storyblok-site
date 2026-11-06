<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok">
		<h2>{{ blok.heading }}</h2>
		<StoryblokRichText v-if="blok.intro" :document="blok.intro" />
		<p v-if="blok.email"><a :href="`mailto:${blok.email}`">{{ blok.email }}</a></p>
		<ul v-if="blok.links?.length">
			<StoryblokComponent v-for="link in blok.links" :key="link._uid" :blok="link" />
		</ul>
	</section>
</template>
