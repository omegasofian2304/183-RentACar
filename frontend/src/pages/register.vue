<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="bg-white w-96 shadow-lg rounded-xl flex flex-col gap-4 p-8">
      <h1 class="font-bold text-2xl text-center text-gray-800">Register</h1>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">Prénom</label>
        <input
            v-model="firstname"
            type="text"
            placeholder="prénom"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label class="text-sm font-medium text-gray-700">Nom</label>
        <input
            v-model="lastname"
            type="text"
            placeholder="nom"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
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
        <label class="text-sm font-medium text-gray-700">Date de naissance</label>
        <input
            v-model="birthdate"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label class="text-sm font-medium text-gray-700">Numéro de téléphone</label>
        <input
            v-model="phone"
            type="tel"
            placeholder="+41 79 123 45 67"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label class="text-sm font-medium text-gray-700">Adresse</label>
        <input
            v-model="address"
            type="text"
            placeholder="Rue du Lac 12, 1000 Lausanne"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button @click.prevent="handleRegister" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors">
        S'inscrire
      </button>
      <router-link to="/login" class="text-blue-500 text-center">Déjà un compte?</router-link>
      <p class="text-red-600">{{error}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const phoneRegex = /^\+?[\d\s\-]{7,15}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const router = useRouter()

// Source Claude
// Prompt : give me a regex check for at least 12 characters, one uppercase, one number and one special character
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const birthdate = ref('')
const phone = ref('')
const address = ref('')
let error = ref('')

async function handleRegister() {
  error.value = ''
  if (!firstname.value || !lastname.value || !email.value || !password.value || !birthdate.value || !phone.value || !address.value) {
    error.value = 'Tout les champs doivent être remplis'
    return
  }

  if (!emailRegex.test(email.value)) {
    error.value = 'Email invalide !'
    return
  }

  if (!phoneRegex.test(phone.value)) {
    error.value = 'Numéro de téléphone invalide !'
    return
  }

  if (!passwordRegex.test(password.value)) {
    error.value = 'Le mot de passe doit contenir au moins 12 caractères, une majuscule, un chiffre et un caractère spécial'
    return
  }

  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      birthdate: birthdate.value,
      phone: phone.value,
      address: address.value
    })
  })

  const data = await res.json()

  if (!res.ok) {
    error.value = data.error
    return
  }

  firstname.value = ''
  lastname.value = ''
  email.value = ''
  password.value = ''
  phone.value = ''
  address.value = ''
  birthdate.value = ''
  await router.replace('/login')
}
</script>