<template>
    <div class="recycle-content">
        <articles-search :isDelete="isDelete" />
    </div>
</template>

<script setup lang="ts">
import { ArticlesSearch } from '@/components'

const isDelete = 1
</script>

<style scoped lang="less"></style>
