<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div class="role" v-editable="blok">
		<h3>{{ blok.organisation }}</h3>
		<p>{{ blok.job_title }} · {{ blok.start }} to {{ blok.end || 'now' }}</p>
		<p v-if="blok.context">{{ blok.context }}</p>
		<ProjectSummary
			v-for="project in blok.projects"
			:key="typeof project === 'object' ? project.uuid : project"
			:project="project"
		/>
	</div>
</template>
