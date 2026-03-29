<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div class="bg-white w-96 shadow-lg rounded-xl flex flex-col gap-4 p-8">
      <h1 class="font-bold text-2xl text-center text-gray-800">Réserver une voiture</h1>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">Voiture</label>
        <select
            v-model="selectedCar"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Sélectionner une voiture</option>
          <option v-for="car in cars" :key="car.id" :value="car.id">
            {{ car.brand }} {{ car.model }} ({{ car.year }}) - {{ car.price_per_day }} CHF/jour
          </option>
        </select>

        <label class="text-sm font-medium text-gray-700 mt-2">Date de début</label>
        <input
            v-model="startDate"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="text-sm font-medium text-gray-700">Date de fin</label>
        <input
            v-model="endDate"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div v-if="totalPrice" class="mt-2 text-sm text-gray-700">
          Prix total : <span class="font-semibold text-blue-600">{{ totalPrice }} CHF</span>
        </div>
      </div>

      <button @click="handleReservation" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors">
        Réserver
      </button>
      <p class="text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

const cars = ref([])
const selectedCar = ref('')
const startDate = ref('')
const endDate = ref('')
const error = ref('')

onMounted(async () => {
  const res = await fetch('http://localhost:3000/cars', {
    headers: { Authorization: `Bearer ${authStore.accessToken}` }
  })
  const data = await res.json()
  if (res.ok) cars.value = data
})

const totalPrice = computed(() => {
  if (!selectedCar.value || !startDate.value || !endDate.value) return null
  const car = cars.value.find(c => c.id === selectedCar.value)
  if (!car) return null
  const days = Math.ceil((new Date(endDate.value) - new Date(startDate.value)) / (1000 * 60 * 60 * 24))
  if (days <= 0) return null
  return (days * car.price_per_day).toFixed(2)
})

async function handleReservation() {
  error.value = ''

  if (!selectedCar.value || !startDate.value || !endDate.value) {
    error.value = 'Tous les champs sont requis'
    return
  }

  if (new Date(endDate.value) <= new Date(startDate.value)) {
    error.value = 'La date de fin doit être après la date de début'
    return
  }

  const res = await fetch('http://localhost:3000/rentals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authStore.accessToken}`
    },
    body: JSON.stringify({
      carId: selectedCar.value,
      startDate: startDate.value,
      endDate: endDate.value
    })
  })

  const data = await res.json()
  console.log(data)
  if (!res.ok) {
    error.value = data.error
    return
  }

  await router.push('/home')
}
</script>