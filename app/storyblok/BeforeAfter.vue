<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<dl>
			<dt>{{ blok.before_label || 'Before' }}</dt>
			<dd>{{ blok.before }}</dd>
			<dt>{{ blok.after_label || 'After' }}</dt>
			<dd>{{ blok.after }}</dd>
		</dl>
	</section>
</template>
