<template>
    <div>
        <el-container>
            <kx-aside :menuConfig="menuConfig" />
            <el-container>
                <el-header class="header">
                    <a-header />
                </el-header>
                <transition name="el-zoom-in-center">
                    <el-main class="main">
                        <n-scrollbar>
                            <router-view />
                        </n-scrollbar>
                    </el-main>
                </transition>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import KxAside from '@/base-ui/aside-menu/kx-aside.vue'
import AHeader from './header/a-header.vue'
import { menuConfig } from './config'
</script>

<style lang="less" scoped>
.main {
    margin: 35px 20px;
    background-color: #f7f9fb;
}

.header {
    height: 80px;
}

.aside {
    height: 100vh;
}

.main {
    padding: 20px;
    height: 100vh;
}
</style>
<style></style>
