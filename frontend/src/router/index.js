import {createRouter, createWebHistory} from 'vue-router';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Home from '../pages/home.vue';
import { useAuthStore } from '../stores/authStore.js';


const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/home', component: Home}
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

    if (to.path === '/home') {
        const res = await fetch('http://localhost:3000/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json()
            authStore.setAccessToken(data.accessToken)
        }
    }
})

export default router;
