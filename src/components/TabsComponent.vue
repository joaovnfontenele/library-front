<script setup lang="ts">
  import { ref } from 'vue'
  export interface TabsProps {
    title?: string
    slot?: string
  }
  const props = defineProps({
    tabs: {
      default: [] as TabsProps[],
    },
  })
  const activeTab = ref<TabsProps>({})

  props.tabs[0].slot && (activeTab.value = props.tabs[0])
</script>
<template>
  <div
    class="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
  >
    <ul
      class="flex flex-wrap rounded-t-lg border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
    >
      <li class="me-2" v-for="tab in tabs">
        <button
          @click="activeTab = tab"
          :class="
            activeTab.slot == tab.slot
              ? 'inline-block rounded-lg p-4 text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-500 dark:hover:bg-gray-700'
              : 'inline-block rounded-lg p-4 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300'
          "
          type="button"
        >
          {{ tab.title }}
        </button>
      </li>
    </ul>
    <div id="defaultTabContent">
      <div class="rounded-lg bg-white p-4 dark:bg-gray-800">
        <slot :name="activeTab.slot"></slot>
      </div>
    </div>
  </div>
</template>
