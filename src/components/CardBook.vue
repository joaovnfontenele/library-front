<script setup lang="ts">
  defineProps(['img', 'title', 'description', 'id'])
</script>

<template>
  <a
    :href="`/book-details/${id}`"
    class="flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      class="h-96 w-full rounded-t-lg object-cover md:h-48 md:w-52 md:rounded-none md:rounded-s-lg"
      :src="img"
      alt=""
    />
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3" >
        <article v-html="description"></article>
      </p>
    </div>
  </a>
</template>
