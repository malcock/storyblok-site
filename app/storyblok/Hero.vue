<script setup>
defineProps({ blok: Object });
</script>

<template>
	<header class="hero" v-editable="blok">
		<p v-if="blok.name">{{ blok.name }}</p>
		<h1>{{ blok.headline }}</h1>
		<StoryblokRichText v-if="blok.intro" :document="blok.intro" />
		<p v-if="blok.location">{{ blok.location }}</p>
		<ul v-if="blok.links?.length">
			<li v-for="link in blok.links" :key="link._uid">
				<StoryblokComponent :blok="link" />
			</li>
		</ul>
	</header>
</template>
