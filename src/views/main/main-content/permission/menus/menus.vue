<template>
    <div class="menus">
        <kx-card>
            <template #header>
                <page-title title="菜单管理"></page-title>
            </template>
            <template #body>
                <div class="user-header">
                    <div class="user-header">
                        <permission-header :options="false" @handleSearchBtn="handleSearchBtn" />
                    </div>
                </div>
                <div class="user-content">
                    <menus-content
                        :table-value="manageMenus"
                        @handleUpdateBtnClick="handleUpdateBtnClick"
                    />
                </div>
            </template>
        </kx-card>
        <el-dialog v-model="editDialogVisible" title="编辑菜单" width="400px" destroy-on-close>
            <el-form ref="editFormRef" :model="menuInfoForm" :rules="editFormRules">
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="menuInfoForm.name" label="请输入菜单名称" />
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input
                        v-model="menuInfoForm.icon"
                        ref="inputIconRef"
                        v-click-outside="onInputIcon"
                    >
                        <template #prepend>
                            <el-button :icon="menuInfoForm.icon" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="组件路径" prop="component">
                    <el-input v-model="menuInfoForm.component" label="请输入组件路径" />
                </el-form-item>
                <el-form-item label="路由路径" prop="path">
                    <el-input v-model="menuInfoForm.path" label="请输入访问路径" />
                </el-form-item>
                <el-form-item label="显示排序">
                    <el-input-number v-model="menuInfoForm.orderNum" size="small" :min="1" />
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-switch
                        v-model="menuInfoForm.isHidden"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                        inline-prompt
                    />
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button type="info" @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="postNewMenu">提交修改</el-button>
            </template>
        </el-dialog>
        <el-popover
            ref="iconPopoverRef"
            :virtual-ref="inputIconRef"
            trigger="click"
            title="请选择一个标签"
            virtual-triggering
            style="width: 340px"
        >
            <div class="icon-popover">
                <el-select-v2
                    v-model="menuInfoForm.icon"
                    filterable
                    :options="selectIconData"
                    placeholder="Please select"
                >
                    <template #default="{ item }">
                        <el-link disabled :icon="item.value" style="color: #000"></el-link>
                    </template>
                </el-select-v2>
            </div>
        </el-popover>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, unref } from 'vue'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/index'
import { PermissionHeader } from '@/components'
import MenusContent from './content/menus-content.vue'
import { IManageMenu } from '@/store/permission/menus/type'
import { IQueryManageMenusParams } from '@/service/permission'
import { FormInstance, FormRules } from 'element-plus'
import { ClickOutside as vClickOutside } from 'element-plus'
import icons from './content/icon-list/icons.json'

const store = useStore()
const queryManageMenusParams: IQueryManageMenusParams = {}
const editFormRef = ref<FormInstance>()
/**
 * popover框
 */
const inputIconRef = ref()
const iconPopoverRef = ref()
const initials = icons
const selectIconData = initials.map((icon: string) => {
    return { value: icon, label: icon }
})

/**
 * 获取数据
 * @param payload
 */
const getManageMenuList = (payload: IQueryManageMenusParams) => {
    store.dispatch('menuModule/getMangeMenuList', payload)
}
getManageMenuList(queryManageMenusParams)
const manageMenus = computed<IManageMenu[]>(() => store.state.menuModule.data)

//搜索按钮
const handleSearchBtn = (searchPayload: IQueryManageMenusParams) => {
    queryManageMenusParams.keywords = searchPayload?.keywords
    getManageMenuList(queryManageMenusParams)
}

/**
 * 编辑操作
 */
//对话框
const editDialogVisible = ref(false)
//修改的信息存储-表单
let menuInfoForm = reactive<IManageMenu>({
    id: 1,
    name: '',
    path: '',
    component: '',
    icon: '',
    createTime: '',
    orderNum: 1,
    isDisable: null,
    isHidden: 0,
    children: [],
})
//校验规则
const editFormRules = reactive<FormRules>({
    name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
    component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
    icon: [{ required: true, message: '请输入或选择图标', trigger: 'blur' }],
})
//修改按钮点击
const handleUpdateBtnClick = (menuInfo: IManageMenu) => {
    menuInfoForm.name = menuInfo.name
    menuInfoForm.path = menuInfo.path
    menuInfoForm.id = menuInfo.id
    menuInfoForm.orderNum = menuInfo.orderNum
    menuInfoForm.isHidden = menuInfo.isHidden
    menuInfoForm.component = menuInfo.component
    menuInfoForm.icon = menuInfo.icon

    editDialogVisible.value = true
}
//选择图标
const onInputIcon = () => {
    unref(iconPopoverRef).popperRef?.delayHide?.()
}
//提交表单
const postNewMenu = () => {
    editDialogVisible.value = false
}
</script>

<style lang="less" scoped></style>
