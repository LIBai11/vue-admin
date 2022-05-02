<template>
    <div class="words-header">
        <kx-card>
            <template #header>
                <page-title title="留言管理"></page-title>
                <el-link
                    v-for="(option, index) in commentOptions"
                    :key="option.key"
                    :class="{ bold: checked === index }"
                    class="words-status"
                    target="_blank"
                    @click="handleLink(index)"
                >
                    {{ option.name }}
                </el-link>
            </template>
            <template #body>
                <div class="articles-content">
                    <component :is="currentCommentComponent[linkIndex]" />
                </div>
            </template>
        </kx-card>
    </div>
</template>

<script lang="ts" setup>
import { AllWords, PrimaryWords, VerifyWords } from './page-content/index'
import { KxCard, PageTitle } from '@/base-ui/index'
import { ref } from 'vue'

const currentCommentComponent = [AllWords, PrimaryWords, VerifyWords]
const linkIndex = ref(0)
const checked = ref(0)
const commentOptions = [
    {
        name: '全部',
        key: AllWords,
    },
    {
        name: '正常',
        key: PrimaryWords,
    },
    {
        name: '审核中',
        key: VerifyWords,
    },
]
const handleLink = (index: number) => {
    linkIndex.value = index
    checked.value = index
}
</script>

<style lang="less" scoped>
.words-status {
    margin-right: 20px;
    margin-bottom: -20px;
}

.bold {
    font-weight: bold;
}
</style>
