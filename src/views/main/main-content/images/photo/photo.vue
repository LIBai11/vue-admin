<template>
    <div class="photo">
        <kx-card>
            <template #header>
                <page-title title="照片管理" />
                <div class="photo-header">
                    <el-row class="header">
                        <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                            <div class="images-info">
                                <el-image class="images-avatar" :src="imagesInfo.albumCover" />
                                <div class="content">
                                    <p class="title hidden-xs-only">{{ imagesInfo.albumName }}</p>
                                    <p class="count hidden-xs-only">
                                        {{ imagesInfo.photoCount }}张
                                    </p>
                                    <p class="desc hidden-xs-only">{{ imagesInfo.albumDesc }}</p>
                                    <el-button
                                        class="add-btn hidden-xs-only"
                                        color="#5FBC21"
                                        @click="addBtn"
                                    >
                                        上传照片
                                    </el-button>
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                            <div class="photo-operate">
                                <el-checkbox
                                    class="all-checked"
                                    v-model="checkAll"
                                    :indeterminate="isIndeterminate"
                                    @change="handleCheckAllChange"
                                >
                                    全选
                                </el-checkbox>
                                <span>已选择{{ imgChecked?.length }}张</span>
                                <el-button
                                    class="add-btn hidden-sm-and-up"
                                    color="#5FBC21"
                                    size="small"
                                    @click="addBtn"
                                >
                                    上传照片
                                </el-button>
                                <el-button class="remove-btn" color="#F0B3C5" @click="removeBtn">
                                    移动到
                                </el-button>
                                <el-button
                                    class="delete-btn"
                                    type="danger"
                                    @click="deleteDialogVisible = true"
                                >
                                    批量删除
                                </el-button>
                                <el-link
                                    type="primary"
                                    style="margin-left: 15px; font-size: 9px"
                                    size="small"
                                    :icon="Delete"
                                    @click="toDraftBtn"
                                >
                                    回收站
                                </el-link>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </template>
            <template #body>
                <el-empty description="请指定相册" v-if="!queryId" />
                <el-empty description="该相册无照片" v-if="count === 0" />
                <el-row v-else :gutter="10" justify="start">
                    <el-checkbox-group v-model="imgChecked" @change="imgCheckedBtn">
                        <el-col
                            v-for="photo in photoList"
                            :key="photo"
                            :xs="24"
                            :sm="12"
                            :md="6"
                            :lg="4"
                            :xl="3"
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
                                            <el-dropdown-item @click="updateBtn(photo)">
                                                编辑
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <el-tooltip placement="top" effect="light">
                                <template #content>
                                    名称:{{ photo.photoName }}
                                    <br />
                                    描述:{{ photo.photoDesc }}
                                </template>
                                <div class="checkDiv">
                                    <el-checkbox
                                        class="checkBox"
                                        :label="photo.id"
                                        @change="photoChangeBtn(photo)"
                                    >
                                        <el-image
                                            class="photos"
                                            :src="photo.photoSrc"
                                            fit="cover"
                                            :preview-src-list="[photo.photoSrc]"
                                        />
                                    </el-checkbox>
                                </div>
                            </el-tooltip>
                        </el-col>
                    </el-checkbox-group>
                </el-row>
                <kx-pagination
                    :counts="count"
                    @handleWatchCurrent="handleWatchCurrent"
                    @handleWatchSize="handleWatchSize"
                />
            </template>
        </kx-card>
        <!--编辑-->
        <el-dialog
            v-model="editDialogVisible"
            title="上传照片"
            width="600px"
            destroy-on-close
            @closed="handleClosed"
        >
            <el-upload
                action="http://localhost:5000/api/admin/articles/images"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="uploadSuccess"
                :on-remove="photoRemove"
                :file-list="fileList"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="previewDialogVisible" destroy-on-close>
                <el-image :src="dialogImageUrl" fit preview-src-list />
            </el-dialog>
            <template #footer>
                <el-button color="#DEABB4" @click="editDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="postPhotos">提交上传</el-button>
            </template>
        </el-dialog>
        <!--删除-->
        <el-dialog v-model="deleteDialogVisible" width="250px" title="确认删除?">
            <template #footer>
                <el-button color="#DEABB4" @click="deleteDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="batchDelete">删除</el-button>
            </template>
        </el-dialog>
        <!--移动-->
        <el-dialog v-model="removeDialogVisible" width="450px" title="确认移动?">
            <el-empty description="无其它相册" v-if="allImages.length === 1" />
            <div v-else>
                <el-radio-group
                    v-model="removeImages"
                    style="display: flex; flex-direction: column; justify-content: flex-start"
                >
                    <el-radio
                        :label="images.imagesId"
                        v-for="images in allImagesInfo"
                        :key="images"
                    >
                        <el-image :src="images.imagesCover" style="width: 30%; height: 30%" />
                        {{ images.imagesName }}
                    </el-radio>
                </el-radio-group>
            </div>
            <template #footer>
                <el-button color="#DEABB4" @click="removeDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="confirmRemove">确认移动</el-button>
            </template>
        </el-dialog>

        <!--编辑照片-->
        <el-dialog
            v-model="editPhotoDialogVisible"
            width="300px"
            title="编辑照片信息"
            @closed="editPhotoClosed"
        >
            <el-form
                :model="editPhotoForm"
                ref="editPhotoFormRef"
                :rules="editPhotoRules"
                label-position="left"
            >
                <el-form-item label="照片名称" prop="photoName">
                    <el-input
                        v-model="editPhotoForm.photoName"
                        placeholder="请输入照片名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="照片描述" prop="photoDesc">
                    <el-input
                        v-model="editPhotoForm.photoDesc"
                        placeholder="请输入照片描述"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="info" @click="editPhotoDialogVisible = false">取消</el-button>
                <el-button type="success" @click="postEditPhotoForm(editPhotoFormRef)">
                    提交修改
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import {
    IImagesInfoState,
    IImagesRecordList,
    IPhotoRecordList,
    IQueryPhotoParams,
} from '@/store/images'
import { ElMessage, FormInstance, UploadFile, UploadProps, UploadUserFile } from 'element-plus'
import { Plus, MoreFilled, Delete } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import useState from '@/utils/useState'
import { KxCard, PageTitle } from '@/base-ui'
import { KxPagination } from '@/components'
import router from '@/router'

const store = useStore()
const route = useRoute()
const queryId = route.query.id
/**
 * 获取数据
 */
const queryPhotoParams: IQueryPhotoParams = {
    albumId: Number(queryId),
    currentPage: 1,
    currentSize: 10,
    isDelete: 0,
}

const getPhoto = (queryPhotoParams: IQueryPhotoParams) => {
    store.dispatch('photoModule/getImagesPhoto', queryPhotoParams)
    store.dispatch('photoModule/imagesInfoModule/getImagesInfo', queryId)
}
onMounted(() => {
    getPhoto(queryPhotoParams)
})
//获取照片数据
const photoList = computed<IPhotoRecordList[]>(() => store.state.photoModule.recordList)
const count = computed<number>(() => store.state.photoModule.count)
//获取相册信息
const { photoCount, albumCover, albumDesc, albumName, id, status } = useState({
    photoCount: (state: any) => state.photoModule.imagesInfoModule.photoCount,
    albumCover: (state: any) => state.photoModule.imagesInfoModule.albumCover,
    albumDesc: (state: any) => state.photoModule.imagesInfoModule.albumDesc,
    albumName: (state: any) => state.photoModule.imagesInfoModule.albumName,
    id: (state: any) => state.photoModule.imagesInfoModule.id,
    status: (state: any) => state.photoModule.imagesInfoModule.status,
})

const imagesInfo = computed<IImagesInfoState>(() => ({
    id: id.value,
    albumName: albumName.value,
    albumDesc: albumDesc.value,
    albumCover: albumCover.value,
    photoCount: photoCount.value,
    status: status.value,
}))
/**
 *分页
 */
const handleWatchCurrent = (currentPage: number) => {
    queryPhotoParams.currentPage = currentPage
    getPhoto(queryPhotoParams)
}
const handleWatchSize = (currentSize: number) => {
    queryPhotoParams.currentSize = currentSize
    getPhoto(queryPhotoParams)
}
/**
 * 选中操作
 */
const imgChecked = ref<number[]>([])
const checkAll = ref(false)
const isIndeterminate = ref(false)

const allPhotoId: number[] = []

//全选
const handleCheckAllChange = (val: boolean) => {
    photoList.value.forEach((photo) => {
        allPhotoId.push(photo.id)
    })
    imgChecked.value = val ? allPhotoId : []
    isIndeterminate.value = false
}

//单独选择
const imgCheckedBtn = () => {
    const checkedCount = imgChecked.value.length
    if (checkedCount === allPhotoId.length) {
        checkAll.value = true
        isIndeterminate.value = false
    }
    isIndeterminate.value = checkedCount > 0 && checkedCount < allPhotoId.length
}
//处理数据
const photoUrlList = ref<string[]>([])
const photoChangeBtn = (photo: IPhotoRecordList) => {
    photoUrlList.value.length = 0
    photoList.value.forEach((photo) => {
        return imgChecked.value.forEach((id) => {
            if (photo.id === id) photoUrlList.value.push(photo.photoSrc)
            else return
        })
    })
}
/**
 * 上传照片
 */
const previewDialogVisible = ref(false)
const editDialogVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])
const addBtn = () => {
    editDialogVisible.value = true
}
//预览
const dialogImageUrl = ref('')

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: UploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    previewDialogVisible.value = true
}
//上传成功
const uploadPhotoUrl: string[] = []
const uploadSuccess = (response: any) => {
    uploadPhotoUrl.push(response.data)
}
//移除
const photoRemove = (uploadFile: any) => {
    const removeIndex = uploadPhotoUrl.indexOf(uploadFile.response.data)
    uploadPhotoUrl.splice(removeIndex, 1)
}
//提交请求
const postPhotos = () => {
    store
        .dispatch('photoModule/addPhoto', {
            albumId: imagesInfo.value.id,
            photoUrlList: uploadPhotoUrl,
        })
        .then(() => {
            editDialogVisible.value = false
            getPhoto(queryPhotoParams)
        })
}
//关闭对话框
const handleClosed = () => {
    uploadPhotoUrl.length = 0
    fileList.value.length = 0
}
/**
 * 删除
 */
const deleteDialogVisible = ref(false)
const batchDelete = () => {
    store
        .dispatch('photoModule/deletePhoto', {
            idList: imgChecked.value,
            isDelete: 1,
        })
        .then(() => {
            deleteDialogVisible.value = false
            getPhoto(queryPhotoParams)
        })
}
/**
 * 移动
 */
const removeDialogVisible = ref(false)
const removeImages = ref()
//获取相册信息
const images = () => {
    store.dispatch('imagesModule/getImagesList', {
        currentSize: 100,
        currentPage: 1,
    })
}
interface IAllImagesInfo {
    imagesId: number
    imagesCover: string
    imagesName: string
}

const allImages = computed(() => store.state.imagesModule.recordList)
const allImagesInfo = ref<IAllImagesInfo[]>([])
images()
//移动按钮点击
const removeBtn = () => {
    allImagesInfo.value.length = 0
    allImages.value.forEach((images: IImagesRecordList) => {
        allImagesInfo.value.push({
            imagesId: images.id,
            imagesCover: images.albumCover,
            imagesName: images.albumName,
        })
    })
    if (imgChecked.value.length === 0) ElMessage.warning('请先选择要移动的照片')
    else removeDialogVisible.value = true
}
//确认移动
const confirmRemove = () => {
    store
        .dispatch('photoModule/removePhoto', {
            albumId: removeImages.value,
            photoIdList: imgChecked.value,
            photoUrlList: photoUrlList.value,
        })
        .then(() => {
            removeDialogVisible.value = false
            getPhoto(queryPhotoParams)
        })
}
/**
 * 编辑图片信息
 */
const editPhotoDialogVisible = ref(false)
const editPhotoFormRef = ref<FormInstance>()
const editPhotoForm = reactive({
    id: 0,
    photoName: '',
    photoDesc: '',
    photoSrc: '',
})
//规则
const editPhotoRules = reactive({
    photoName: [{ required: true, message: '请输入照片名称', trigger: 'blur' }],
    photoDesc: [{ required: true, message: '请输入照片描述', trigger: 'blur' }],
})
//模态框
const updateBtn = (photo: IPhotoRecordList) => {
    editPhotoForm.id = photo.id
    editPhotoForm.photoName = photo.photoName
    editPhotoForm.photoDesc = photo.photoDesc
    editPhotoForm.photoSrc = photo.photoSrc
    editPhotoDialogVisible.value = true
}
//关闭
const editPhotoClosed = () => {
    editPhotoForm.id = 0
    editPhotoForm.photoName = ''
    editPhotoForm.photoDesc = ''
    editPhotoForm.photoSrc = ''
}
//提交
const postEditPhotoForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            store.dispatch('photoModule/editPhoto', editPhotoForm).then(() => {
                getPhoto(queryPhotoParams)
                editPhotoDialogVisible.value = false
            })
        }
    })
}

/**
 * 进入回收站
 */
const toDraftBtn = () => {
    router.push({ path: '/images/recovery', query: { id: queryId } })
}
</script>

<style lang="less" scoped>
.checkDiv {
    .checkBox {
        position: relative;
        cursor: pointer;
        height: auto;
        margin-bottom: 15px;
        border: 1px solid #5a5856;
    }

    .photos {
        border-radius: 4px;
    }
}

.header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.images-info {
    min-width: 300px;
    height: 110px;
}

.images-avatar {
    float: left;
    height: 100px;
    width: 150px;
    margin-right: 10px;
    border-radius: 10px;
}

.title {
    margin: 0;
    font-size: 25px;
    font-weight: bold;
}

.count {
    margin: 0;
    font-style: italic;
    font-size: 18px;
}

.desc {
    margin: 0;
    font-size: 10px;
}

.content {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    align-items: baseline;
}
.photo-operate {
    line-height: 32px;
}

.all-checked {
    margin-right: 15px;
}

.delete-btn {
    margin: 0;
}
.remove-btn {
    margin-right: 15px;
}
.add-btn {
    margin-right: 15px !important;
}

:deep(.slide-fade-enter-active) {
    transition: all 0.3s ease;
}

:deep(.slide-fade-leave-active) {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

:deep(.slide-fade-enter, .expand-fade-leave-active) {
    margin-left: 20px;
    opacity: 0;
}
:deep(.el-radio) {
    height: auto;
    margin-right: 0;
    margin-bottom: 5px;
    border: 2px solid #414141;
}
:deep(span.el-radio__label) {
    display: flex;
    flex-direction: column;
    align-items: center;
}
:deep(.el-dropdown) {
    float: right;
    top: 25px;
    right: 20px;
    z-index: 2;

    font-weight: bold;
    color: #fff;
    cursor: pointer;
}
</style>
