<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section class="table-block row block" v-editable="blok">
		<h2 v-if="blok.heading" class="block-title row__label">{{ blok.heading }}</h2>
		<div class="table-block__scroll row__main" tabindex="0" :aria-label="blok.caption || blok.heading || 'Table'">
			<table class="table-block__table">
				<caption v-if="blok.caption" class="table-block__caption">{{ blok.caption }}</caption>
				<thead v-if="blok.table?.thead?.length">
					<tr>
						<th v-for="cell in blok.table.thead" :key="cell._uid" scope="col" class="label">{{ cell.value }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in blok.table?.tbody" :key="row._uid">
						<td v-for="cell in row.body" :key="cell._uid">{{ cell.value }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<style scoped>
.table-block__scroll {
	overflow-x: auto;
	max-width: var(--measure);
}

.table-block__table {
	width: 100%;
	border-collapse: collapse;
	border-top: var(--rule-heavy) solid var(--color-rule);
}

.table-block__caption {
	caption-side: bottom;
	text-align: left;
	padding-top: var(--space-xs);
	font-size: var(--step--1);
	font-style: italic;
	color: var(--color-text-muted);
}

th,
td {
	text-align: left;
	vertical-align: top;
	padding: var(--space-xs) var(--space-m) var(--space-xs) 0;
	border-bottom: var(--rule-thin) solid var(--color-rule-soft);
}

th {
	color: var(--color-text-muted);
	border-bottom-color: var(--color-rule);
}

td {
	font-family: var(--font-code);
	font-size: var(--step--1);
	overflow-wrap: anywhere;
}

td:first-child {
	font-family: var(--font-text);
	font-size: inherit;
}
</style>
