<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li class="option-item" v-editable="blok">
		<strong>{{ blok.name }}</strong><template v-if="blok.chosen"> (chosen)</template>
		<p v-if="blok.summary">{{ blok.summary }}</p>
	</li>
</template>
