<template>
    <div class="link">
        <kx-card>
            <template #header>
                <page-title title="友链管理"></page-title>
            </template>
            <template #body>
                <div class="link-content">
                    <div class="link-header">
                        <message-header
                            inputPlaceholder="请输入友链名称"
                            passBtnPlaceholder="新增"
                            :options="false"
                            @handleBatchDelete="handleBatchDelete"
                            @handleBatchPass="handleAddBtn"
                            @handleSearchBtn="handleSearchBtn"
                        />
                    </div>
                    <div class="link-table">
                        <link-content
                            :table-value="linkList"
                            @handleDeleteLink="handleDeleteLink"
                            @handleSelectionChange="handleSelectionChange"
                            @handleEditBtn="handleEdit"
                        />
                    </div>
                    <div class="link-pagination">
                        <kx-pagination
                            :counts="counts"
                            @handleWatchCurrent="handleWatchCurrent"
                            @handleWatchSize="handleWatchSize"
                        />
                    </div>
                </div>
            </template>
        </kx-card>
        <el-dialog
            v-model="editDialogVisible"
            width="350px"
            title="编辑友链"
            @closed="handleDialogClosed"
        >
            <el-form ref="editFormRef" :model="editLinkForm" :rules="editRules">
                <el-form-item label="链接名称" prop="linkName">
                    <el-input v-model="editLinkForm.linkName" placeholder="请输入链接名称" />
                </el-form-item>
                <el-form-item label="链接头像" prop="linkAvatar">
                    <el-input
                        style="margin-bottom: 10px"
                        v-model="editLinkForm.linkAvatar"
                        placeholder="请输入链接头像或点击上传"
                    />
                    <upload-img :url="editLinkForm.linkAvatar" @handleUploadImg="handleUploadImg" />
                </el-form-item>
                <el-form-item label="链接地址" prop="linkAddress">
                    <el-input v-model="editLinkForm.linkAddress" placeholder="请输入链接地址" />
                </el-form-item>
                <el-form-item label="链接简介" prop="linkIntro">
                    <el-input v-model="editLinkForm.linkIntro" placeholder="请输入链接简介" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button color="#DEABB4" @click="editDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="postLinkData(editFormRef)">提交修改</el-button>
            </template>
        </el-dialog>
        <!--确认删除-->
        <el-dialog v-model="deleteDialogVisible" width="200px" title="警告!">
            <span>删除后数据将无法被恢复</span>
            <template #footer>
                <el-button color="#DEABB4" @click="deleteDialogVisible = false">取消</el-button>
                <el-button color="red" @click="confirmPatchDelete">删除</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useStore } from '@/store'
import { ILinkRecordList, IQueryLinkParams } from '@/store/system'
import { UploadImg } from '@/components'
import { KxCard, PageTitle } from '@/base-ui/index'
import { KxPagination, MessageHeader } from '@/components'
import LinkContent from './content/link-content.vue'

const store = useStore()
/**
 * 获取数据
 */
const queryLinkParams: IQueryLinkParams = {
    currentPage: 1,
    currentSize: 10,
    keywords: '',
}
const getLinkData = (payload: IQueryLinkParams) => {
    store.dispatch('linkModule/getLinkData', payload)
}
const linkList = computed<ILinkRecordList[]>(() => store.state.linkModule.recordList)
const counts = computed<number>(() => store.state.linkModule.count)

getLinkData(queryLinkParams)
/**
 * 分页/搜索操作
 */
const handleWatchCurrent = (currentPage: number) => {
    queryLinkParams.currentPage = currentPage
    getLinkData(queryLinkParams)
}
const handleWatchSize = (currentSize: number) => {
    queryLinkParams.currentSize = currentSize
    getLinkData(queryLinkParams)
}
const handleSearchBtn = (searchValue: any) => {
    queryLinkParams.keywords = searchValue.keywords
    getLinkData(queryLinkParams)
}
/**
 * 新增/编辑操作
 */
const editFormRef = ref<FormInstance>()
const editDialogVisible = ref(false)
const editLinkForm = reactive<ILinkRecordList>({
    createTime: '',
    id: 0,
    linkAddress: '',
    linkAvatar: '',
    linkIntro: '',
    linkName: '',
})
const editRules = reactive<FormRules>({
    linkName: [{ required: true, message: '请输入链接名称', trigger: 'blur' }],
    linkAvatar: [{ required: true, message: '请输入链接头像地址', trigger: 'blur' }],
    linkIntro: [{ required: true, message: '请输入链接简介', trigger: 'blur' }],
    linkAddress: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
})
const handleAddBtn = () => {
    editDialogVisible.value = true
}
const handleEdit = (link: ILinkRecordList) => {
    console.log(link)
    editLinkForm.linkAddress = link.linkAddress
    editLinkForm.id = link.id
    editLinkForm.linkAvatar = link.linkAvatar
    editLinkForm.linkName = link.linkName
    editLinkForm.linkIntro = link.linkIntro
    editDialogVisible.value = true
}
const handleDialogClosed = () => {
    editLinkForm.linkAddress = ''
    editLinkForm.id = 0
    editLinkForm.linkAvatar = ''
    editLinkForm.linkName = ''
    editLinkForm.linkIntro = ''
}
//图片上传
const handleUploadImg = (imgUrl: string) => {
    editLinkForm.linkAvatar = imgUrl
}
//提交
const postLinkData = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            store
                .dispatch('linkModule/updateLink', editLinkForm)
                .then(() => {
                    handleDialogClosed()
                    getLinkData(queryLinkParams)
                    editDialogVisible.value = false
                })
                .catch(() => {
                    deleteDialogVisible.value = false
                })
        }
    })
}
/**
 * 删除操作
 */
const selectArr = ref<number[]>([])
const deleteDialogVisible = ref(false)
const handleDeleteLink = (linkId: number) => {
    store.dispatch('linkModule/deleteLink', [linkId]).then(() => {
        getLinkData(queryLinkParams)
    })
}
const handleSelectionChange = (linkIdArr: ILinkRecordList[]) => {
    selectArr.value = []
    linkIdArr.forEach((link) => {
        selectArr.value.push(link.id)
    })
}
const handleBatchDelete = () => {
    if (selectArr.value.length > 0) deleteDialogVisible.value = true
    else ElMessage.warning('请选择需要删除的友链!')
}
const confirmPatchDelete = () => {
    store
        .dispatch('linkModule/deleteLink', selectArr.value)
        .then(() => {
            getLinkData(queryLinkParams)
            deleteDialogVisible.value = false
        })
        .catch(() => {
            deleteDialogVisible.value = false
        })
}
</script>

<style lang="less" scoped></style>
