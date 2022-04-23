<template>
    <div class="menus">
        <n-layout has-sider v-once>
            <n-layout-sider
                :bordered="menuConfig.bordered || true"
                :collapsed="collapsed"
                :collapsed-width="menuConfig.collapsedWidth || 64"
                :show-trigger="menuConfig.showTrigger || true"
                :width="menuConfig.width || 200"
                collapse-mode="width"
                @collapse="handleFoldMenu"
                @expand="handleFoldMenu"
            >
                <n-scrollbar style="max-height: 90vh">
                    <n-menu
                        ref="menuInstRef"
                        v-model:value="activeKey"
                        :collapsed-icon-size="menuConfig.collapsedIconSize || 22"
                        :options="menuConfig.options"
                        @update:value="handleUpdateValue"
                    />
                </n-scrollbar>
            </n-layout-sider>
        </n-layout>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, onMounted, PropType, ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { IMenuConfig } from '@/views/main/config/menu-config/type'
import { MenuInst } from 'naive-ui'
import { useStore } from '@/store'

const store = useStore()
const menuInstRef = ref<MenuInst | null>(null)

const emits = defineEmits(['handleFoldMenu'])
const props = defineProps({
    menuConfig: {
        type: Object as PropType<IMenuConfig>,
        required: true,
    },
})

const handleFoldMenu = () => {
    collapsed.value = !collapsed.value
    emits('handleFoldMenu', collapsed)
    return collapsed.value
}

const router = useRouter()
const collapsed = ref<boolean>(false)
const activeKey = ref<number | null>(null)
//getCurrent->route->state
//getCache->state->
const handleUpdateValue = (key: any, item: any) => {
    sessionStorage.setItem('_MENU_KEY', key)
    // console.log(activeKey.value)
    router.push({
        path: item.href ?? 'not-found',
    })
}

const height = ref<number>(0)
height.value = document.documentElement.clientWidth

//菜单选中状态更新
const updateSelectManu = () => {
    const currentKey = Number(sessionStorage.getItem('_MENU_KEY'))
    activeKey.value = currentKey
    menuInstRef.value?.showOption(currentKey)
}

//监控路由操作菜单选中
onBeforeRouteUpdate((to: any) => {
    // console.log(to)
    const currentKey = props.menuConfig.routeKeysMap.get(to?.href)
    activeKey.value = currentKey
    menuInstRef.value?.showOption(currentKey)
})
let windowHeight = store.state.noAsyncModule.menuStatus

console.log('window', windowHeight)
collapsed.value = windowHeight.value <= 730
windowHeight = 0
onMounted(() => {
    updateSelectManu()
    window.onresize = () => {
        collapsed.value = height.value <= 730
        height.value = document.documentElement.clientWidth

        return height.value
    }
})
</script>

<style lang="less" scoped>
.menus {
    float: right;
}
</style>
<style>
.el-icon {
    margin-left: 15px;
}

.n-layout-toggle-button {
    margin-right: 5px !important;
}

.n-menu-item-content-header {
    margin-left: 15px;
}
</style>
