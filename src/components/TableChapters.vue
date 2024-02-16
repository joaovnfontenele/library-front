<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { getChapters, deleteChapter } from '../service/chapters'
  import { getChapterDto } from '../types/chapter'
  import notify from '../utils/notify'

  const props = defineProps(['id'])

  const chapters = ref<getChapterDto[]>()

  onMounted(async () => {
    await getChapterList()
  })

  async function getChapterList() {
    chapters.value = (await getChapters(props.id)).data
  }
  async function chapterDelete(chapterId: string) {
    await deleteChapter(chapterId)
    notify.success('Chapter Deleted Successfully')
    await getChapterList()
  }
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="dark:text-gray-400 w-full text-left text-sm text-gray-500 rtl:text-right"
    >
      <thead
        class="dark:bg-gray-700 dark:text-gray-400 bg-gray-50 text-xs text-gray-700"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Number</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(chapter, index) in chapters"
          :key="index"
          class="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 border-b bg-white hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-center">
            {{ chapter.number }}
          </td>
          <th
            scope="row"
            class="dark:text-white whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            {{ chapter.title }}
          </th>

          <td class="px-6 py-4 text-center">
            <svg
              @click="chapterDelete(chapter.id)"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash-2 dark:text-blue-500 mx-auto cursor-pointer text-center text-red-600 hover:underline"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
