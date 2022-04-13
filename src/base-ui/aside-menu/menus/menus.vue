<template>
    <div class="menus">
        <n-scrollbar style="max-height: 90vh">
            <n-layout has-sider>
                <n-layout-sider
                    :collapsed="collapsed"
                    :collapsed-width="64"
                    :width="200"
                    bordered
                    collapse-mode="width"
                    show-trigger
                    @collapse="handleFoldMenu"
                    @expand="handleFoldMenu"
                >
                    <n-menu
                        v-model:value="activeKey"
                        :collapsed="collapsed"
                        :collapsed-icon-size="22"
                        :collapsed-width="64"
                        :options="naiMenuList"
                        @update:value="handleUpdateValue"
                    />
                </n-layout-sider>
            </n-layout>
        </n-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

// eslint-disable-next-line no-undef
const emits = defineEmits(['handleFoldMenu'])
// eslint-disable-next-line no-undef
const props = defineProps({
    naiMenuList: {
        type: Array,
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

const { naiMenuList } = toRefs(props)

const collapsed = ref<boolean>(false)
const activeKey = ref<string | null>(null)
</script>

<style lang="less" scoped>
.menus {
    float: right;
}
</style>
