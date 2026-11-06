<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok">
		<h2>{{ blok.heading }}</h2>
		<StoryblokRichText v-if="blok.intro" :document="blok.intro" />
		<ul>
			<template v-for="study in blok.case_studies" :key="study.uuid ?? study">
				<li v-if="typeof study === 'object'">
					<NuxtLink :to="`/${study.full_slug}`">
						<strong>{{ study.content.hook_problem }}</strong>
						→ {{ study.content.hook_result }}
					</NuxtLink>
					<br />
					<small>{{ study.content.client }} · {{ study.content.title }}</small>
				</li>
			</template>
		</ul>
	</section>
</template>
