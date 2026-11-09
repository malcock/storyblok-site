<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li class="sequence-step" v-editable="blok">
		<strong>{{ blok.title }}</strong>
		<p v-if="blok.text">{{ blok.text }}</p>
	</li>
</template>
