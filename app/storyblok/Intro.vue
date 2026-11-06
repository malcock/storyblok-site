<script setup>
defineProps({ blok: Object });
</script>

<template>
	<header v-editable="blok">
		<h1>{{ blok.headline }}</h1>
		<StoryblokRichText v-if="blok.intro" :document="blok.intro" />
	</header>
</template>
