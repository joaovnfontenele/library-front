import { ref } from 'vue'
import { defineStore } from 'pinia'
import Api from '../service/Api'
import { useRouter } from 'vue-router'
import notify from '../utils/notify'

export const useUserStore = defineStore('user', () => {
  const islogged = ref(false)
  const user = ref(0)
  const token = ref('')

  const router = useRouter()
  async function signIn(login: string, password: string) {
    if (!login || !password) return
    const { data, error } = await Api.post<any>('/signIn', {
      login,
      password,
    })

    if (error) {
      notify.error('Login ou Senha Incorreto !!')
      return
    }

    token.value = `Bearer ${data.access_token}`
    Api.setToken(`Bearer ${data.access_token}`)
    localStorage.setItem('token', `${data.access_token}`)
    islogged.value = true

    router.push({ name: 'home' })
  }

  async function logout() {
    token.value = ``
    Api.setToken('')
    localStorage.removeItem('token')
    islogged.value = false
    router.push({ name: 'login' })
  }

  return { user, islogged, token, signIn, logout }
})
