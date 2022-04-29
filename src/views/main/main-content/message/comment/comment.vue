<template>
    <div class="comment-header">
        <kx-card>
            <template #header>
                <page-title title="评论管理"></page-title>
                <el-link
                    target="_blank"
                    v-for="(option, index) in commentOptions"
                    :key="option.key"
                    @click="handleLink(index)"
                    class="comment-status"
                    :class="{ bold: checked === index }"
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
import { AllComment, PrimaryComment, VerifyComment } from './page-comment/index'
import { KxCard, PageTitle } from '@/base-ui/index'
import { ref } from 'vue'

const currentCommentComponent = [AllComment, PrimaryComment, VerifyComment]
const linkIndex = ref(0)
const checked = ref(0)
const commentOptions = [
    {
        name: '全部',
        key: AllComment,
    },
    {
        name: '正常',
        key: PrimaryComment,
    },
    {
        name: '审核',
        key: VerifyComment,
    },
]
const handleLink = (index: number) => {
    linkIndex.value = index
    checked.value = index
}
</script>

<style lang="less" scoped>
.comment-status {
    margin-right: 20px;
    margin-bottom: -20px;
}
.bold {
    font-weight: bold;
}
</style>
