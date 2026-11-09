<script setup>
defineProps({ blok: Object });
</script>

<template>
	<a v-editable="blok" class="link-item" :href="linkHref(blok.link)">{{ blok.label }}<ArrowIcon direction="out" /></a>
</template>

<style scoped>
.link-item {
	display: inline-flex;
	align-items: center;
	gap: 0.3em;
}
</style>
