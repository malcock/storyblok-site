<script setup>
defineProps({ blok: Object });
</script>

<template>
	<figure class="stat" v-editable="blok">
		<p><strong>{{ blok.value }}</strong> {{ blok.label }}</p>
		<figcaption v-if="blok.caveat"><small>{{ blok.caveat }}</small></figcaption>
	</figure>
</template>
