<template>
    <div>
        <el-container>
            <kx-aside :naiMenuList="naiMenuList" />
            <el-container>
                <el-header class="header"><a-header /></el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import KxAside from '@/base-ui/aside-menu/kx-aside.vue'
import AHeader from './header/a-header.vue'
import { useSessionCache } from '@/utils/use-storage'
import { IMenuState, IUserData } from '@/store/login/types'
import { getMenuList, mapMenusToRoutes } from '@/utils/use-menus'
import router from '@/router'

const userData: IUserData = useSessionCache.getCache('userData')
const menuListData: IMenuState = userData.userMenuList

const naiMenuList = getMenuList(menuListData)
</script>

<style scoped lang="less">
.main {
    float: left;
}
.header {
    height: 50px;
}
.aside {
    height: 100vh;
}
</style>
<style></style>
