<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="decision" v-editable="blok">
		<h3>Decision: {{ blok.decision }}</h3>
		<p v-if="blok.alternatives"><strong>Alternatives:</strong> {{ blok.alternatives }}</p>
		<p v-if="blok.reasoning"><strong>Why:</strong> {{ blok.reasoning }}</p>
	</section>
</template>
