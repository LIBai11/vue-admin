<template>
    <div class="menus-content">
        <el-table
            :data="props.tableValue"
            height="300"
            border
            stripe
            fit
            @select="handleSelection"
            @select-all="handleSelection"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
                label="角色名"
                prop="roleName"
                align="center"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="权限标签"
                prop="roleLabel"
                align="center"
                width="200px"
                show-overflow-tooltip
            >
                <template #default="scope">
                    <el-button color="#BB97A1" plain>
                        {{ scope.row.roleLabel }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="禁用" prop="requestMethod" align="center" width="90px">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.isDisable"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                        :loading="props.switchLoading"
                        @change="switchChange(scope.row)"
                    />
                </template>
            </el-table-column>

            <el-table-column
                label="创建时间"
                prop="createTime"
                align="center"
                show-overflow-tooltip
            >
                <template #default="scope">
                    <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template #default="scope">
                    <el-link
                        class="link-option"
                        type="primary"
                        :icon="Edit"
                        @click="updateBtn(scope.row)"
                    >
                        修改
                    </el-link>

                    <el-popconfirm
                        confirm-button-text="确认删除"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="请确认是否删除!这将不可恢复"
                        @confirm="deleteBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-link class="link-option" type="danger" :icon="Delete">删除</el-link>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, defineExpose } from 'vue'
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'

import { IRoleRecordList } from '@/store/permission/role/types'

const props = defineProps<{
    tableValue: IRoleRecordList
    switchLoading?: boolean
}>()
const emits = defineEmits([
    'handleUpdateBtnClick',
    'handleDeleteBtnClick',
    'handleAddBtnClick',
    'handleSwitchChange',
    'handleSelectionChange',
])

//编辑按钮
const updateBtn = (roleInfo: IRoleRecordList) => {
    emits('handleUpdateBtnClick', roleInfo)
}
//删除按钮
const deleteBtn = (roleId: number) => {
    emits('handleDeleteBtnClick', roleId)
}
//新增按钮
const addChildMenu = (roleId: number) => {
    emits('handleAddBtnClick', roleId)
}
//更新状态
const switchChange = (roleInfo: IRoleRecordList) => {
    emits('handleSwitchChange', roleInfo)
}
//多选
const handleSelection = (selection: IRoleRecordList[]) => {
    const selectIdArr = selection.map((role: IRoleRecordList) => {
        return role.id
    })
    emits('handleSelectionChange', selectIdArr)
}
defineExpose({
    switchChange,
})
</script>

<style scoped lang="less">
.link-option {
    margin-right: 8px;
    font-size: 12px;
}
</style>
