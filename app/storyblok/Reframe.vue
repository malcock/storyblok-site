<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="reframe" v-editable="blok">
		<h3>What we were asked for</h3>
		<p>{{ blok.asked_for }}</p>
		<h3>What the problem actually was</h3>
		<p>{{ blok.actual_problem }}</p>
		<p v-if="blok.note"><em>{{ blok.note }}</em></p>
	</section>
</template>
