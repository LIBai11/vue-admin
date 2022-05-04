<template>
    <div class="menus">
        <kx-card>
            <template #header>
                <page-title title="角色管理"></page-title>
            </template>
            <template #body>
                <div class="user-header">
                    <div class="user-header">
                        <permission-header
                            passValue="新增"
                            :passBtn="true"
                            :deleteBtn="true"
                            deleteValue="批量删除"
                            :options="false"
                            placeholder="请输入接口名称"
                            @handleSearchBtn="handleSearchBtn"
                            @handleBatchPass="handleAddBtnClick"
                            @handleBatchDelete="handleDeleteDialog"
                        />
                    </div>
                </div>
                <div class="user-content">
                    <role-content
                        :table-value="roleList"
                        :switch-loading="switchLoading"
                        @handleUpdateBtnClick="handleUpdateBtnClick"
                        @handleDeleteBtnClick="handleDeleteBtnClick"
                        @handleSwitchChange="handleSwitchChange"
                        @handleSelectionChange="handleSelectionChange"
                        ref="roleContentRef"
                    />
                    <div class="content-pagination">
                        <kx-pagination
                            :counts="count"
                            @handleWatchCurrent="handleWatchCurrent"
                            @handleWatchSize="handleWatchSize"
                        />
                    </div>
                </div>
            </template>
        </kx-card>
        <!--新增-->
        <el-dialog
            v-model="editDialogVisible"
            title="编辑菜单"
            width="500px"
            @closed="editDialogClose"
            destroy-on-close
        >
            <el-form
                ref="editFormRef"
                :model="roleInfoForm"
                :rules="editFormRules"
                label-position="top"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleInfoForm.roleName" label="请输入角色名称" />
                </el-form-item>

                <el-form-item label="权限标签" prop="roleLabel">
                    <el-input v-model="roleInfoForm.roleLabel" label="请输入权限标签" />
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="菜单权限" prop="menuIdList">
                            <el-input
                                v-model="filterMenuText"
                                placeholder="键入以搜索"
                                style="width: 150px"
                            />
                            <el-tree
                                ref="menuTreeRef"
                                :data="menus"
                                show-checkbox
                                node-key="id"
                                highlight-current
                                :props="treeProps"
                                :filter-node-method="filterNode"
                                :default-checked-keys="roleInfoForm.menuIdList"
                                @check="menuChanged"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="模块权限" prop="resourceIdList">
                            <el-input
                                v-model="filterResourceText"
                                placeholder="键入以搜索"
                                style="width: 150px"
                            />
                            <el-tree
                                ref="resourceTreeRef"
                                :data="resources"
                                show-checkbox
                                node-key="id"
                                highlight-current
                                :props="treeProps"
                                :filter-node-method="filterNode"
                                :default-checked-keys="roleInfoForm.resourceIdList"
                                @check="resourceChanged"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
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

        <!--删除-->
        <el-dialog
            v-model="deleteDialogVisible"
            close-on-press-escape
            title="确认删除选择的角色吗?"
            width="300px"
            destroy-on-close
        >
            <span class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取消</el-button>
                <el-popconfirm
                    :icon="InfoFilled"
                    cancel-button-text="取消"
                    confirm-button-text="确认删除"
                    icon-color="red"
                    title="请再次确认是否删除选中的分类名!"
                    @confirm="handleBatchDelete"
                >
                    <template #reference>
                        <el-button type="primary">确认删除</el-button>
                    </template>
                </el-popconfirm>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/index'
import { PermissionHeader } from '@/components'
import RoleContent from './content/role-content.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { KxPagination } from '@/components'
import { InfoFilled } from '@element-plus/icons-vue'

import {
    IQueryApiParams,
    IQueryRoleListParams,
    IRoleMenuChild,
    IRoleResourceChild,
} from '@/store/permission'

import { IRoleRecordList } from '@/store/permission/role/types'
import type { ElTree } from 'element-plus'

const store = useStore()
const queryRoleParams: IQueryRoleListParams = {}
const editFormRef = ref<FormInstance>()
const roleContentRef = ref<InstanceType<typeof RoleContent>>()

/**
 * 获取数据
 * @param payload
 */
const getRoleList = (payload: IQueryRoleListParams) => {
    store.dispatch('roleModule/getRoleList', payload)
    store.dispatch('roleMenuModule/getRoleMenuList')
    store.dispatch('roleResourceModule/getRoleResourceList')
}
getRoleList(queryRoleParams)
const roleList = computed<IRoleRecordList>(() => store.state.roleModule.recordList)
const count = computed<number>(() => store.state.roleModule.count)
//角色菜单
const menus = computed<IRoleMenuChild[]>(() => store.state.roleMenuModule.data)
//角色资源
const resources = computed<IRoleResourceChild[]>(() => store.state.roleResourceModule.data)

//搜索按钮
const handleSearchBtn = (searchPayload: IQueryApiParams) => {
    queryRoleParams.keywords = searchPayload?.keywords
    getRoleList(queryRoleParams)
}
/**
 * 新增角色
 */
const resourceTreeRef = ref<InstanceType<typeof ElTree>>()
const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const treeProps = {
    children: 'children',
    label: 'label',
}

//菜单/资源过滤
interface ITree {
    id: number
    label: string
    children?: ITree[]
}
const filterMenuText = ref('')
const filterResourceText = ref('')
watch(filterMenuText, (val) => {
    menuTreeRef.value!.filter(val)
})
watch(filterResourceText, (val) => {
    resourceTreeRef.value!.filter(val)
})
const filterNode = (value: string, data: ITree) => {
    if (!value) return true
    return data.label.includes(value)
}

const menuChanged = () => {
    const menuIdList: any[] = menuTreeRef.value!.getCheckedKeys(false)
    roleInfoForm.menuIdList = menuIdList
}

const resourceChanged = () => {
    const resourceIdList: any[] = resourceTreeRef.value!.getCheckedKeys(false)
    roleInfoForm.resourceIdList = resourceIdList
}

/**
 * 分页操作
 */
const handleWatchCurrent = (currentPage: number) => {
    queryRoleParams.currentPage = currentPage
    getRoleList(queryRoleParams)
}
const handleWatchSize = (currentSize: number) => {
    queryRoleParams.currentSize = currentSize
    getRoleList(queryRoleParams)
}

/**
 * 编辑操作
 */
//新增/编辑按钮状态
const btnStatus = ref<'ADD' | 'UPDATE' | null>()
//对话框
const editDialogVisible = ref(false)
//修改的信息存储-表单
let roleInfoForm = reactive<IRoleRecordList>({
    id: 0,
    roleName: '',
    roleLabel: '',
    createTime: '',
    isDisable: 0,
    resourceIdList: [],
    menuIdList: [],
})
//新增二级菜单
//校验规则
const editFormRules = reactive<FormRules>({
    roleName: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
    roleLabel: [{ required: true, message: '请输入访问路径', trigger: 'blur' }],
    menuIdList: [{ required: false, type: 'array', message: '请输入菜单权限', trigger: 'change' }],
    resourceIdList: [
        { required: false, type: 'array', message: '请选择资源权限', trigger: 'change' },
    ],
})

//修改按钮点击
const handleUpdateBtnClick = (roleInfo: IRoleRecordList) => {
    btnStatus.value = 'UPDATE'
    roleInfoForm.roleLabel = roleInfo.roleLabel
    roleInfoForm.roleName = roleInfo.roleName
    roleInfoForm.id = roleInfo.id
    roleInfoForm.isDisable = roleInfo.isDisable
    roleInfoForm.resourceIdList = roleInfo.resourceIdList
    roleInfoForm.menuIdList = roleInfo.menuIdList
    roleInfoForm.createTime = roleInfo.createTime
    editDialogVisible.value = true
}
//新增角色
const handleAddBtnClick = () => {
    btnStatus.value = 'ADD'
    editDialogVisible.value = true
}

//修改提交表单
const buttonLoading = ref(false)
const postNewMenu = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            buttonLoading.value = true
            if (btnStatus.value === 'ADD') {
                store
                    .dispatch('roleModule/addRole', {
                        menuIdList: roleInfoForm.menuIdList,
                        resourceIdList: roleInfoForm.resourceIdList,
                        roleLabel: roleInfoForm.roleLabel,
                        roleName: roleInfoForm.roleName,
                    })
                    .then(() => {
                        editDialogVisible.value = false
                        buttonLoading.value = false
                        editDialogClose()
                        btnStatus.value = null
                        getRoleList(queryRoleParams)
                        return true
                    })
                    .catch(() => {
                        editDialogClose()
                        btnStatus.value = null
                        buttonLoading.value = false
                        return false
                    })
            } else if (btnStatus.value === 'UPDATE') {
                store
                    .dispatch('roleModule/updateMenuRole', roleInfoForm)
                    .then(() => {
                        editDialogVisible.value = false
                        buttonLoading.value = false
                        editDialogClose()
                        btnStatus.value = null
                        getRoleList(queryRoleParams)
                        return true
                    })
                    .catch(() => {
                        editDialogClose()
                        btnStatus.value = null
                        buttonLoading.value = false
                        return false
                    })
            }
        } else {
            ElMessage.warning('请完成表单再提交')
        }
    })
}

//关闭对话框
const editDialogClose = () => {
    roleInfoForm.roleLabel = ''
    roleInfoForm.roleName = ''
    roleInfoForm.id = 0
    roleInfoForm.isDisable = 0
    roleInfoForm.resourceIdList = []
    roleInfoForm.menuIdList = []
    roleInfoForm.createTime = ''
}
/**
 * 匿名状态切换
 */
const switchLoading = ref(false)
const handleSwitchChange = (roleInfo: any) => {
    roleContentRef.value.switchChange = (function () {
        switchLoading.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switchLoading.value = false
                ElMessage.info('切换失败!没写这个功能,真不是我懒,是后端没提供[doge]')
                editDialogClose()
                return reject(new Error('Error'))
            }, 1000)
        })
    })()
}
/**
 * 删除操作
 */
const selections = ref<number[]>([])
const deleteDialogVisible = ref(false)
const handleDeleteDialog = () => {
    if (selections.value.length === 0) ElMessage.warning('请选择后再进行操作')
    else deleteDialogVisible.value = true
}
const handleSelectionChange = (selectRoles: number[]) => {
    selections.value = selectRoles
}
const handleDeleteBtnClick = (menuId: any) => {
    store.dispatch('roleModule/deleteRole', [menuId]).then(() => {
        getRoleList(queryRoleParams)
    })
}
/**
 *批量删除
 */
const handleBatchDelete = () => {
    store.dispatch('roleModule/deleteRole', selections.value).then(() => {
        getRoleList(queryRoleParams)
        deleteDialogVisible.value = false
    })
}
</script>

<style lang="less" scoped></style>
