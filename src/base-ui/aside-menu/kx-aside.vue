<template>
    <el-aside class="aside" width="auto">
        <titles></titles>
        <menus :menuConfig="menuConfig" @handleFoldMenu="handleFoldMenu"></menus>
    </el-aside>
</template>

<script lang="ts" setup>
import Menus from '@/base-ui/aside-menu/menus/menus.vue'
import Titles from '@/views/main/aside/titles/titles.vue'
import { PropType, ref, toRefs } from 'vue'
import { IMenuConfig } from '@/views/main/config/menu-config/type'

// eslint-disable-next-line no-undef
const props = defineProps({
    menuConfig: {
        type: Object as PropType<IMenuConfig>,
        required: true,
    },
})
const { menuConfig } = toRefs(props)

const collapse = ref<boolean>(false)

const handleFoldMenu = (collapsed: boolean) => {
    collapse.value = collapsed
}
</script>

<style lang="less" scoped></style>
