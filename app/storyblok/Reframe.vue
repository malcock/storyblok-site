<script setup>
defineProps({ blok: Object });
</script>

<template>
	<!-- Asked-for against actual problem, split on the site's diagonal. -->
	<section class="reframe row block" v-editable="blok">
		<div class="reframe__split row__full">
			<div class="reframe__panel reframe__panel--asked">
				<h3 class="reframe__heading label">What we were asked for</h3>
				<p class="reframe__asked">{{ blok.asked_for }}</p>
			</div>
			<div class="reframe__panel reframe__panel--actual inverse">
				<h3 class="reframe__heading label">What the problem actually was</h3>
				<p class="reframe__actual">{{ blok.actual_problem }}</p>
			</div>
		</div>
		<p v-if="blok.note" class="reframe__note row__main"><em>{{ blok.note }}</em></p>
	</section>
</template>

<style scoped>
.reframe {
	--cut: 1.75rem;
}

.reframe__split {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
}

.reframe__panel {
	padding: var(--space-l) var(--space-m);
}

.reframe__panel--asked {
	background: var(--color-surface-raised);
	padding-bottom: calc(var(--cut) + var(--space-l));
}

.reframe__panel--actual {
	margin-top: calc(var(--cut) * -1);
	padding-top: calc(var(--cut) + var(--space-l));
	clip-path: polygon(0 var(--cut), 100% 0, 100% 100%, 0 100%);
}

.reframe__heading {
	margin-bottom: var(--space-s);
	color: var(--color-text-muted);
}

.reframe__panel--actual .reframe__heading {
	color: var(--color-accent);
}

.reframe__asked {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 700;
	font-size: var(--step-2);
	line-height: 1.15;
	color: var(--color-text-muted);
	max-width: 22ch;
}

.reframe__actual {
	font-size: var(--step-1);
	line-height: 1.5;
	max-width: 34em;
}

.reframe__note {
	margin-top: var(--space-s);
	max-width: var(--measure);
	color: var(--color-text-muted);
}

@media (min-width: 52rem) {
	.reframe {
		--cut: clamp(3rem, 6vw, 6rem);
	}

	.reframe__split {
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
	}

	.reframe__panel {
		padding: var(--space-xl);
	}

	.reframe__panel--asked {
		padding-bottom: var(--space-xl);
		padding-right: calc(var(--cut) + var(--space-l));
	}

	.reframe__panel--actual {
		margin-top: 0;
		margin-left: calc(var(--cut) * -1);
		padding-top: var(--space-xl);
		padding-left: calc(var(--cut) + var(--space-xl));
		clip-path: polygon(var(--cut) 0, 100% 0, 100% 100%, 0 100%);
	}
}
</style>
