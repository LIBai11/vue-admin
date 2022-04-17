<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{ title }}</span>
                <slot name="header"></slot>
            </div>
        </template>
        <div>
            <slot name="body"></slot>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})
const title = ref(props.title)
</script>

<style scoped lang="less"></style>
