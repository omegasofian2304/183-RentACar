<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">

    <!-- HEADER -->
    <header class="bg-white shadow-md">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">RentACar</h1>

        <div class="flex gap-2">
          <template v-if="authStore.accessToken">
            <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
              Logout
            </button>
            <button @click="goToMyReservations" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Mes réservations
            </button>
          </template>
          <template v-else>
            <button @click="goToLogin" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Login
            </button>
            <button @click="goToRegister" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Register
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- HERO SECTION -->
    <main class="flex flex-1 items-center justify-center">
      <div class="max-w-4xl text-center px-6">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">
          Bienvenue sur RentACar
        </h2>
        <p class="text-gray-600 text-lg mb-8">
          Une plateforme intuitive pour louer votre future voiture.
        </p>

        <button v-if="authStore.accessToken" @click="goToReservation" class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
          Réserver
        </button>
        <button v-else @click="goToLogin" class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
          Commencer
        </button>
      </div>
    </main>

    <!-- FEATURES -->
    <section class="bg-white py-16">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 class="font-semibold text-lg mb-2 text-gray-800">Simple</h3>
          <p class="text-gray-600 text-sm">
            Une interface claire et facile à utiliser.
          </p>
        </div>

        <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 class="font-semibold text-lg mb-2 text-gray-800">Rapide</h3>
          <p class="text-gray-600 text-sm">
            Accédez rapidement aux offres de location.
          </p>
        </div>

        <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 class="font-semibold text-lg mb-2 text-gray-800">Réservation</h3>
          <p class="text-gray-600 text-sm">
            Réserver une voiture.
          </p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/authStore.js";

const router = useRouter()
const authStore = useAuthStore()

function goToLogin() {

  router.replace('/login')
}

function goToRegister() {

  router.replace('/register')
}

function goToReservation() {
  router.replace('/reservation')
}

function goToMyReservations() {
  router.replace('/myReservations')
}

async function handleLogout() {
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include'
  })
  authStore.clearAuth()
  await router.push('/login')
}

</script>