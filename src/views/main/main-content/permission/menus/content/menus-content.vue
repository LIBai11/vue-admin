<template>
    <div class="menus-content">
        <el-table :data="props.tableValue" row-key="id" height="400" lazy fit>
            <el-table-column
                label="菜单名称"
                prop="name"
                align="center"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="图标" prop="icon" align="center" show-overflow-tooltip>
                <template #default="scope">
                    <el-button v-if="scope.row.children !== null" :icon="scope.row.icon" circle />
                    <el-button v-else :icon="scope.row.icon" type="info" circle plain />
                </template>
            </el-table-column>
            <el-table-column
                label="次序"
                prop="orderNum"
                align="center"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="路由路径"
                prop="path"
                align="center"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="组件路径"
                prop="component"
                align="center"
                width="200px"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="隐藏" prop="isHidden" align="center" show-overflow-tooltip>
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.isHidden"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                        disabled
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
            <el-table-column label="操作" align="center" width="190px" show-overflow-tooltip>
                <template #default="scope">
                    <el-link
                        v-if="scope.row.children !== null"
                        class="link-option"
                        type="success"
                        :icon="Plus"
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
                    <el-link
                        class="link-option"
                        type="danger"
                        :icon="Delete"
                        @click="deleteBtn(scope.row)"
                    >
                        删除
                    </el-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { IManageMenu } from '@/store/permission/menus/type'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { getAssetsIcon, renderIcon } from '@/utils/use-menus'

const props = defineProps<{
    tableValue: IManageMenu[]
}>()
const emits = defineEmits(['handleUpdateBtnClick'])

//编辑按钮
const updateBtn = (menuInfo: IManageMenu) => {
    emits('handleUpdateBtnClick', menuInfo)
}
//删除按钮
const deleteBtn = (menuInfo: IManageMenu) => {
    console.log(menuInfo)
}
</script>

<style scoped lang="less">
.link-option {
    margin-right: 8px;
    font-size: 12px;
}
</style>
