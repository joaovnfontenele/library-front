<script setup lang="ts">
  import { getBooksDto } from 'src/types/book'
  import { getBooksDetails } from '../service/bookApi'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import TableChapters from '../components/TableChapters.vue'
  import TabsComponent, { TabsProps } from '../components/TabsComponent.vue'
  import InputText from '../components/InputText.vue'
  import { getChapters } from '../service/chapters'
  import Api from '../service/Api'
  import BtnDefault from '../components/BtnDefault.vue'

  const route = useRoute()
  const book = ref<getBooksDto>()
  const tabs = [
    {
      title: 'Chapters',
      slot: 'chapters',
    },
    {
      title: 'Create',
      slot: 'create',
    },
  ] as TabsProps[]
  onMounted(async () => {
    book.value = await getBooksDetails(`${route.params.id}`)
  })

  const chapters = ref<any[]>([])
  const novaUrl = ref()
  const loop = ref()

  async function getChapterList() {
    chapters.value = (await getChapters(`${route.params.id}`)).data
  }

  async function cirarCapitulo() {
    for (let index = 0; index < +loop.value; index++) {
      try {
        await getChapterList()
        console.log(chapters.value[0].nextChapter)
        await Api.post(`/chapters/web-scraping`, {
          bookId: book.value?.id,
          url: chapters.value[0].nextChapter,
        })
      } catch (error) {
        await getChapterList()
        console.log(chapters.value[0].nextChapter)
        await Api.post(`/chapters/web-scraping`, {
          bookId: book.value?.id,
          url: chapters.value[0].nextChapter,
        })
      }
    }
  }

  async function criarCapituloUrl() {
    await Api.post(`/chapters/web-scraping`, {
      bookId: book.value?.id,
      url: novaUrl.value,
    })
  }

  onMounted(() => {
    getChapterList()
  })
</script>
<template>
  <div class="md:w-3/4">
    <div class="flex py-6">
      <img class="rounded-lg shadow-lg md:w-60" :src="book?.image" alt="" />
      <div class="p-5">
        <a :href="book?.url">
          <h2
            class="dark:text-white mb-3 line-clamp-2 text-3xl font-extrabold tracking-tight text-gray-900"
          >
            {{ book?.title }}
          </h2>
        </a>
        <article
          class="dark:text-gray-400 mb-3 line-clamp-6 text-gray-500"
          v-html="book?.description"
        ></article>
      </div>
    </div>
    <TabsComponent :tabs="tabs">
      <template #chapters>
        <TableChapters :id="route.params.id"></TableChapters>
      </template>
      <template #create>
        <h1
          class="dark:text-gray-400 mb-3 line-clamp-6 font-medium text-gray-500"
        >
          Salvar Capítulo pela Url
        </h1>
        <form @submit.prevent="criarCapituloUrl" class="flex items-end gap-1">
          <InputText
            :required="true"
            class="w-[90%]"
            v-model="novaUrl"
            label="Url do Capítulo"
          ></InputText>
          <BtnDefault>Buscar</BtnDefault>
        </form>

        <h1
          class="dark:text-gray-400 mb-3 mt-8 line-clamp-6 font-medium text-gray-500"
        >
          Salvar Capítulo em Loop
        </h1>
        <form @submit.prevent="cirarCapitulo" class="flex items-end gap-1">
          <InputText
            :disabled="chapters?.length == 0"
            :required="true"
            class="w-[90%]"
            v-model="loop"
            label="Loop"
          ></InputText>
          <BtnDefault :disabled="chapters?.length == 0">Iniciar</BtnDefault>
        </form>
      </template>
    </TabsComponent>
  </div>
</template>
