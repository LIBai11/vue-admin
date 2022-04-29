<template>
    <div class="all-comment">
        <comment-header :placeholder="placeholder" @handleSearchBtn="handleCommentSearchBtn" />
    </div>
</template>

<script setup lang="ts">
import { CommentHeader } from '@/components'
import { useStore } from '@/store'
import { ICommentParams } from '@/views/main/main-content/message/comment/page-comment'
import { onMounted } from 'vue'

const store = useStore()
const placeholder = '请输入评论来源'
//发送搜索请求
const getComments = (payload: ICommentParams) => {
    payload.isReview = 1
    store.dispatch('commentModule/getComments', payload)
}

onMounted(() => {
    getComments({})
})

//评论搜索按钮emit
const handleCommentSearchBtn = (newValue: any) => {
    getComments(newValue)
}
</script>

<style scoped lang="less"></style>
