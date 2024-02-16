import { createRouter, createWebHistory } from 'vue-router'
import Api from '../service/Api'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create-book',
      name: 'create',
      component: import('../views/CreateBook.vue'),
    },
    {
      path: '/book-details/:id',
      name: 'book-details',
      component: import('../views/BookDetails.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const user = useUserStore()
  if (to.name !== 'login') {
    const token = localStorage.getItem('token')
    if (token) {
      Api.setToken(`Bearer ${token}`)
      user.token = token
      user.islogged = true
    } else {
      user.islogged = false
      return {
        name: 'login',
      }
    }
  }
})

export default router
