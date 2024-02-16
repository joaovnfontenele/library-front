<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <div class="bg-white dark:bg-gray-800">
    <Header />
    <main
      class="mx-auto flex min-h-[calc(100vh-173px)] max-w-screen-xl items-center justify-center md:min-h-[calc(100vh-201px)]"
    >
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
