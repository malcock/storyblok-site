<script setup>
defineProps({ blok: Object });
</script>

<template>
	<!-- Plain for now: shows the Mermaid source. Swap for a rendered SVG later. -->
	<figure class="diagram" v-editable="blok">
		<pre>{{ blok.mermaid }}</pre>
		<figcaption v-if="blok.caption">{{ blok.caption }}</figcaption>
	</figure>
</template>
