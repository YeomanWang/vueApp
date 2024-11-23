<script setup lang="ts">
import { RouterView } from 'vue-router'
import CHeader from '../components/header.vue'

</script>

<template>
  <div class="container">
    <header style="grid-area: header">
      <CHeader />
    </header>
    <main style="grid-area: main"><RouterView /></main>
    <footer style="grid-area: footer">记录小朋友们从小到大的美好时刻</footer>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 50px calc(100vh - 100px) 50px;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-areas:
    'header header header header'
    'main main main main '
    'footer footer footer footer';
}

header {
  display: flex;
  place-items: center;
  height: 50px;
  box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.5);
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    height: 50px;
    box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.5);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
