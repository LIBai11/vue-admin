<template>
    <div class="public-content">
        <articles-search :status="status" />
    </div>
</template>

<script setup lang="ts">
import { ArticlesSearch } from '@/components'

const status = 1
</script>

<style scoped lang="less"></style>
