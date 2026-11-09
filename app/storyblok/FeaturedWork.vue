<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="featured-work" v-editable="blok">
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<p v-if="blok.intro">{{ blok.intro }}</p>
		<ProjectSummary
			v-for="project in blok.projects"
			:key="typeof project === 'object' ? project.uuid : project"
			:project="project"
		/>
	</section>
</template>
