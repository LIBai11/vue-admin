<template>
    <div class="category-table">
        <el-table
            :data="props.data"
            border
            fit
            stripe
            table-layout="auto"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
        >
            <el-table-column align="center" type="selection"></el-table-column>

            <el-table-column
                :height="300"
                :max-height="400"
                align="center"
                label="分类名"
                prop="categoryName"
                table-layout="auto"
            >
                <template #default="scope">
                    <span v-if="scope.row.categoryName === ''">
                        <el-popover
                            :width="200"
                            content="这个分类并没有名称
                                        请修改或在该分类不存在文章的情况下进行删除"
                            placement="top-start"
                            title="注意"
                            trigger="hover"
                        >
                            <template #reference>
                                <el-button plain type="warning">注意</el-button>
                            </template>
                        </el-popover>
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                label="所在的文章数量"
                prop="articleCount"
            ></el-table-column>

            <el-table-column align="center" label="创建时间" prop="createTime">
                <template #default="scope">
                    <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template #default="scope">
                    <el-popconfirm
                        :icon="InfoFilled"
                        cancel-button-text="取消"
                        confirm-button-text="确认"
                        icon-color="red"
                        title="确认删除这个分类吗?"
                        @confirm="handleConfirmDeleteBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                :icon="Delete"
                                class="delete-btn"
                                round
                                size="small"
                                type="danger"
                            />
                        </template>
                    </el-popconfirm>

                    <el-button
                        :icon="Edit"
                        round
                        size="small"
                        type="success"
                        @click="handleEditCategoriesDialog(scope.row)"
                    />
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="editDialogVisible" destroy-on-close title="编辑分类名" width="400px">
            <el-form ref="editCategoryFormRef" :model="newCategoryData" :rules="editCategoryRules">
                <el-form-item label="新名称" prop="newCategoryNameValue">
                    <el-input
                        v-model="newCategoryData.newCategoryNameValue"
                        :placeholder="inputPlaceholder"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button
                        type="primary"
                        @click="handleEditCategoriesClick(editCategoryFormRef)"
                    >
                        提交修改
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineExpose, defineProps, reactive, ref } from 'vue'
import { Delete, Edit, InfoFilled } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'
import { IRecordList } from '@/store/article/articles/categories/types'
import { useStore } from '@/store'

const props = defineProps<{
    data: IRecordList
    currentPage: number
    currentSize: number
    searchKeywords: string
}>()
const emits = defineEmits(['handleSelect'])

const getCategories = () => {
    store.dispatch('articleCategoriesModule/getCategories', {
        currentPage: props.currentPage,
        currentSize: props.currentSize,
        keywords: props.searchKeywords ? props.searchKeywords : undefined,
    })
}

const store = useStore()

//对话框
const editDialogVisible = ref(false)

//获取表格实例
const editCategoryFormRef = ref<FormInstance>()
//存放编辑输入框中的值
const newCategoryData = reactive({
    newCategoryNameValue: '',
})
//输入框的规则
const editCategoryRules = reactive<FormRules>({
    newCategoryNameValue: [{ required: true, message: '请输入分类名称后再提交', trigger: 'blur' }],
})

const inputPlaceholder = ref('请输入新分类名')
//存放选中的分类名(需要修改的)
const categoryDataSelect = reactive({
    categoryName: '',
    id: 0,
})
//编辑按钮点击事件
const handleEditCategoriesDialog = (categoryData?: any) => {
    inputPlaceholder.value = '请输入新分类名'
    editDialogVisible.value = !editDialogVisible.value
    categoryDataSelect.categoryName = categoryData?.categoryName || null
    categoryDataSelect.id = categoryData?.id || null
    //输入框的值改为要修改的原名称
    // newCategoryNameValue.value = categoryData.categoryName
    inputPlaceholder.value = categoryData?.categoryName || null
}
//对话框提交修改按钮事件触发
const handleEditCategoriesClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            categoryDataSelect.categoryName = newCategoryData.newCategoryNameValue
            store
                .dispatch('articleCategoriesModule/changeCategory', categoryDataSelect)
                .then(() => {
                    getCategories()
                })
            newCategoryData.newCategoryNameValue = ''
            editDialogVisible.value = !editDialogVisible.value
        }
    })
}

//行内删除按钮的点击
const handleConfirmDeleteBtn = (categoryId: number[]) => {
    let saveId = []
    if (categoryId.length > 0) {
        saveId = categoryId
    } else {
        saveId = [categoryId]
    }
    store.dispatch('articleCategoriesModule/deleteCategory', saveId).then(() => {
        getCategories()
    })
}

//多选的点击
const handleSelectionChange = (selection: IRecordList[]) => {
    //存放选中的id
    const selectIdArr: number[] = []
    selection.forEach((category: IRecordList) => {
        selectIdArr.push(category.id)
    })
    emits('handleSelect', selectIdArr)
}
//监听变化

defineExpose({
    handleEditCategoriesDialog,
    handleConfirmDeleteBtn,
})
</script>

<style lang="less" scoped>
.delete-btn {
    margin-left: 13px;
}
</style>
