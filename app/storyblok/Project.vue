<script setup>
defineProps({ blok: Object });
</script>

<template>
	<main class="project" v-editable="blok">
		<p><NuxtLink to="/">← Back</NuxtLink></p>
		<h1>{{ blok.title }}</h1>
		<p v-if="blok.summary">{{ blok.summary }}</p>

		<dl>
			<template v-if="blok.client"><dt>Client</dt><dd>{{ blok.client }}</dd></template>
			<template v-if="blok.year"><dt>When</dt><dd>{{ blok.year }}</dd></template>
			<template v-if="blok.my_role"><dt>My role</dt><dd>{{ blok.my_role }}</dd></template>
			<template v-if="blok.team"><dt>Team</dt><dd>{{ blok.team }}</dd></template>
			<template v-if="blok.duration"><dt>Duration</dt><dd>{{ blok.duration }}</dd></template>
			<template v-if="blok.constraints"><dt>Constraints</dt><dd>{{ blok.constraints }}</dd></template>
			<template v-if="blok.tags?.length"><dt>Tags</dt><dd>{{ blok.tags.join(', ') }}</dd></template>
			<template v-if="linkHref(blok.external_link)">
				<dt>Link</dt><dd><a :href="linkHref(blok.external_link)">{{ linkHref(blok.external_link) }}</a></dd>
			</template>
		</dl>

		<section v-if="blok.problem || blok.approach || blok.outcome">
			<template v-if="blok.problem"><h2>Problem</h2><p>{{ blok.problem }}</p></template>
			<template v-if="blok.approach"><h2>Approach</h2><p>{{ blok.approach }}</p></template>
			<template v-if="blok.outcome"><h2>Outcome</h2><p>{{ blok.outcome }}</p></template>
		</section>

		<StoryblokComponent v-for="item in blok.body" :key="item._uid" :blok="item" />
	</main>
</template>
