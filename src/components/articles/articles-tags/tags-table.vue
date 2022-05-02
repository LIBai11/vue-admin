<template>
    <div class="tags-table">
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
                label="标签名"
                prop="tagName"
                table-layout="auto"
            >
                <template #default="scope">
                    <span v-if="scope.row.tagName === ''">
                        <el-popover
                            :width="200"
                            content="这个标签并没有名称
                                        请修改或在该标签不存在文章的情况下进行删除"
                            placement="top-start"
                            title="注意"
                            trigger="hover"
                        >
                            <template #reference>
                                <el-button plain type="warning">注意</el-button>
                            </template>
                        </el-popover>
                    </span>
                    <span v-else>
                        <el-tag>{{ scope.row.tagName }}</el-tag>
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
                        title="确认删除这篇标签吗?"
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
                        @click="handleEditTagDialog(scope.row)"
                    />
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="editDialogVisible" destroy-on-close title="编辑标签名" width="400px">
            <el-form ref="editTagFormRef" :model="newTagData" :rules="editTagRules">
                <el-form-item label="新名称" prop="newTagNameValue">
                    <el-input
                        v-model="newTagData.newTagNameValue"
                        :placeholder="inputPlaceholder"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditTagClick(editTagFormRef)">
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
import { ITagsRecordList } from '@/store/article/articles/tags/types'
import { useStore } from '@/store'

const props = defineProps<{
    data: ITagsRecordList
    currentPage: number
    currentSize: number
    searchKeywords: string
}>()
const emits = defineEmits(['handleSelect'])

const getTags = () => {
    store.dispatch('articleTagsModule/getTags', {
        currentPage: props.currentPage,
        currentSize: props.currentSize,
        keywords: props.searchKeywords ? props.searchKeywords : undefined,
    })
}

const store = useStore()

//对话框
const editDialogVisible = ref(false)

//获取表格实例
const editTagFormRef = ref<FormInstance>()
//存放编辑输入框中的值
const newTagData = reactive({
    newTagNameValue: '',
})
//输入框的规则
const editTagRules = reactive<FormRules>({
    newTagNameValue: [{ required: true, message: '请输入标签名称后再提交', trigger: 'blur' }],
})

const inputPlaceholder = ref('请输入新标签名')
//存放选中的分类名(需要修改的)
const tagDataSelect = reactive({
    tagName: '',
    id: 0,
})
//编辑按钮点击事件
const handleEditTagDialog = (tagData?: any) => {
    inputPlaceholder.value = '请输入新标签名'
    editDialogVisible.value = !editDialogVisible.value
    tagDataSelect.tagName = tagData?.tagName || null
    tagDataSelect.id = tagData?.id || null
    //输入框的值改为要修改的原名称
    inputPlaceholder.value = tagData?.tagName || '请输入新标签名'
}
//对话框提交修改按钮事件触发
const handleEditTagClick = async (formEl: FormInstance | undefined) => {
    console.log(formEl)
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            tagDataSelect.tagName = newTagData.newTagNameValue
            store.dispatch('articleTagsModule/changeTag', tagDataSelect).then(() => {
                getTags()
            })
            newTagData.newTagNameValue = ''
            editDialogVisible.value = !editDialogVisible.value
        }
    })
}

//行内删除按钮的点击
const handleConfirmDeleteBtn = (tagId: number[]) => {
    let saveId: any[]
    if (tagId.length > 0) {
        saveId = tagId
    } else {
        saveId = [tagId]
    }
    store.dispatch('articleTagsModule/deleteTags', saveId).then(() => {
        getTags()
    })
}

//多选的点击
const handleSelectionChange = (selection: ITagsRecordList[]) => {
    //存放选中的id
    const selectIdArr: number[] = []
    selection.forEach((tag: ITagsRecordList) => {
        selectIdArr.push(tag.id)
    })
    emits('handleSelect', selectIdArr)
}
//监听变化

defineExpose({
    handleEditTagDialog,
    handleConfirmDeleteBtn,
})
</script>

<style lang="less" scoped>
.delete-btn {
    margin-left: 13px;
}
</style>
