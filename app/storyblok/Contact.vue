<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section id="contact" class="contact row inverse slanted" v-editable="blok">
		<h2 v-if="blok.heading" class="section-title row__label">{{ blok.heading }}</h2>
		<div class="contact__main row__main">
			<p v-if="blok.text" class="contact__text">{{ blok.text }}</p>
			<p v-if="blok.email" class="contact__email">
				<a :href="`mailto:${blok.email}`">{{ blok.email }}</a>
			</p>
			<ul v-if="blok.links?.length" class="contact__links" role="list">
				<li v-for="link in blok.links" :key="link._uid" class="label">
					<StoryblokComponent :blok="link" />
				</li>
			</ul>
		</div>
	</section>
</template>

<style scoped>
.contact {
	padding-bottom: var(--space-2xl);
	margin-top: var(--space-xl);
}

.contact__text {
	max-width: var(--measure);
	font-size: var(--step-1);
	line-height: 1.5;
	padding-top: var(--space-s);
}

.contact__email {
	margin-top: var(--space-l);
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-3);
	line-height: 1.1;
	overflow-wrap: anywhere;
}

.contact__email a {
	text-decoration-thickness: 3px;
	text-underline-offset: 0.15em;
}

.contact__email a:hover {
	color: var(--color-accent);
}

.contact__links {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-s) var(--space-l);
	margin-top: var(--space-l);
	list-style: none;
}
</style>
