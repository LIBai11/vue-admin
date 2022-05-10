<template>
    <el-table :data="props.tableValue" border fit stripe @selection-change="handleSelectionChange">
        <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
            width="40"
        ></el-table-column>
        <el-table-column align="center" label="链接头像" width="100px" prop="linkAvatar">
            <template #default="scope">
                <el-image
                    :src="scope.row.linkAvatar"
                    class="content-avatar"
                    show-overflow-tooltip
                ></el-image>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="链接名称"
            prop="linkName"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="链接地址"
            prop="linkAddress"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="链接介绍"
            prop="linkIntro"
            show-overflow-tooltip
        ></el-table-column>

        <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
            </template>
        </el-table-column>

        <el-table-column
            align="center"
            label="操作"
            width="150px"
            show-overflow-tooltip
            fixed="right"
        >
            <template #default="scope">
                <el-popconfirm
                    :icon="InfoFilled"
                    cancel-button-text="取消"
                    confirm-button-text="确认"
                    icon-color="red"
                    title="确认删除这个友链吗?"
                    @confirm="handleConfirmDeleteBtn(scope.row.id)"
                >
                    <template #reference>
                        <el-button type="danger" :icon="Delete" circle />
                    </template>
                </el-popconfirm>
                <el-button :icon="Edit" circle @click="editBtn(scope.row)" />
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { InfoFilled, Edit, Delete } from '@element-plus/icons-vue/'
import { ILinkRecordList } from '@/store/system'

const props = defineProps<{
    tableValue: ILinkRecordList[]
}>()

const emits = defineEmits(['handleDeleteLink', 'handleSelectionChange', 'handleEditBtn'])

const handleConfirmDeleteBtn = (id: number) => {
    emits('handleDeleteLink', id)
}

const handleSelectionChange = (selections: any) => {
    emits('handleSelectionChange', selections)
}
const editBtn = (link: ILinkRecordList) => {
    emits('handleEditBtn', link)
}
</script>

<style lang="less" scoped>
.content-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
