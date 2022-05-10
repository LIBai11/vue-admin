<template>
    <div class="images">
        <kx-card>
            <template #header>
                <page-title title="相册管理">
                    <template #header></template>
                </page-title>
                <div class="images-header">
                    <el-row>
                        <el-col
                            :xs="24"
                            :sm="12"
                            :md="12"
                            :xl="12"
                            :lg="12"
                            style="margin-bottom: 15px"
                        >
                            <el-button :icon="Plus" color="#2FAB20" @click="newImagesBtn">
                                新建相册
                            </el-button>
                        </el-col>
                        <el-col
                            :xs="24"
                            :sm="12"
                            :md="12"
                            :xl="12"
                            :lg="12"
                            style="display: flex; justify-content: space-between"
                        >
                            <div>
                                <el-input
                                    placeholder="请输入相册名"
                                    style="width: 180px; margin-right: 15px"
                                />
                                <el-button type="primary" :icon="Search">搜索</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </template>
            <template #body>
                <div class="images-content">
                    <el-row :gutter="20">
                        <template v-for="images in imagesList" :key="images">
                            <el-col
                                v-if="imagesList.length !== 0"
                                :xs="24"
                                :sm="12"
                                :md="12"
                                :lg="6"
                                :xl="6"
                                class="image-content"
                            >
                                <div style="position: relative">
                                    <el-dropdown>
                                        <div>
                                            <el-icon>
                                                <more-filled />
                                            </el-icon>
                                        </div>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="updateBtn(images)">
                                                    编辑
                                                </el-dropdown-item>
                                                <el-dropdown-item @click="deleteBtn(images)">
                                                    删除
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                    <div class="photo-count">照片数量:{{ images.photoCount }}</div>
                                    <div class="images-mask">
                                        <el-image
                                            class="hover"
                                            style=""
                                            :src="images.albumCover"
                                            fit="cover"
                                            hide-on-click-modal
                                            @click.stop="photoBtn(images.id)"
                                        >
                                            <template #error>
                                                <div class="image-slot">
                                                    <el-icon><icon-picture /></el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                    </div>
                                    <span class="image-name">{{ images.albumName }}</span>
                                </div>
                            </el-col>
                            <el-empty description="description" v-else></el-empty>
                        </template>
                    </el-row>
                    <kx-pagination
                        :counts="count"
                        @handleWatchCurrent="handleWatchCurrent"
                        @handleWatchSize="handleWatchSize"
                    />
                </div>
            </template>
        </kx-card>
        <!--新增-->
        <el-dialog
            v-model="editDialogVisible"
            width="400px"
            title="编辑页面"
            @closed="handleDialogClosed"
        >
            <el-form :model="editImagesForm" label-width="70px" label-position="right">
                <el-form-item label="相册名称">
                    <el-input placeholder="请输入页面名称" v-model="editImagesForm.albumName" />
                </el-form-item>
                <el-form-item label="相册描述">
                    <el-input placeholder="请输入页面标签" v-model="editImagesForm.albumDesc" />
                </el-form-item>
                <el-form-item label="相册封面">
                    <upload-img
                        :url="editImagesForm.albumCover"
                        @handleUploadImg="handleUploadImg"
                    />
                </el-form-item>
                <el-form-item label="相册状态">
                    <el-checkbox-group v-model="editImagesForm">
                        <el-radio-group v-model="editImagesForm.status" size="small">
                            <el-radio-button label="1">公开</el-radio-button>
                            <el-radio-button label="0">私密</el-radio-button>
                        </el-radio-group>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button color="#DEABB4" @click="editDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="postEditImages">提交修改</el-button>
            </template>
        </el-dialog>
        <!--删除-->
        <el-dialog v-model="deleteDialogVisible" title="确认删除?" width="200px">
            <div style="display: flex; justify-content: flex-end">
                <el-button color="#DEABB4" @click="deleteDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="handleDelete">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Plus, Delete, Search, MoreFilled, Picture as IconPicture } from '@element-plus/icons-vue'
import { KxCard, PageTitle } from '@/base-ui'
import { KxPagination } from '@/components'
import { useStore } from '@/store'
import { IImagesRecordList, IQueryImagesParams } from '@/store/images'
import UploadImg from '../../system/page/upload-img.vue'
import router from '@/router'

const store = useStore()

/**
 * 获取数据
 */
const queryImagesParams: IQueryImagesParams = {
    currentSize: 10,
    currentPage: 1,
    keywords: null,
}
const getImagesList = (payload: IQueryImagesParams) => {
    store.dispatch('imagesModule/getImagesList', payload)
}
onMounted(() => {
    getImagesList(queryImagesParams)
})
const imagesList = computed<IImagesRecordList[]>(() => store.state.imagesModule.recordList)
const count = computed<number>(() => store.state.imagesModule.count)

/**
 * 分页操作
 */
const handleWatchSize = (currentSize: number) => {
    queryImagesParams.currentSize = currentSize
    getImagesList(queryImagesParams)
}
const handleWatchCurrent = (currentPage: number) => {
    queryImagesParams.currentPage = currentPage
    getImagesList(queryImagesParams)
}

/**
 * 编辑/新增
 */
const editDialogVisible = ref(false)
const editImagesForm = reactive<IImagesRecordList>({
    id: 0,
    albumName: '',
    albumCover: '',
    albumDesc: '',
    photoCount: 0,
    status: 1,
})
//编辑对话框
const updateBtn = (images: IImagesRecordList) => {
    editImagesForm.id = images.id
    editImagesForm.albumName = images.albumName
    editImagesForm.albumCover = images.albumCover
    editImagesForm.albumDesc = images.albumDesc
    editImagesForm.photoCount = images.photoCount
    editImagesForm.status = images.status
    editDialogVisible.value = true
}
//新增对话框
const newImagesBtn = () => {
    editDialogVisible.value = true
}
//关闭
const handleDialogClosed = () => {
    editImagesForm.id = 0
    editImagesForm.albumName = ''
    editImagesForm.albumCover = ''
    editImagesForm.albumDesc = ''
    editImagesForm.photoCount = 0
    editImagesForm.status = 0
}
//图片上传
const handleUploadImg = (imgUrl: string) => {
    editImagesForm.albumCover = imgUrl
}
//提交
const postEditImages = () => {
    if (editImagesForm.id === 0) {
        store
            .dispatch('imagesModule/updateImages', {
                albumName: editImagesForm.albumName,
                albumCover: editImagesForm.albumCover,
                albumDesc: editImagesForm.albumDesc,
                status: editImagesForm.status,
            })
            .then(() => {
                handleDialogClosed()
                getImagesList(queryImagesParams)
                editDialogVisible.value = false
            })
    } else {
        store.dispatch('imagesModule/updateImages', editImagesForm).then(() => {
            handleDialogClosed()
            getImagesList(queryImagesParams)
            editDialogVisible.value = false
        })
    }
}
/**
 * 删除
 */
const deleteDialogVisible = ref(false)
const deleteId = ref<number>()
const deleteBtn = (images: IImagesRecordList) => {
    deleteId.value = images.id
    deleteDialogVisible.value = true
}
const handleDelete = () => {
    store.dispatch('imagesModule/deleteImages', deleteId.value).then(() => {
        getImagesList(queryImagesParams)
        deleteDialogVisible.value = false
    })
}
/**
 * 相册详情页
 */

const photoBtn = (id: number) => {
    router.push({
        path: '/images/photo',
        query: {
            id: id,
        },
    })
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 768px) {
    font-size: 8px;
}
@media screen and (min-width: 992px) {
    font-size: 20px;
}
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
.hover:hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999;
    box-shadow: 15px 25px 25px #999;
    -webkit-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
}

.hover {
    border-radius: 15px;
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
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}
.images-mask {
    opacity: 0.5;
    cursor: pointer;
}
.photo-count {
    position: absolute;
    bottom: 45px;
    left: 15px;
    z-index: 2;
    font-size: large;
    font-family: 幼圆, serif;
    color: #000000;
}
</style>
