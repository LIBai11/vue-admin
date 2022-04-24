<template>
    <div class="secret-content">
        <articles-search :status="status" />
    </div>
</template>

<script setup lang="ts">
import { ArticlesSearch } from '@/components'

const status = 2
</script>

<style scoped lang="less"></style>
