<template>
    <div class="publish-article">
        <kx-card :cardConfig="config">
            <template #header>
                <article-header :textContent="textContent"></article-header>
            </template>

            <template #body>
                <content-edit @handleTextContent="handleTextContent"></content-edit>
            </template>
        </kx-card>
    </div>
</template>

<script lang="ts" setup>
import { KxCard } from '@/base-ui/index'
import { config } from './kx-card-config/kx-card-config'
import { ArticleHeader, ContentEdit } from './editor/index'
import { ref } from 'vue'

const textContent = ref<string>('')
const handleTextContent = (text: string) => {
    textContent.value = text
}
</script>

<style lang="less" scoped></style>
