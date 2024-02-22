<script setup lang="ts">
  defineEmits(['click'])
  defineProps(['disabled'])
</script>
<template>
  <button
    :disabled="disabled"
    @click="$emit('click')"
    class="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-400"
  >
    <slot />
  </button>
</template>
