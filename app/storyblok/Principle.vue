<script setup>
const props = defineProps({ blok: Object });
const evidence = computed(() => (typeof props.blok.evidence === 'object' ? props.blok.evidence : null));
</script>

<template>
	<div class="principle" v-editable="blok">
		<h3>{{ blok.title }}</h3>
		<p v-if="blok.text">{{ blok.text }}</p>
		<p v-if="evidence">
			See:
			<NuxtLink v-if="hasCaseStudy(evidence)" :to="storyHref(evidence)">{{ evidence.content.title || evidence.name }}</NuxtLink>
			<template v-else>{{ evidence.content.title || evidence.name }}</template>
		</p>
	</div>
</template>
