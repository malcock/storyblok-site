<script setup>
defineProps({ blok: Object });
</script>

<template>
	<!-- The number is loud; the caveat sits right beside it at full reading size. -->
	<figure class="stat row block" v-editable="blok">
		<div class="stat__inner row__full">
			<p class="stat__figure">
				<strong class="stat__value">{{ blok.value }}</strong>
				<span class="stat__label">{{ blok.label }}</span>
			</p>
			<figcaption v-if="blok.caveat" class="stat__caveat">
				<span class="label">Caveat</span>
				<small>{{ blok.caveat }}</small>
			</figcaption>
		</div>
	</figure>
</template>

<style scoped>
.stat__inner {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-l) var(--space-xl);
	padding-top: var(--space-m);
	border-top: var(--rule-heavy) solid var(--color-rule);
}

.stat__figure {
	display: flex;
	flex-direction: column;
	gap: var(--space-s);
}

.stat__value {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' 62;
	font-weight: 800;
	font-size: clamp(5rem, 3rem + 10vw, 11rem);
	line-height: 0.82;
	letter-spacing: -0.02em;
	color: var(--color-accent);
	font-variant-numeric: lining-nums;
}

.stat__label {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-2);
	line-height: 1.1;
	max-width: 18ch;
}

.stat__caveat {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
	padding-top: var(--space-s);
	border-top: var(--rule-thin) solid var(--color-rule);
	max-width: 36em;
}

.stat__caveat small {
	font-size: var(--step-0);
	line-height: 1.6;
}

@media (min-width: 52rem) {
	.stat__inner {
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		align-items: end;
	}
}
</style>
