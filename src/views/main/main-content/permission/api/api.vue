<template>
    <div class="menus">
        <kx-card>
            <template #header>
                <page-title title="接口管理"></page-title>
            </template>
            <template #body>
                <div class="user-header">
                    <div class="user-header">
                        <permission-header
                            :options="false"
                            placeholder="请输入接口名称"
                            @handleSearchBtn="handleSearchBtn"
                        />
                    </div>
                </div>
                <div class="user-content">
                    <apis-content
                        :table-value="apiList"
                        :switch-loading="switchLoading"
                        @handleUpdateBtnClick="handleUpdateBtnClick"
                        @handleAddBtnClick="handleAddBtnClick"
                        @handleDeleteBtnClick="handleDeleteBtnClick"
                        @handleSwitchChange="handleSwitchChange"
                    />
                </div>
            </template>
        </kx-card>
        <el-dialog
            v-model="editDialogVisible"
            title="编辑菜单"
            width="400px"
            @closed="editDialogClose"
            destroy-on-close
        >
            <el-form ref="editFormRef" :model="apiInfoForm" :rules="editFormRules">
                <el-form-item label="资源名称" prop="resourceName">
                    <el-input v-model="apiInfoForm.resourceName" label="请输入资源名称" />
                </el-form-item>

                <el-form-item label="资源路径" prop="url" v-if="apiInfoForm.children === null">
                    <el-input
                        v-model="apiInfoForm.url"
                        label="请输入组件路径"
                        v-if="apiInfoForm.children === null"
                    />
                </el-form-item>

                <el-form-item
                    label="请求方式"
                    v-if="apiInfoForm.children === null"
                    prop="requestMethod"
                >
                    <el-radio-group v-model="apiInfoForm.requestMethod">
                        <el-radio-button label="GET" />
                        <el-radio-button label="POST" />
                        <el-radio-button label="PUT" />
                        <el-radio-button label="DELETE" />
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button type="info" @click="editDialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    :loading="buttonLoading"
                    @click="postNewMenu(editFormRef)"
                >
                    提交修改
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/index'
import { PermissionHeader } from '@/components'
import ApisContent from './content/apis-content.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

import { IQueryApiParams } from '@/store/permission'
import { IApiChildren, IApiList } from '@/store/permission/api/types'

const store = useStore()
const queryApiParams: IQueryApiParams = {}
const editFormRef = ref<FormInstance>()

/**
 * 获取数据
 * @param payload
 */
const getApiList = (payload: IQueryApiParams) => {
    store.dispatch('apiModule/getApiList', payload)
}
getApiList(queryApiParams)
const apiList = computed<IApiList[]>(() => store.state.apiModule.data)

//搜索按钮
const handleSearchBtn = (searchPayload: IQueryApiParams) => {
    queryApiParams.keywords = searchPayload?.keywords
    getApiList(queryApiParams)
}

/**
 * 编辑操作
 */
//对话框
const editDialogVisible = ref(false)
//修改的信息存储-表单
let apiInfoForm = reactive<IApiChildren>({
    children: null,
    createTime: '',
    id: 0,
    isAnonymous: 0,
    isDisable: null,
    requestMethod: '',
    resourceName: '',
    url: '',
})
//新增二级菜单
//校验规则
const editFormRules = reactive<FormRules>({
    resourceName: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
    url: [{ required: true, message: '请输入访问路径', trigger: 'blur' }],
    requestMethod: [{ required: true, message: '请输入请求方式', trigger: 'change' }],
})
//修改按钮点击
const handleUpdateBtnClick = (apiInfo: IApiChildren) => {
    apiInfoForm.children = apiInfo.children
    apiInfoForm.isAnonymous = apiInfo.isAnonymous
    apiInfoForm.requestMethod = apiInfo.requestMethod
    apiInfoForm.id = apiInfo.id
    apiInfoForm.url = apiInfo.url
    apiInfoForm.resourceName = apiInfo.resourceName
    apiInfoForm.createTime = apiInfo.createTime
    editDialogVisible.value = true
}
//新增二级菜单
const handleAddBtnClick = (apiId: number) => {
    apiInfoForm.parentId = apiId
    editDialogVisible.value = true
}

//修改提交表单
const buttonLoading = ref(false)
const postNewMenu = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            buttonLoading.value = true
            if (!apiInfoForm.parentId) {
                store.dispatch('apiModule/updateApi', apiInfoForm).then(() => {
                    buttonLoading.value = false
                    getApiList(queryApiParams)
                    editDialogVisible.value = false
                })
            } else {
                store
                    .dispatch('apiModule/updateApi', {
                        parentId: apiInfoForm.parentId,
                        requestMethod: apiInfoForm.requestMethod,
                        resourceName: apiInfoForm.resourceName,
                        url: apiInfoForm.url,
                    })
                    .then(() => {
                        buttonLoading.value = false
                        getApiList(queryApiParams)
                        editDialogVisible.value = false
                    })
            }
        } else {
            ElMessage.warning('请完成表单再提交')
        }
    })
}
//关闭对话框
const editDialogClose = () => {
    apiInfoForm.children = null
    apiInfoForm.createTime = ''
    apiInfoForm.id = 0
    apiInfoForm.isAnonymous = 0
    apiInfoForm.isDisable = null
    apiInfoForm.requestMethod = ''
    apiInfoForm.resourceName = ''
    apiInfoForm.url = ''
    apiInfoForm.parentId = undefined
}
/**
 * 匿名状态切换
 */

const switchLoading = ref(false)
const handleSwitchChange = (apiInfo: IApiChildren) => {
    switchLoading.value = true
    apiInfoForm.children = apiInfo.children
    apiInfoForm.isAnonymous = apiInfo.isAnonymous ? 1 : 0
    apiInfoForm.requestMethod = apiInfo.requestMethod
    apiInfoForm.id = apiInfo.id
    apiInfoForm.url = apiInfo.url
    apiInfoForm.resourceName = apiInfo.resourceName
    apiInfoForm.createTime = apiInfo.createTime

    store
        .dispatch('apiModule/updateApi', apiInfoForm)
        .then((res) => {
            switchLoading.value = false
            return res(true)
        })
        .catch((err) => {
            switchLoading.value = false
            return err(false)
        })
    editDialogClose()
}
/**
 * 删除操作
 */
const handleDeleteBtnClick = (menuId: number) => {
    store.dispatch('apiModule/deleteApi', menuId).then(() => {
        getApiList(queryApiParams)
    })
}
</script>

<style lang="less" scoped></style>
