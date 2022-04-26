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
import { ref } from 'vue'
import { KxCard } from '@/base-ui/index'
import { config } from './kx-card-config/config'
import { ArticleHeader, ContentEdit } from './editor/index'

const textContent = ref<string>('')
const handleTextContent = (text: string) => {
    textContent.value = text
}
</script>

<style lang="less" scoped></style>
