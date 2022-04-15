<template>
    <div class="menus">
        <n-scrollbar style="max-height: 90vh">
            <n-layout has-sider>
                <n-layout-sider
                    :collapsed="collapsed"
                    :collapsed-width="menuConfig.collapsedWidth || 64"
                    :width="menuConfig.width || 200"
                    :bordered="menuConfig.bordered || true"
                    collapse-mode="width"
                    :show-trigger="menuConfig.showTrigger || true"
                    @collapse="handleFoldMenu"
                    @expand="handleFoldMenu"
                >
                    <n-menu
                        v-model:value="activeKey"
                        :collapsed-icon-size="menuConfig.collapsedIconSize || 22"
                        :options="menuConfig.options"
                        @update:value="handleUpdateValue"
                    />
                </n-layout-sider>
            </n-layout>
        </n-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { PropType, ref, toRefs } from 'vue'
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
    // console.log(item.href)
    router.push({
        path: item.href ?? 'not-found',
    })
}

const collapsed = ref<boolean>(false)
const activeKey = ref<string | null>(null)
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
#tab-\/home {
    color: green !important;
}
</style>
