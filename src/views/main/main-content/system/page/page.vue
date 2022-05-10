<template>
    <div class="page">
        <kx-card>
            <template #header>
                <div class="page-header">
                    <page-title title="页面管理" />
                </div>
                <el-button color="#2FAB20" @click="addBtn" class="button">新增页面</el-button>
            </template>
            <template #body>
                <div class="page-content">
                    <el-row :gutter="20">
                        <template v-for="page in pageList" :key="page">
                            <el-col
                                :xs="24"
                                :sm="12"
                                :md="12"
                                :lg="6"
                                :xl="6"
                                class="image-content"
                            >
                                <div style="position: relative">
                                    <el-dropdown>
                                        <div class="edit-button">
                                            <el-icon>
                                                <more-filled />
                                            </el-icon>
                                        </div>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="updateBtn(page)">
                                                    编辑
                                                </el-dropdown-item>
                                                <el-dropdown-item @click="deleteBtn(page)">
                                                    删除
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                    <el-image
                                        style="border-radius: 15px"
                                        :src="page.pageCover"
                                        :preview-src-list="[page.pageCover]"
                                        fit="cover"
                                        hide-on-click-modal
                                        class="hover"
                                    >
                                        <template #error>
                                            <div class="image-slot">
                                                <el-icon><icon-picture /></el-icon>
                                            </div>
                                        </template>
                                        <template #placeholder>
                                            <div class="image-placeholder">
                                                加载中
                                                <span class="dot">...</span>
                                            </div>
                                        </template>
                                    </el-image>
                                    <span class="image-name">{{ page.pageName }}</span>
                                </div>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </template>
        </kx-card>
        <el-dialog
            v-model="editDialogVisible"
            width="400px"
            title="编辑页面"
            @closed="handleDialogClosed"
        >
            <el-form :model="editFormData" label-width="70px" label-position="right">
                <el-form-item label="页面名称">
                    <el-input placeholder="请输入页面名称" v-model="editFormData.pageName" />
                </el-form-item>
                <el-form-item label="页面标签">
                    <el-input placeholder="请输入页面标签" v-model="editFormData.pageLabel" />
                </el-form-item>
                <el-form-item label="封面">
                    <upload-img :url="editFormData.pageCover" @handleUploadImg="handleUploadImg" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button color="#DEABB4" @click="editDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="postEditData">提交修改</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { KxCard, PageTitle } from '@/base-ui'
import { useStore } from '@/store'
import { computed, reactive, ref } from 'vue'
import { IPageData } from '@/store/system'
import { Picture as IconPicture, MoreFilled } from '@element-plus/icons-vue'
import UploadImg from './upload-img.vue'

const store = useStore()
const getPageList = () => {
    store.dispatch('pageModule/getPageList')
}
getPageList()
const pageList = computed<IPageData[]>(() => store.state.pageModule.data)

const editDialogVisible = ref(false)
const editFormData = reactive<IPageData>({
    id: 0,
    pageName: '',
    pageCover: '',
    pageLabel: '',
})
/**
 * 编辑按钮
 * @param page
 */
const updateBtn = (page: IPageData) => {
    editFormData.id = page.id
    editFormData.pageLabel = page.pageLabel
    editFormData.pageCover = page.pageCover
    editFormData.pageName = page.pageName
    editDialogVisible.value = true
}
/**
 * 删除按钮
 * @param page
 */
const deleteBtn = (page: IPageData) => {
    store.dispatch('pageModule/deletePage', page.id).then(() => {
        getPageList()
    })
}
/**
 * 新增按钮
 */
const addBtn = () => {
    editDialogVisible.value = true
}

/**
 * 发送更新数据
 */
const postEditData = () => {
    store.dispatch('pageModule/updatePage', editFormData).then(() => {
        getPageList()
        editDialogVisible.value = false
    })
}
/**
 * 上传图片
 */
const handleUploadImg = (imgUrl: string) => {
    editFormData.pageCover = imgUrl
}
/**
 * dialog关闭事件
 */
const handleDialogClosed = () => {
    editFormData.id = 0
    editFormData.pageLabel = ''
    editFormData.pageCover = ''
    editFormData.pageName = ''
}
</script>

<style lang="less" scoped>
.image-content {
    display: flex;
    align-items: center;
}
.image-name {
    display: flex;
    justify-content: center;
}
.image-placeholder {
    width: 200px;
    height: 150px;
    background-color: #403c2a;
}
.button {
    color: #000000;
}
.hovers:hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999;
    box-shadow: 15px 25px 25px #999;
    -webkit-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
}
:deep(.el-dropdown) {
    float: right;
    top: 35px;
    right: 20px;
    z-index: 2;
    font-size: x-large;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
}
</style>
