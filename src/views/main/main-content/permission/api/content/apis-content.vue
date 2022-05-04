<template>
    <div class="menus-content">
        <el-table :data="props.tableValue" row-key="id" height="400" fit>
            <el-table-column
                label="资源名称"
                prop="resourceName"
                align="left"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="资源路径"
                prop="url"
                align="left"
                width="200px"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="请求方式" prop="requestMethod" align="center" width="90px">
                <template #default="scope">
                    <el-button
                        v-if="scope.row.requestMethod === 'GET'"
                        type="primary"
                        size="small"
                        plain
                        round
                    >
                        {{ scope.row.requestMethod }}
                    </el-button>
                    <el-button
                        v-if="scope.row.requestMethod === 'POST'"
                        type="success"
                        size="small"
                        plain
                        round
                    >
                        {{ scope.row.requestMethod }}
                    </el-button>
                    <el-button
                        v-if="scope.row.requestMethod === 'PUT'"
                        type="warning"
                        size="small"
                        plain
                        round
                    >
                        {{ scope.row.requestMethod }}
                    </el-button>
                    <el-button
                        v-if="scope.row.requestMethod === 'DELETE'"
                        type="danger"
                        size="small"
                        plain
                        round
                    >
                        {{ scope.row.requestMethod }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="匿名访问" prop="isAnonymous" align="left" width="90px">
                <template #default="scope">
                    <el-switch
                        v-if="scope.row.children === null"
                        v-model="scope.row.isAnonymous"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                        :loading="props.switchLoading"
                        @change="switchChange(scope.row)"
                    ></el-switch>
                    <span v-else></span>
                </template>
            </el-table-column>

            <el-table-column label="创建时间" prop="createTime" align="left" show-overflow-tooltip>
                <template #default="scope">
                    <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template #default="scope">
                    <el-link
                        v-if="scope.row.children !== null"
                        class="link-option"
                        type="success"
                        :icon="Plus"
                        @click="addChildMenu(scope.row.id)"
                    >
                        新增
                    </el-link>
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
import { defineEmits, defineProps, ref } from 'vue'
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { IApiChildren, IApiList } from '@/store/permission/api/types'

const props = defineProps<{
    tableValue: IApiList[]
    switchLoading?: boolean
}>()
const emits = defineEmits([
    'handleUpdateBtnClick',
    'handleDeleteBtnClick',
    'handleAddBtnClick',
    'handleSwitchChange',
])

//编辑按钮
const updateBtn = (apiInfo: IApiChildren) => {
    emits('handleUpdateBtnClick', apiInfo)
}
//删除按钮
const deleteBtn = (apiId: number) => {
    emits('handleDeleteBtnClick', apiId)
}
//新增按钮
const addChildMenu = (apiId: number) => {
    emits('handleAddBtnClick', apiId)
}
//更新匿名状态
const switchChange = (apiInfo: IApiChildren) => {
    // console.log(apiInfo)
    emits('handleSwitchChange', apiInfo)
}
</script>

<style scoped lang="less">
.link-option {
    margin-right: 8px;
    font-size: 12px;
}
</style>
