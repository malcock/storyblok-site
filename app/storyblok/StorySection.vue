<script setup>
defineProps({ blok: Object });
const stages = {
	context: 'Context', brief: 'The brief', discovery: 'Discovery', reframe: 'Reframe',
	decision: 'Decision', delivery: 'Delivery', my_part: 'My part', outcome: 'Outcome', reflection: 'Looking back',
};
</script>

<template>
	<section v-editable="blok">
		<p v-if="blok.stage"><small>{{ stages[blok.stage] }}</small></p>
		<h2 v-if="blok.heading">{{ blok.heading }}</h2>
		<StoryblokRichText v-if="blok.body" :document="blok.body" />
	</section>
</template>
