<template>
    <el-table :data="tableValue" border stripe fit>
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column label="头像" align="center" prop="avatar">
            <template #default="scope">
                <el-image :src="scope.row.avatar" class="content-avatar"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="评论人" align="center" prop="nickname"></el-table-column>
        <el-table-column label="回复人" align="center" prop="replyNickname"></el-table-column>
        <el-table-column label="文章标题" align="center" prop="articleTitle"></el-table-column>
        <el-table-column label="评论内容" align="center" prop="commentContent"></el-table-column>
        <el-table-column label="评论时间" align="center" prop="createTime">
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="isReview">
            <template #default="scope">
                <el-tag v-if="scope.row.isReview === 1">正常</el-tag>
                <el-tag v-else>审核中</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="来源" align="center" prop="type">
            <template #default="scope">
                <el-tag v-if="scope.row.type === 1">文章</el-tag>
                <el-tag v-if="scope.row.type === 2">友链</el-tag>
                <el-tag v-if="scope.row.type === 3">说说</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default>
                <el-button type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { ICommentRecordList } from '@/store/message/comment/types'

const props = defineProps<{
    tableValue: ICommentRecordList
}>()
</script>

<style scoped lang="less">
.content-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
