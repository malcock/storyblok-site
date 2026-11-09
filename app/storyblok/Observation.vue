<script setup>
defineProps({ blok: Object });
</script>

<template>
	<blockquote class="observation" v-editable="blok">
		<p>{{ blok.text }}</p>
		<footer v-if="blok.context"><small>{{ blok.context }}</small></footer>
	</blockquote>
</template>
