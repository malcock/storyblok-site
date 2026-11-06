<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li v-editable="blok">
		<strong>{{ blok.value }}</strong> {{ blok.label }}
		<template v-if="blok.caveat"><br /><small>{{ blok.caveat }}</small></template>
	</li>
</template>
