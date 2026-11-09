<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="elsewhere" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<dl>
			<StoryblokComponent v-for="item in blok.items" :key="item._uid" :blok="item" />
		</dl>
	</section>
</template>
