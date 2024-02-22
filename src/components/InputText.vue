<script setup lang="ts">
  const model = defineModel()
  defineProps(['label', 'required', 'disabled'])
</script>
<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="label"
      class="dark:text-gray-400 mb-1 block text-sm text-gray-500"
      >{{ label }}</label
    >
    <input
      :disabled="disabled"
      v-model="model"
      :id="label"
      class="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-700 focus:ring-blue-500"
      :placeholder="label"
      :required="required"
    />
  </div>
</template>
