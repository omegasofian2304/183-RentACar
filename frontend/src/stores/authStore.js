import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        role: null
    }),
    actions: {
        setAccessToken(token) {
            this.accessToken = token
            const payload = jwtDecode(token)
            this.role = payload.role
        },
        clearAuth() {
            this.accessToken = null
            this.role = null
        }
    }
})