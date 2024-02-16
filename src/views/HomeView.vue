<script setup lang="ts">
  import { getBooks } from '../service/bookApi'
  import CardBook from '../components/CardBook.vue'
  import { onMounted, ref } from 'vue'
  import { getBooksDto } from '../types/book'

  const books = ref<getBooksDto[]>([])

  onMounted(async () => {
   const response = await getBooks() 
    books.value = response.data
  })
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-5 p-10 md:p-0 mt-10">
    <CardBook
      v-for="(book, index) in books"
      :key="index"
      :img="book.image"
      :description="book.description"
      :title="book.title"
      :id="book.id"
    />
  </div>
</template>
