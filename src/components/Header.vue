<script lang="ts" setup>
  import { ref, onBeforeMount, onMounted } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter, useRoute } from 'vue-router'
  const user = useUserStore()
  const router = useRouter()

  interface listLink {
    name: string
    link: string
  }

  const links = [
    {
      name: 'Home',
      link: 'home',
    },
    {
      name: 'Create Book',
      link: 'create',
    },
    {
      name: 'Services',
      link: '#',
    },
    {
      name: 'Services',
      link: '#',
    },
  ] as listLink[]

  const LinkEnabled = ref(0)
  const openMenuBurger = ref(true)

  function activeLink(link: listLink, index: number) {
    LinkEnabled.value = index
    router.push({ name: link.link })
  }
</script>

<template>
  <header>
    <nav class="border-gray-200">
      <div
        class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
      >
        <!-- icone do header -->
        <a
          href="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="../assets/icon.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span
            class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
            >Library</span
          >
        </a>
        <!-- botão de login/usuario -->
        <div class="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <button
            v-if="!user.islogged"
            @click="router.push('login')"
            type="button"
            class="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login in
          </button>
          <button
            v-else
            @click="user.logout"
            type="button"
            class="rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Logout
          </button>

          <!-- menu burger -->

          <button
            v-if="user.islogged"
            @click="openMenuBurger = !openMenuBurger"
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <!-- lista de links -->
        <div
          v-if="user.islogged"
          :class="
            openMenuBurger
              ? 'hidden w-full items-center justify-between md:order-1 md:flex md:w-auto'
              : 'w-full items-center justify-between md:order-1 md:flex md:w-auto'
          "
          class=" "
          id="navbar-sticky"
        >
          <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800"
          >
            <li v-for="(link, index) in links" :key="index">
              <a
              class="cursor-pointer"
                :class="
                  LinkEnabled == index
                    ? 'block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500'
                    : 'block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                "
                @click="activeLink(link, index)"
                aria-current="page"
                >{{ link?.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
