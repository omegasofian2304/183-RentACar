<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="bg-white w-96 shadow-lg rounded-xl flex flex-col gap-4 p-8">
      <h1 class="font-bold text-2xl text-center text-gray-800">Login</h1>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">Email</label>
        <input
            v-model="email"
            type="email"
            placeholder="exemple@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label class="text-sm font-medium text-gray-700">Mot de passe</label>
        <input
            v-model="password"
            type="password"
            placeholder="PASSWORD"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button @click.prevent="handleLogin" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors">
        Se connecter
      </button>

      <router-link to="/register" class="text-blue-500 text-center">Pas de compte?</router-link>
      <p class="text-red-600">{{error}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const email = ref('')
const password = ref('')
let error = ref('')

async function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email et mot de passe requis'
    return
  }
  if (!emailRegex.test(email.value)) {
    error.value = 'Email invalide !'
    return
  }

  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })

  const data = await res.json()

  if (!res.ok) {
    error.value = data.error
    return
  }

  authStore.setAccessToken(data.accessToken)

  email.value = ''
  password.value = ''
  await router.push('/home')
}
</script>