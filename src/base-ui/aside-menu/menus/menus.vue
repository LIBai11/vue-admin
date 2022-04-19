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
import { onMounted, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IMenuConfig } from '@/views/main/config/menu-config/type'

// eslint-disable-next-line no-undef
const emits = defineEmits(['handleFoldMenu'])
// eslint-disable-next-line no-undef
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

const handleUpdateValue = (key: any, item: any) => {
    // console.log(activeKey.value)
    router.push({
        path: item.href ?? 'not-found',
    })
}

const collapsed = ref<boolean>(false)
const activeKey = ref<string | null>(null)

const height = ref<number>(0)
height.value = document.documentElement.clientWidth
onMounted(() => {
    window.onresize = () => {
        collapsed.value = height.value <= 730
        return (height.value = document.documentElement.clientWidth)
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
