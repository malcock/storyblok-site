<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
	<a class="skip-link label" href="#content">Skip to content</a>
	<nav class="site-nav" aria-label="Site">
		<NuxtLink class="site-nav__home" to="/">Martin Alcock</NuxtLink>
		<NuxtLink class="site-nav__contact label" to="/#contact">Get in touch</NuxtLink>
	</nav>
	<div id="content" tabindex="-1" class="site-content">
		<slot></slot>
	</div>
	<footer class="site-footer inverse">
		<p class="label">© {{ currentYear }} Martin Alcock</p>
	</footer>
</template>

<style scoped>
.site-nav {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: var(--space-m);
	padding-block: var(--space-m);
	padding-inline: max(var(--gutter), calc((100% - var(--max-width)) / 2));
	border-bottom: var(--rule-thin) solid var(--color-rule);
}

.site-nav__home {
	font-family: var(--font-display);
	font-variation-settings: 'wdth' var(--display-width);
	font-weight: 800;
	font-size: var(--step-1);
	letter-spacing: 0.01em;
	text-transform: uppercase;
	text-decoration: none;
}

.site-nav__contact {
	text-decoration: none;
	padding-bottom: 0.15em;
	border-bottom: 2px solid var(--color-accent);
}

.site-nav__contact:hover {
	color: var(--color-accent);
}

.site-content:focus {
	outline: none;
}

.site-footer {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: var(--space-s);
	padding-block: var(--space-l);
	padding-inline: max(var(--gutter), calc((100% - var(--max-width)) / 2));
	color: var(--color-text-muted);
	border-top: var(--rule-thin) solid var(--color-rule-soft);
}
</style>
