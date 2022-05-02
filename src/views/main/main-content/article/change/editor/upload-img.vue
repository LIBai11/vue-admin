<template>
    <div class="upload-img">
        <el-upload
            :auto-upload="true"
            :file-list="fileList"
            :limit="limit"
            :on-error="handleError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            action="http://localhost:5000/api/admin/articles/images"
            list-type="picture-card"
        >
            <el-icon class="icon">
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog
            v-model="dialogVisible"
            :width="imgInfo.width + 'px'"
            append-to-body
            destroy-on-close
            title="预览图片"
        >
            <div class="imgPreviewDiv">
                <img
                    :src="dialogImageUrl"
                    :style="{ width: imgInfo.width + 'px', height: imgInfo.height + 'px' }"
                    alt=""
                />
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, onBeforeMount, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { store } from '@/store'

//向父组件传值
const emits = defineEmits(['pushImgUrl'])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const imgUrl = ref('')
const limit = ref(1)

const fileList = ref<UploadUserFile[]>([
    {
        name: 'default',
        url: store.state.editArticleModule.articleCover,
    },
])

//定义隐藏变量
const isShowUploadBtn = ref('inline')

const imgInfo = reactive({
    width: 0,
    height: 0,
})
const getImgInfo = () => {
    let img = new Image()
    img.src = imgUrl.value
    img.onload = function () {
        imgInfo.width = img.width * 0.3
        imgInfo.height = img.height * 0.3
    }
}

onBeforeMount(() => {
    uploadSuccess()
})
const uploadSuccess = (response?: any) => {
    imgUrl.value = response ? response.data : store.state.editArticleModule.articleCover
    emits('pushImgUrl', imgUrl.value)
    isShowUploadBtn.value = 'none'
}

//图片预览/删除
const handleRemove: UploadProps['onRemove'] = () => {
    isShowUploadBtn.value = 'inline'
    emits('pushImgUrl', '')
}

const handlePictureCardPreview: UploadProps['onPreview'] = () => {
    getImgInfo()
    dialogImageUrl.value = imgUrl.value
    dialogVisible.value = true
}
const handleError = () => {
    ElMessage.error('上传失败!')
}
</script>

<style lang="less" scoped>
.imgPreviewDiv {
    display: flex;
    flex: 1;
    justify-content: center;
}

.icon {
    margin-top: 40%;
    margin-left: 40%;
}

.img {
    width: v-bind('imgInfo.width') px;
    height: v-bind('imgInfo.height') px;
}
</style>
<style lang="less">
.el-upload--picture-card {
    display: v-bind('isShowUploadBtn');
}
</style>
