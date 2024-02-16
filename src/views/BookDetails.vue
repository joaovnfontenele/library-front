<script setup lang="ts">
  import { getBooksDto } from 'src/types/book'
  import { getBooksDetails } from '../service/bookApi'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import TableChapters from '../components/TableChapters.vue'

  const route = useRoute()
  const book = ref<getBooksDto>()
  onMounted(async () => {
    book.value = await getBooksDetails(`${route.params.id}`)
  })
</script>
<template>
    <TableChapters :id="route.params.id"></TableChapters>
</template>
