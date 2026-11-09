<script setup>
const props = defineProps({ blok: Object });

// The Mermaid source is always in the HTML (works without JavaScript and in the
// static build). In the browser it's drawn as an SVG, themed from the site tokens.
const svg = ref('');
const failed = ref(false);
let renderCount = 0;

function token(styles, name) {
	return styles.getPropertyValue(name).trim();
}

async function render() {
	const source = props.blok.mermaid?.trim();
	if (!source) {
		svg.value = '';
		return;
	}
	try {
		const { default: mermaid } = await import('mermaid');
		const styles = getComputedStyle(document.documentElement);
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: 'strict',
			theme: 'base',
			fontFamily: token(styles, '--font-code'),
			themeVariables: {
				background: token(styles, '--color-surface'),
				primaryColor: token(styles, '--color-surface'),
				primaryBorderColor: token(styles, '--color-rule'),
				primaryTextColor: token(styles, '--color-text'),
				clusterBkg: token(styles, '--color-surface-raised'),
				clusterBorder: token(styles, '--color-rule'),
				lineColor: token(styles, '--color-accent'),
				edgeLabelBackground: token(styles, '--color-surface-raised'),
				textColor: token(styles, '--color-text'),
			},
		});
		renderCount += 1;
		const id = `diagram-${props.blok._uid}-${renderCount}`;
		const result = await mermaid.render(id, source);
		svg.value = result.svg;
		failed.value = false;
	} catch {
		// Invalid Mermaid (e.g. mid-edit in the Visual Editor): show the source instead.
		svg.value = '';
		failed.value = true;
	}
}

onMounted(render);
watch(() => props.blok.mermaid, render);
</script>

<template>
	<figure class="diagram row block" v-editable="blok">
		<div
			v-if="svg"
			class="diagram__drawing row__main"
			role="img"
			:aria-label="blok.caption || 'Diagram'"
			v-html="svg"
		/>
		<pre
			v-else
			class="diagram__source row__main"
			tabindex="0"
			:aria-label="blok.caption || 'Diagram source'"
		>{{ blok.mermaid }}</pre>
		<p v-if="failed" class="diagram__error row__main label">This diagram's source has an error, so it's shown as text.</p>
		<figcaption v-if="blok.caption" class="diagram__caption row__main">{{ blok.caption }}</figcaption>
	</figure>
</template>

<style scoped>
.diagram {
	row-gap: var(--space-s);
}

.diagram__drawing {
	overflow-x: auto;
	padding: var(--space-m) 0;
	border-top: var(--rule-heavy) solid var(--color-rule);
}

.diagram__drawing :deep(svg) {
	display: block;
	max-width: 100%;
	height: auto;
	margin-inline: auto;
}

.diagram__source {
	overflow-x: auto;
	padding: var(--space-m) var(--space-l);
	background: var(--color-surface-raised);
	border-top: var(--rule-heavy) solid var(--color-rule);
	font-family: var(--font-code);
	font-size: var(--step--1);
	line-height: 1.7;
	tab-size: 2;
}

.diagram__error {
	color: var(--color-accent);
}

.diagram__caption {
	font-size: var(--step--1);
	font-style: italic;
	color: var(--color-text-muted);
	max-width: var(--measure);
}
</style>
