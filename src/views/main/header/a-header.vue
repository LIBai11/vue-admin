<template>
    <div class="header">
        <div class="breadcrumb">
            <el-breadcrumb superBreadData>
                <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
                <el-breadcrumb-item v-if="superBreadData" :to="{ path: '/' }">{{
                    superBreadData.name
                }}</el-breadcrumb-item>
                <el-breadcrumb-item> {{ breadData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="avatar">
            <img :src="avatar" alt="" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IMenuState, IUserData } from '@/store/login/types'
import { useSessionCache } from '@/utils/use-storage'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { pathMapToMenu } from '@/utils/use-menus'

const route = useRoute()
const router = useRouter()
const userData: IUserData = useSessionCache.getCache('userData')
//头像
const avatar = userData.avatar

//菜单
const userMenuList: IMenuState = userData.userMenuList
const currentPageUrl = ref(route.path)

//二级菜单
const breadData = ref('')
//一级菜单
const superBreadData = ref('')

//监听路由并操作二级菜单
watch(
    () => router.currentRoute.value.path,
    (newRoutePath) => {
        currentPageUrl.value = newRoutePath
        const superCurrentUrl = ref(
            newRoutePath.substring(newRoutePath.indexOf('/') + 1, newRoutePath.lastIndexOf('/'))
        )

        breadData.value = pathMapToMenu(userMenuList, currentPageUrl.value)
        superBreadData.value = pathMapToMenu(userMenuList, `/${superCurrentUrl.value}`)
        console.log(superBreadData.value)
    },
    { immediate: true }
)
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;

    align-items: center;
}

.foldIcon {
    font-size: 25px;
    line-height: 55px;
}

.avatar {
    width: 50px;

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 10px;
    }
}
</style>
