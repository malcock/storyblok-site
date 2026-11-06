<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li v-editable="blok">
		<strong>{{ blok.title }}</strong>
		<template v-if="blok.detail">: {{ blok.detail }}</template>
	</li>
</template>
