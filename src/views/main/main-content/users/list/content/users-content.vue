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
        <el-table-column align="center" label="登陆方式" prop="loginType" show-overflow-tooltip>
            <template #default="scope">
                <el-tag v-if="scope.row.loginType === 1" effect="plain" type="info">
                    {{ '邮箱' }}
                </el-tag>
                <el-tag v-if="scope.row.loginType === 2" effect="plain" type="info">
                    {{ 'QQ' }}
                </el-tag>
                <el-tag v-if="scope.row.loginType === 3" effect="plain" type="info">
                    {{ '微博' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="用户角色" prop="roleList" show-overflow-tooltip>
            <template #default="scope">
                <el-tag v-for="tag in scope.row.roleList" :key="tag" type="success">
                    {{ tag.roleName }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="禁用" prop="isDisable" show-overflow-tooltip>
            <template #default="scope">
                <el-switch
                    v-model="scope.row.isDisable"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="disableChanged(scope.row)"
                />
            </template>
        </el-table-column>
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
        <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="上次登录时间"
            prop="lastLoginTime"
            show-overflow-tooltip
        >
            <template #default="scope">
                <span>{{ $filters.formatTime(scope.row.lastLoginTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
            <template #default="scope">
                <el-button
                    plain
                    round
                    size="small"
                    type="primary"
                    @click="handleEditBtnClick(scope.row)"
                >
                    编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { IUserListRecordList } from '@/store/users/user-list/types'

const props = defineProps<{
    tableValue: IUserListRecordList
}>()

const emits = defineEmits([
    'handleDeleteComment',
    'handleSelectionChange',
    'handleSwitchChange',
    'handleEditUserInfo',
])

const handleSelectionChange = (selections: any) => {
    emits('handleSelectionChange', selections)
}
const disableChanged = (switchInfo: IUserListRecordList) => {
    // console.log('调用:', isDisable.value, switchInfo)
    emits('handleSwitchChange', switchInfo)
}
const handleEditBtnClick = (userInfo: IUserListRecordList) => {
    emits('handleEditUserInfo', userInfo)
}
</script>

<style lang="less" scoped>
.content-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
