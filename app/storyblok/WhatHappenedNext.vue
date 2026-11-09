<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="what-happened-next" v-editable="blok">
		<h2>{{ blok.heading || 'What happened next' }}</h2>
		<p>{{ blok.text }}</p>
	</section>
</template>
