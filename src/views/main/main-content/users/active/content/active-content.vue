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
            label="昵称"
            prop="nickname"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="登录IP"
            prop="ipAddress"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="登陆地址"
            prop="ipSource"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="浏览器"
            prop="browser"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            align="center"
            label="操作系统"
            prop="os"
            show-overflow-tooltip
        ></el-table-column>

        <el-table-column align="center" label="登录时间" prop="lastLoginTime" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
            <template #default="scope">
                <el-popconfirm
                    confirmButtonText="确认"
                    confirmButtonType="danger"
                    title="确定要下线这个用户吗?"
                    @confirm="handlePopBtn(scope.row.userInfoId)"
                >
                    <template #reference>
                        <el-link type="danger">下线</el-link>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { IActiveUserRecordList } from '@/store/users/active-users/types'

const props = defineProps<{
    tableValue: IActiveUserRecordList
}>()

const emits = defineEmits([
    'handleDeleteComment',
    'handleSelectionChange',
    'handleSwitchChange',
    'handlePopBtn',
])

const handleSelectionChange = (selections: any) => {
    emits('handleSelectionChange', selections)
}
//确认框事件
const handlePopBtn = (userInfoId: number) => {
    emits('handlePopBtn', userInfoId)
}
</script>

<style lang="less" scoped>
.content-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
