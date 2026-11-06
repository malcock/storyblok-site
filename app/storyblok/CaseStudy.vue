<script setup>
defineProps({ blok: Object });
const tracks = { fixing: 'Working with existing companies', building: '0 to 1' };
</script>

<template>
	<main v-editable="blok">
		<p><NuxtLink to="/">← Home</NuxtLink></p>
		<p><small>{{ tracks[blok.track] }}</small></p>
		<h1>{{ blok.title }}</h1>
		<dl>
			<template v-if="blok.client"><dt>Client</dt><dd>{{ blok.client }}</dd></template>
			<template v-if="blok.role"><dt>Role</dt><dd>{{ blok.role }}</dd></template>
			<template v-if="blok.period"><dt>When</dt><dd>{{ blok.period }}</dd></template>
		</dl>
		<p v-if="blok.summary"><strong>{{ blok.summary }}</strong></p>
		<StoryblokComponent v-for="section in blok.body" :key="section._uid" :blok="section" />
	</main>
</template>
