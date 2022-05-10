<template>
    <div class="recovery">
        <kx-card>
            <template #header>
                <page-title title="照片回收站" />
                <el-row class="recover-header">
                    <el-col>
                        <div class="photo-operate">
                            <el-checkbox
                                class="all-checked"
                                v-model="checkAll"
                                :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange"
                            >
                                全选
                            </el-checkbox>
                            <div>已选择{{ imgChecked?.length }}张</div>

                            <el-button
                                class="remove-btn"
                                color="#F0B3C5"
                                @click="recoveryDialogVisible = true"
                            >
                                批量恢复
                            </el-button>
                            <el-button
                                class="delete-btn"
                                type="danger"
                                @click="deleteDraftDialogVisible = true"
                            >
                                批量删除
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </template>
            <template #body>
                <el-empty description="请指定相册" v-if="!queryId" />
                <el-empty description="该相册未删除照片" v-if="count === 0" />
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
                            <el-tooltip placement="top" effect="light">
                                <template #content>
                                    名称:{{ photo.photoName }}
                                    <br />
                                    描述:{{ photo.photoDesc }}
                                </template>
                                <div class="checkDiv">
                                    <el-checkbox class="checkBox" :label="photo.id">
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

        <!--恢复-->
        <el-dialog v-model="recoveryDialogVisible" width="250px" title="确认删除?">
            <div>确认恢复所选照片吗</div>
            <template #footer>
                <el-button color="#DEABB4" @click="recoveryDialogVisible = false">取消</el-button>
                <el-button color="#2FAB20" @click="batchRecovery">确认恢复</el-button>
            </template>
        </el-dialog>
        <!--永久删除-->
        <el-dialog v-model="deleteDraftDialogVisible" width="250px" title="确认删除?">
            <div>确认删除所选照片吗,这将无法恢复!</div>
            <template #footer>
                <el-button color="#DEABB4" @click="deleteDraftDialogVisible = false">
                    取消
                </el-button>
                <el-button color="#2FAB20" @click="batchDeleteDraft">确认删除</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { KxCard, PageTitle } from '@/base-ui'
import { KxPagination } from '@/components'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { Plus, MoreFilled, Delete } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, UploadFile, UploadProps, UploadUserFile } from 'element-plus'
import { IImagesRecordList, IPhotoRecordList, IQueryPhotoParams } from '@/store/images'

/**
 * 获取数据
 */
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
    isDelete: 1,
}

const getPhoto = (queryPhotoParams: IQueryPhotoParams) => {
    store.dispatch('photoModule/getImagesPhoto', queryPhotoParams)
}
onMounted(() => {
    getPhoto(queryPhotoParams)
})
//获取照片数据
const photoList = computed<IPhotoRecordList[]>(() => store.state.photoModule.recordList)
const count = computed<number>(() => store.state.photoModule.count)

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

/**
 * 恢复
 */
const recoveryDialogVisible = ref(false)
const batchRecovery = () => {
    if (imgChecked.value.length === 0) ElMessage.warning('请选择照片后再操作')
    else
        store
            .dispatch('photoModule/deletePhoto', {
                idList: imgChecked.value,
                isDelete: 0,
            })
            .then(() => {
                recoveryDialogVisible.value = false
                getPhoto(queryPhotoParams)
            })
}
/**
 * 删除
 */
const deleteDraftDialogVisible = ref(false)
const batchDeleteDraft = () => {
    if (imgChecked.value.length === 0) ElMessage.warning('请选择照片后再操作')
    else {
        store.dispatch('photoModule/deleteDraftPhotos', imgChecked.value).then(() => {
            deleteDraftDialogVisible.value = false
            getPhoto(queryPhotoParams)
        })
    }
}
</script>

<style lang="less" scoped>
.recover-header {
    display: flex;
    justify-content: center;
}
.photo-operate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    align-content: start;
}
</style>
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

.all-checked {
    margin-right: 15px;
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
