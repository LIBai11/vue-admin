<template>
    <div class="draft">
        <div class="content-header">
            <articles-search :status="status" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArticlesSearch } from '@/components'
const status = 3
</script>

<style scoped lang="less"></style>
