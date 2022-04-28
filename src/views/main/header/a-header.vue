<template>
    <div class="header">
        <div class="breadcrumb">
            <el-breadcrumb replace separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="breadData.name !== '首页'">
                    {{ breadData.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="avatar">
            <img :src="avatar" alt="" />
        </div>
    </div>
    <div class="header-tabs">
        <el-tabs
            v-model="handleTab.path"
            stretch
            @tab-change="handleTabChange"
            @tab-remove="removeTab"
        >
            <el-tab-pane
                v-for="tab in currentTabs"
                :key="tab.path"
                :closable="tab.path !== '/home'"
                :label="tab.name"
                :name="tab.path"
            ></el-tab-pane>
        </el-tabs>
        <n-button
            class="close-btn"
            size="small"
            tertiary
            type="warning"
            @click="handleCloseTabsBtn"
        >
            全部关闭
        </n-button>
    </div>
</template>

<script lang="ts" setup>
import { IMenuState, IUserData } from '@/store/login/types'
import { useSessionCache } from '@/utils/use-storage'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { pathMapToMenu } from '@/utils/use-menus'
import { ITab } from '@/views/main/header/types'
import { useStore } from '@/store'

const store = useStore()
const route = useRoute()
const router = useRouter()
const userData: IUserData = useSessionCache.getCache('userData')
//头像
const avatar = userData.avatar

//菜单
const userMenuList: IMenuState = userData.userMenuList
const currentPageUrl = ref(route.path)

//二级菜单
const breadData = ref<any>('')
//一级菜单
const superBreadData = ref<any>('')

const currentTabs = ref<ITab[]>(
    useSessionCache.getCache('tabs') || [
        {
            name: '首页',
            path: '/home',
        },
    ]
)
//新添加的标签
const handleTab = ref<ITab>({
    name: '首页',
    path: '/home',
})

//监听路由并操作header
watch(
    () => router.currentRoute.value.path,
    (newRoutePath) => {
        currentPageUrl.value = newRoutePath
        const superCurrentUrl = ref(
            newRoutePath.substring(newRoutePath.indexOf('/') + 1, newRoutePath.lastIndexOf('/'))
        )

        breadData.value = pathMapToMenu(userMenuList, currentPageUrl.value)
        superBreadData.value = pathMapToMenu(userMenuList, `/${superCurrentUrl.value}`)
        //console.log(superBreadData.value)
        const newTab = ref({
            name: breadData.value?.name,
            path: breadData.value?.path,
        })

        //添加tab导航
        if (JSON.stringify(currentTabs.value).indexOf(JSON.stringify(newTab.value)) == -1) {
            currentTabs.value.push(newTab.value) // 进行动态的操作
            if (newTab.value.name !== null) {
                store.dispatch('noAsyncModule/setSessionTabs', currentTabs.value)
            }
        }

        handleTab.value.path = newTab.value.path
    },
    { immediate: true }
)

//移除tab
const removeTab = (handle: string) => {
    for (let i = 0; i < currentTabs.value.length; i++) {
        if (currentTabs.value[i].path === handle) {
            if (handle !== '/home') {
                currentTabs.value.splice(i, 1)
                useSessionCache.setCache('tabs', currentTabs.value)
                if (i - 1 !== currentTabs.value.length - 1) {
                    // console.log('if')
                    handleTab.value.path = currentTabs.value[i].path
                } else {
                    // console.log('else')
                    handleTab.value.path = currentTabs.value[i - 1].path
                }
            }
        }
    }
}

const handleCloseTabsBtn = () => {
    currentTabs.value = [
        {
            name: '首页',
            path: '/home',
        },
    ]
    router.push('/home')
}

const handleTabChange = (handle: string) => {
    router.push(handle)
}
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

.header-tabs {
    height: 50px;
    display: flex;
    justify-content: space-between;

    box-shadow: 10px 10px 20px 10px #e8e8e8;
}

.close-btn {
    margin-top: 10px;
    margin-right: 20px;
}
</style>
<style>
#tab-\/home {
    margin-left: 10px;
    font-weight: bold;
    color: green !important;
}

.el-tabs__item {
    color: green !important;
}
</style>
