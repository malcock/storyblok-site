<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li v-editable="blok">
		<strong>{{ blok.title }}</strong>
		<p v-if="blok.description">{{ blok.description }}</p>
	</li>
</template>
