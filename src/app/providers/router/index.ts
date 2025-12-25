import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/HomePage.vue')
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import('@/pages/RegistrationPage.vue')
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: () => import('@/pages/FeedbackPage.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/ProfilePage.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/SettingsPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
