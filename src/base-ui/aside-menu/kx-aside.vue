<template>
    <el-aside class="aside" width="auto">
        <titles></titles>
        <menus :naiMenuList="naiMenuList" @handleFoldMenu="handleFoldMenu"></menus>
    </el-aside>
</template>

<script setup lang="ts">
import Menus from '@/base-ui/aside-menu/menus/menus.vue'
import Titles from '@/views/main/aside/titles/titles.vue'
import { ref, toRefs } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
    naiMenuList: {
        type: Array,
        required: true,
    },
})
const { naiMenuList } = toRefs(props)

const collapse = ref<boolean>(false)

const handleFoldMenu = (collapsed: boolean) => {
    collapse.value = collapsed
}
</script>

<style scoped lang="less"></style>
