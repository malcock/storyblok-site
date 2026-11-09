<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="contact" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<p v-if="blok.text">{{ blok.text }}</p>
		<p v-if="blok.email"><a :href="`mailto:${blok.email}`">{{ blok.email }}</a></p>
		<ul v-if="blok.links?.length">
			<li v-for="link in blok.links" :key="link._uid">
				<StoryblokComponent :blok="link" />
			</li>
		</ul>
	</section>
</template>
