<template>
    <div class="user-list">
        <kx-card>
            <template #header>
                <page-title title="用户列表"></page-title>
            </template>
            <template #body>
                <div class="user-header">
                    <div class="user-header">
                        <users-header
                            placeholder="请选择登陆方式"
                            @handleSearchBtn="handleSearchBtn"
                        />
                    </div>
                </div>
                <div class="user-content">
                    <users-content
                        :table-value="userList"
                        @handleEditUserInfo="handleEditUserInfo"
                        @handleSwitchChange="handleSwitchChange"
                    />
                </div>
                <div class="content-pagination">
                    <kx-pagination
                        :counts="userCounts"
                        @handleWatchCurrent="handleWatchCurrent"
                        @handleWatchSize="handleWatchSize"
                    />
                </div>
            </template>
        </kx-card>
        <el-dialog v-model="editDialogVisible" title="编辑用户信息" width="400px">
            <el-form ref="ruleFormRef" :model="editForm" :rules="rules">
                <el-form-item label="昵称" prop="userName">
                    <el-input v-model="editForm.userName" placeholder="请输入用户昵称" />
                </el-form-item>
                <el-form-item label="角色" prop="checkRoleBox">
                    <el-checkbox-group v-model="editForm.checkRoleBox" @change="changeCheck">
                        <el-checkbox
                            v-for="role in roleList.data"
                            :key="role"
                            :label="role.roleName"
                            border
                            size="small"
                        />
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="postUserInfo">提交修改</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/index'
import { KxPagination, UsersHeader } from '@/components'
import UsersContent from './content/users-content.vue'
import { IUserListParams } from '@/service/users/user-list/user-list'
import { IUserListRecordList } from '@/store/users/user-list/types'
import { FormInstance, FormRules } from 'element-plus'

const store = useStore()
const queryUserListParams: IUserListParams = {}

const getUserList = (payload: IUserListParams) => {
    store.dispatch('userListModule/getUserList', payload)
    store.dispatch('userRolesModule/gerRoles')
}

//表格实例
const ruleFormRef = ref<FormInstance>()

interface IEditForm {
    userName: string
    checkRoleBox: string[]
}

const editForm = reactive<IEditForm>({
    userName: '',
    checkRoleBox: [],
})
getUserList(queryUserListParams)
//角色列表
const roleList = computed(() => store.state.userRolesModule)
const rules = reactive<FormRules>({
    userName: [
        {
            required: true,
            message: '请输入用户昵称',
            trigger: 'blur',
        },
    ],
    checkRoleBox: [
        {
            type: 'array',
            required: true,
            message: '请选择账号角色',
            trigger: 'change',
        },
    ],
})

const userList = computed<IUserListRecordList>(() => store.state.userListModule.recordList)
const userCounts = computed<number>(() => store.state.userListModule.count)
//搜索按钮
const handleSearchBtn = (searchPayload: IUserListParams) => {
    queryUserListParams.keywords = searchPayload?.keywords
    queryUserListParams.loginType = searchPayload?.loginType
    getUserList(queryUserListParams)
}

//监听当前页数改变
const handleWatchCurrent = (currentPage: number) => {
    queryUserListParams.current = currentPage
    getUserList(queryUserListParams)
}

//监听每页长度变化
const handleWatchSize = (currentSize: number) => {
    queryUserListParams.size = currentSize
    getUserList(queryUserListParams)
}

//禁用/启用按钮变化触发
const handleSwitchChange = (switchInfo: IUserListRecordList) => {
    const disableParams = {
        id: switchInfo.id,
        isDisable: switchInfo.isDisable ? 0 : 1,
    }
    store.dispatch('userListModule/changeUserDisable', disableParams)
}

/**
 * 编辑按钮点击
 */
//对话框
const editDialogVisible = ref(false)

//存储表单传过来的信息
const editUserInfo = ref<IUserListRecordList>()

//将checkList中的值转化为数字数组
const numberCheckList = ref<number[]>([])
const changeCheck = () => {
    numberCheckList.value = []
    editForm.checkRoleBox.forEach((option) => {
        if (option === '管理员') {
            numberCheckList.value.push(1)
        } else if (option === '用户') {
            numberCheckList.value.push(2)
        } else if (option === '测试') {
            numberCheckList.value.push(3)
        }
    })
}
const handleEditUserInfo = (userInfo: IUserListRecordList) => {
    editUserInfo.value = { ...userInfo }
    //将传来的数据放到表单中做默认值
    editForm.checkRoleBox = []
    userInfo.roleList.forEach((role) => {
        editForm.checkRoleBox.push(role.roleName)
    })

    editForm.userName = editUserInfo.value?.nickname
    editDialogVisible.value = true
}
//提交修改信息
const postUserInfo = () => {
    if (editUserInfo.value !== undefined) {
        editUserInfo.value.nickname = editForm.userName
        Object.defineProperty(editUserInfo.value, 'roleIdList', {
            value: numberCheckList.value,
            enumerable: true,
            configurable: true,
            writable: true,
        })
    }
    // console.log(editUserInfo.value)
    store.dispatch('userListModule/editUser', editUserInfo.value).then(() => {
        getUserList(queryUserListParams)
        editDialogVisible.value = false
    })
}
watchEffect(() => {
    // console.log(roleList.value)
})
</script>

<style lang="less" scoped></style>
