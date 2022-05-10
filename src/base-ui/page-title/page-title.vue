<template>
    <div style="position: relative">
        <n-h5 prefix="bar" type="success">
            <n-text type="primary">{{ props.title }}</n-text>
            <slot name="header"></slot>
        </n-h5>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
    title: string
}>()
</script>

<style lang="less" scoped></style>
