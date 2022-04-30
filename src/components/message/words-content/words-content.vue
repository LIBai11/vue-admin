<template>
    <el-table :data="props.tableValue" border stripe fit @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="40"
            align="center"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="头像" align="center" prop="avatar">
            <template #default="scope">
                <el-image
                    :src="scope.row.avatar"
                    class="content-avatar"
                    show-overflow-tooltip
                ></el-image>
            </template>
        </el-table-column>
        <el-table-column
            label="留言人"
            align="center"
            prop="nickname"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="留言内容"
            align="center"
            prop="messageContent"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="IP地址"
            align="center"
            prop="ipAddress"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="IP来源"
            align="center"
            prop="ipSource"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="评论时间" align="center" prop="createTime" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="isReview" show-overflow-tooltip>
            <template #default="scope">
                <el-tag v-if="scope.row.isReview === 1">正常</el-tag>
                <el-tag v-else type="info">审核中</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="操作" align="center" show-overflow-tooltip>
            <template #default="scope">
                <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
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

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { ICommentRecordList } from '@/store/message/comment/types'
import { IWordsRecordList } from '@/store/message/words/types'

const props = defineProps<{
    tableValue: IWordsRecordList
}>()

const emits = defineEmits(['handleDeleteComment', 'handleSelectionChange'])

const handleConfirmDeleteBtn = (id: number) => {
    emits('handleDeleteComment', id)
}

const handleSelectionChange = (selections: any) => {
    emits('handleSelectionChange', selections)
}
</script>

<style scoped lang="less">
.content-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
