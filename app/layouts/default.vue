<script setup>
const currentYear = new Date().getFullYear();
</script>
<template>
	<nav><NuxtLink to="/">Martin Alcock</NuxtLink></nav>
	<slot></slot>
	<footer>© {{ currentYear }} Martin Alcock</footer>
</template>
