import {createRouter, createWebHistory} from 'vue-router';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Home from '../pages/home.vue';
import Reservation from '../pages/reservation.vue'
import myReservations from '../pages/myReservations.vue'
import AdminOrders from "../pages/adminOrders.vue";
import { useAuthStore } from '../stores/authStore.js';



const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/home', component: Home},
    { path: '/reservation', component: Reservation, meta: { requiresAuth: true } },
    { path: '/myReservations', component: myReservations, meta: { requiresAuth: true } },
    { path: '/admin/reservations', component: AdminOrders, meta: { requiresAuth: true, requiresAdmin: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// if the refresh is good, skip the login or register
router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    if (to.path === '/login' || to.path === '/register') {
        const res = await fetch('http://localhost:3000/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        })
        if (res.ok) {
            const data = await res.json()
            authStore.setAccessToken(data.accessToken)
            return '/home'
        }
    }

    if (to.path === '/home' || to.meta.requiresAuth) {
        try {
            const res = await fetch('http://localhost:3000/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                authStore.setAccessToken(data.accessToken)
            } else if (to.meta.requiresAuth) {
                return '/login'
            }
        } catch {
            if (to.meta.requiresAuth) return '/login'
        }
    }

    if (to.meta.requiresAdmin && authStore.role !== 'admin') {
        return '/home'
    }

    if (to.path === '/') {
        return '/home'
    }
})

export default router;
