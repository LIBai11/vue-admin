<template>
    <div class="all-comment">
        <comment-header :placeholder="placeholder" @handleSearchBtn="handleCommentSearchBtn" />
        <comment-content :table-value="commentsInfo" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { CommentHeader, CommentContent } from '@/components'
import { useStore } from '@/store'
import { ICommentParams } from '@/views/main/main-content/message/comment/page-comment'
import { ICommentRecordList } from '@/store/message/comment/types'

const store = useStore()
const placeholder = '请输入评论来源'

//发送搜索请求
const getComments = (payload: ICommentParams) => {
    store.dispatch('commentModule/getComments', payload)
}
const commentsInfo = computed<ICommentRecordList>(() => store.state.commentModule.recordList)
onMounted(() => {
    getComments({})
})

//评论搜索按钮emit
const handleCommentSearchBtn = (newValue: any) => {
    getComments(newValue)
}
</script>

<style scoped lang="less"></style>
