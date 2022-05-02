<template>
    <div class="articles">
        <div class="articles-search">
            <kx-card>
                <template #header>
                    <page-title title="文章列表"></page-title>
                    <el-link
                        v-for="(option, index) in articleOptions"
                        :key="option.key"
                        :class="{ bold: checked === index }"
                        class="articles-status"
                        target="_blank"
                        @click="handleLink(index)"
                    >
                        {{ option.name }}
                    </el-link>
                </template>
                <template #body>
                    <div class="articles-content">
                        <component :is="currentContent[linkIndex]" />
                    </div>
                </template>
            </kx-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { KxCard, PageTitle } from '@/base-ui/index'
import {
    AllArticles,
    DraftArticles,
    PublicArticles,
    RecycleArticles,
    SecretArticles,
} from './page-content/index'
import { ref } from 'vue'

const currentContent = [AllArticles, PublicArticles, SecretArticles, DraftArticles, RecycleArticles]
const linkIndex = ref(0)
const checked = ref(0)
const articleOptions = [
    {
        name: '全部',
        key: AllArticles,
    },
    {
        name: '公开',
        key: PublicArticles,
    },
    {
        name: '私密',
        key: SecretArticles,
    },
    {
        name: '草稿箱',
        key: DraftArticles,
    },
    {
        name: '回收站',
        key: RecycleArticles,
    },
]

const handleLink = (index: number) => {
    linkIndex.value = index
    checked.value = index
}
</script>

<style lang="less" scoped>
.articles-status {
    margin-right: 20px;
    margin-bottom: -20px;
}

.bold {
    font-weight: bold;
}
</style>
