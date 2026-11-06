<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li v-editable="blok">
		<strong>{{ blok.title }}</strong><template v-if="blok.chosen"> (chosen)</template>
		<p v-if="blok.description">{{ blok.description }}</p>
	</li>
</template>
