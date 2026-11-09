<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="work-history row" v-editable="blok">
		<h2 v-if="blok.heading" class="section-title section-title--sticky row__label">{{ blok.heading }}</h2>
		<div class="row__main">
			<p v-if="blok.intro" class="work-history__intro">{{ blok.intro }}</p>
			<div class="work-history__roles">
				<StoryblokComponent v-for="role in blok.roles" :key="role._uid" :blok="role" />
			</div>
		</div>
	</section>
</template>

<style scoped>
.work-history {
	padding-block: var(--space-xl);
}

.work-history__intro {
	max-width: var(--measure);
	font-size: var(--step-1);
	line-height: 1.5;
	padding-top: var(--space-s);
	margin-bottom: var(--space-xl);
}
</style>
