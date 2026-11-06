<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<StoryblokRichText v-if="blok.intro" :document="blok.intro" />
		<ul>
			<StoryblokComponent v-for="alt in blok.alternatives" :key="alt._uid" :blok="alt" />
		</ul>
	</section>
</template>
