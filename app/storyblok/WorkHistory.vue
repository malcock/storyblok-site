<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok">
		<h2>{{ blok.heading }}</h2>
		<StoryblokRichText v-if="blok.intro" :document="blok.intro" />
		<StoryblokComponent v-for="role in blok.roles" :key="role._uid" :blok="role" />
		<template v-if="blok.extras?.length">
			<h3>{{ blok.extras_heading }}</h3>
			<ul>
				<StoryblokComponent v-for="item in blok.extras" :key="item._uid" :blok="item" />
			</ul>
		</template>
	</section>
</template>
