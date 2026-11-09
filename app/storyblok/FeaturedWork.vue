<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="featured-work row" v-editable="blok">
		<h2 v-if="blok.heading" class="section-title section-title--sticky row__label">{{ blok.heading }}</h2>
		<div class="row__main">
			<p v-if="blok.intro" class="featured-work__intro">{{ blok.intro }}</p>
			<div class="featured-work__list">
				<ProjectSummary
					v-for="project in blok.projects"
					:key="typeof project === 'object' ? project.uuid : project"
					:project="project"
					:level="3"
					variant="feature"
				/>
			</div>
		</div>
	</section>
</template>

<style scoped>
.featured-work {
	padding-block: var(--space-xl);
}

.featured-work__intro {
	max-width: var(--measure);
	font-size: var(--step-1);
	line-height: 1.5;
	padding-top: var(--space-s);
	margin-bottom: var(--space-xl);
}

.featured-work__list {
	border-bottom: var(--rule-thin) solid var(--color-rule);
}
</style>
