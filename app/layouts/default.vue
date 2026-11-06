<template>
	<div class="site">
		<slot></slot>
		<footer>Martin Alcock</footer>
	</div>
</template>

<style>
.site {
	max-width: 46rem;
	margin: 0 auto;
	padding: 1.5rem 1rem 4rem;
	font-family: system-ui, sans-serif;
	line-height: 1.55;
}
</style>
