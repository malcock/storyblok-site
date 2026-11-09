<script setup>
// Decorative arrow drawn on the site's diagonal. Direction: 'right' | 'left' | 'out'.
defineProps({ direction: { type: String, default: 'right' } });
</script>

<template>
	<svg
		class="arrow-icon"
		:class="`arrow-icon--${direction}`"
		viewBox="0 0 24 24"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		stroke-width="2.25"
		stroke-linecap="square"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M3 12h17M13 5l7 7-7 7" />
	</svg>
</template>

<style scoped>
.arrow-icon {
	display: inline-block;
	flex: none;
	vertical-align: -0.125em;
}

.arrow-icon--left {
	transform: scaleX(-1);
}

.arrow-icon--out {
	transform: rotate(-45deg);
}
</style>
