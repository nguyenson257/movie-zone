<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="item">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 20px;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
