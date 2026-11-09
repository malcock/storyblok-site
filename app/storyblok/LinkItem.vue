<script setup>
defineProps({ blok: Object });
</script>

<template>
	<a v-editable="blok" :href="linkHref(blok.link)">{{ blok.label }}</a>
</template>
