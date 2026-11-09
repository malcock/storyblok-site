<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div class="role" v-editable="blok">
		<p class="role__when label">{{ blok.start }} to {{ blok.end || 'now' }}</p>
		<div class="role__main">
			<h3 class="role__org">{{ blok.organisation }}</h3>
			<p class="role__title">{{ blok.job_title }}</p>
			<p v-if="blok.context" class="role__context">{{ blok.context }}</p>
			<div v-if="blok.projects?.length" class="role__projects">
				<ProjectSummary
					v-for="project in blok.projects"
					:key="typeof project === 'object' ? project.uuid : project"
					:project="project"
					:level="4"
					variant="compact"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.role {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-xs) var(--space-l);
	padding-block: var(--space-l);
	border-top: var(--rule-thin) solid var(--color-rule);
}

.role__when {
	color: var(--color-accent);
	font-variant-numeric: tabular-nums;
}

.role__org {
	font-size: var(--step-2);
}

.role__title {
	margin-top: var(--space-2xs);
	font-style: italic;
	color: var(--color-text-muted);
}

.role__context {
	margin-top: var(--space-s);
	max-width: var(--measure);
}

.role__projects {
	margin-top: var(--space-m);
	max-width: var(--measure);
}

@media (min-width: 44rem) {
	.role {
		grid-template-columns: minmax(8rem, 2fr) minmax(0, 7fr);
	}

	.role__when {
		padding-top: 0.45em;
	}
}
</style>
