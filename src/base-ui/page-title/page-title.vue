<template>
    <div style="position: relative">
        <n-h5 type="success" prefix="bar">
            <n-text type="primary">{{ props.title }}</n-text>
        </n-h5>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    title: string
}>()
</script>

<style scoped lang="less"></style>
