<template>
    <el-table :data="props.tableValue" border fit stripe @selection-change="handleSelectionChange">
        <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
            width="40"
        ></el-table-column>
        <el-table-column align="center" label="头像" prop="avatar">
            <template #default="scope">
                <el-image
                    :src="scope.row.avatar"
                    class="content-avatar"
                    show-overflow-tooltip
                ></el-image>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="评论人"
            prop="nickname"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="回复人"
            prop="replyNickname"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="文章标题"
            prop="articleTitle"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="评论内容"
            prop="commentContent"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="评论时间" prop="createTime" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="isReview" show-overflow-tooltip>
            <template #default="scope">
                <el-tag v-if="scope.row.isReview === 1">正常</el-tag>
                <el-tag v-else type="info">审核中</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="来源" prop="type" show-overflow-tooltip>
            <template #default="scope">
                <el-tag v-if="scope.row.type === 1" effect="plain" round type="success">
                    文章
                </el-tag>
                <el-tag v-if="scope.row.type === 2" effect="plain" round type="warning">
                    友链
                </el-tag>
                <el-tag v-if="scope.row.type === 3" effect="plain" round type="danger">说说</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
            <template #default="scope">
                <el-popconfirm
                    :icon="InfoFilled"
                    cancel-button-text="取消"
                    confirm-button-text="确认"
                    icon-color="red"
                    title="确认删除这篇标签吗?"
                    @confirm="handleConfirmDeleteBtn(scope.row.id)"
                >
                    <template #reference>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue/'
import { ICommentRecordList } from '@/store/message/comment/types'
import { ILinkRecordList } from '@/store/system'

const props = defineProps<{
    tableValue: ICommentRecordList
}>()

const emits = defineEmits(['handleDeleteComment', 'handleSelectionChange'])

const handleConfirmDeleteBtn = (id: number) => {
    emits('handleDeleteComment', id)
}

const handleSelectionChange = (selections: any) => {
    emits('handleSelectionChange', selections)
}
</script>

<style lang="less" scoped>
.content-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
