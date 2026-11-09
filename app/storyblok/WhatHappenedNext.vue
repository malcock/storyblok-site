<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="what-happened-next row inverse slanted" v-editable="blok">
		<h2 class="block-title row__label">{{ blok.heading || 'What happened next' }}</h2>
		<p class="what-happened-next__text prose row__main">{{ blok.text }}</p>
	</section>
</template>

<style scoped>
.what-happened-next {
	margin-block: var(--space-xl);
	padding-bottom: var(--space-xl);
}

.what-happened-next__text {
	padding-top: var(--space-s);
	font-size: var(--step-1);
	line-height: 1.55;
}

.what-happened-next:last-child {
	margin-bottom: calc(var(--space-xl) * -1);
}
</style>
