import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useSessionCache } from '@/utils/use-storage'
import { ElMessage } from 'element-plus'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('@/views/main/main.vue'),
        children: [],
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
            router.push('/login').then(() => ElMessage.error('登录已失效,请重新登陆'))
            return false
        }
    }
})

export default router
