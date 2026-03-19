import {createRouter, createWebHistory} from 'vue-router';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Home from '../pages/home.vue';
import Rent from '../pages/rent.vue';


const routes = [
    {path: '/Login', component: Login},
    {path: '/Register', component: Register},
    {path: '/Home', component: Home},
    {path: '/Rent', component: Rent}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
