<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="decision row block" v-editable="blok">
		<h3 class="decision__heading row__full">
			<span class="decision__kind label">
				<svg class="decision__mark" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
					<rect width="16" height="16" />
				</svg>
				Decision<span class="visually-hidden">:</span>
			</span>
			<span class="decision__text">{{ blok.decision }}</span>
		</h3>
		<div class="decision__reasons row__main">
			<p v-if="blok.alternatives" class="decision__reason decision__reason--alt">
				<strong class="label">Alternatives:</strong> <span>{{ blok.alternatives }}</span>
			</p>
			<p v-if="blok.reasoning" class="decision__reason">
				<strong class="label">Why:</strong> <span>{{ blok.reasoning }}</span>
			</p>
		</div>
	</section>
</template>

<style scoped>
.decision__heading {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-s) var(--space-xl);
	padding-top: var(--space-s);
	border-top: var(--rule-heavy) solid var(--color-rule);
}

.decision__kind {
	display: inline-flex;
	align-items: center;
	gap: var(--space-xs);
	color: var(--color-accent);
}

.decision__mark {
	width: 0.75rem;
	height: 0.75rem;
	fill: var(--color-geometry-accent);
	transform: rotate(45deg);
}

.decision__text {
	font-size: var(--step-3);
	line-height: 1.05;
	max-width: 24ch;
}

.decision__reasons {
	display: grid;
	gap: var(--space-m);
	margin-top: var(--space-s);
	max-width: var(--measure);
}

.decision__reason {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-2xs) var(--space-m);
}

.decision__reason .label {
	padding-top: 0.3em;
}

.decision__reason--alt span {
	color: var(--color-text-muted);
}

@media (min-width: 36rem) {
	.decision__reason {
		grid-template-columns: 7rem minmax(0, 1fr);
	}
}

@media (min-width: 60rem) {
	.decision__heading {
		grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
	}

	.decision__kind {
		align-self: start;
		padding-top: 0.6em;
	}
}
</style>
