<template>
  <header class="bg-white shadow-md">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-800">RentACar</h1>
      <div class="flex gap-2">
        <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
          Logout
        </button>
        <button @click="goToHome" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          Accueil
        </button>
      </div>
    </div>
  </header>

  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Toutes les réservations</h1>

    <div class="w-full max-w-2xl flex flex-col gap-4">
      <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-2xl shadow-md p-6"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-gray-800 text-lg">{{ order.brand }} {{ order.model }}</p>
            <p class="text-sm text-gray-500 mt-1">Du {{ formatDate(order.start_date) }} au {{ formatDate(order.end_date) }}</p>
          </div>
          <span class="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
            {{ order.total_price }} CHF
          </span>
        </div>

        <div class="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-600 flex gap-6">
          <p>Vitesse max : <span class="font-medium text-gray-800">{{ order.max_speed }} km/h</span></p>
          <p>Plaque : <span class="font-medium text-gray-800">{{ order.license_plate }}</span></p>
        </div>

        <div class="mt-2 text-sm text-gray-600">
          <p>ID client : <span class="font-medium text-gray-800">{{ order.client_id }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const orders = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/admin/orders', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })

  if (!res.ok) {
    await router.push('/home')
    return
  }

  const data = await res.json()
  orders.value = data.orders ?? []
})

async function handleLogout() {
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include'
  })
  authStore.clearAuth()
  await router.push('/login')
}

async function goToHome() {
  await router.push('/home')
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-CH', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>