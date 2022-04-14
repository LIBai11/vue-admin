<template>
    <div>
        <el-container>
            <kx-aside :menuConfig="menuConfig" />
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
import { menuConfig } from './config'
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
