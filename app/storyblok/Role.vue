<script setup>
defineProps({ blok: Object });
</script>

<template>
	<article v-editable="blok">
		<h3>{{ blok.company }}</h3>
		<p>
			<em>{{ blok.title }}</em>
			<template v-if="blok.start"> · {{ blok.start }} to {{ blok.end }}</template>
		</p>
		<StoryblokRichText v-if="blok.summary" :document="blok.summary" />
		<p v-if="blok.case_studies?.some((s) => typeof s === 'object')">
			Case studies:
			<template v-for="(study, i) in blok.case_studies.filter((s) => typeof s === 'object')" :key="study.uuid">
				<template v-if="i">, </template>
				<NuxtLink :to="`/${study.full_slug}`">{{ study.name }}</NuxtLink>
			</template>
		</p>
	</article>
</template>
