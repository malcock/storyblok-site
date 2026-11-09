<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div class="elsewhere-item" v-editable="blok">
		<dt>
			<a v-if="linkHref(blok.link)" :href="linkHref(blok.link)">{{ blok.label }}</a>
			<template v-else>{{ blok.label }}</template>
		</dt>
		<dd v-if="blok.detail">{{ blok.detail }}</dd>
	</div>
</template>
