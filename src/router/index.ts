import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useSessionCache } from '@/utils/use-storage'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('@/views/main/Main.vue'),
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/not-found.vue'),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

//导航守卫
router.beforeEach((to) => {
    if (to.path !== '/login') {
        const userData = useSessionCache.getCache('userData')
        if (userData) {
            return true
        } else {
            router.push('/login')
            return false
        }
    }
})

export default router
