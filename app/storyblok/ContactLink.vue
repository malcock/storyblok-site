<script setup>
const props = defineProps({ blok: Object });
const href = computed(() => {
	const link = props.blok.link;
	if (!link) return undefined;
	return link.linktype === 'story' ? `/${link.cached_url}` : link.url;
});
</script>

<template>
	<li v-editable="blok">
		<a :href="href">{{ blok.label }}</a>
	</li>
</template>
