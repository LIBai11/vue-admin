<template>
    <div>
        <el-container>
            <kx-aside :naiMenuList="naiMenuList" />
            <el-container>
                <el-header class="header">
                    <a-header />
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import KxAside from '@/base-ui/aside-menu/kx-aside.vue'
import AHeader from './header/a-header.vue'
import { useSessionCache } from '@/utils/use-storage'
import { IMenuState, IUserData } from '@/store/login/types'
import { getMenuList } from '@/utils/use-menus'

const userData: IUserData = useSessionCache.getCache('userData')
const menuListData: IMenuState = userData.userMenuList
// console.log(menuListData)
const naiMenuList = getMenuList(menuListData)
</script>

<style lang="less" scoped>
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
