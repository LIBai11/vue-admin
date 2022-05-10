<template>
    <div id="img-cut">
        <ImgCutter ref="imgCopperRef" @cutDown="cutDown"></ImgCutter>
        <div class="upload-img">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:5000/api/admin/articles/images"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUpload"
                :show-file-list="false"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </div>
    </div>
</template>

<script setup lang="ts">
import ImgCutter from 'vue-img-cutter/src/index.js'

import { ref, defineProps, defineEmits, watch } from 'vue'
import { ElMessage, UploadRawFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const props = defineProps<{
    url?: string
}>()
const emits = defineEmits(['handleUploadImg'])
const imageUrl = ref('')
const imgCopperRef = ref<InstanceType<typeof ImgCutter>>()
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    emits('handleUploadImg', response.data)
}
const cutDown = (file: any) => {
    return file
}
const cutImgDialogVisible = ref(false)
const beforeUpload = (rawFile: UploadRawFile) => {
    console.log(rawFile)
    imgCopperRef?.value.handleOpen(rawFile)
    cutImgDialogVisible.value = true
    return new Promise((resolve, reject) => {
        resolve(rawFile)
    })
}
watch(
    () => props.url,
    () => {
        imageUrl.value = props.url!
    },
    {
        immediate: true,
    }
)
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 108px;
    height: 108px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload {
    width: 100px;
    height: 100px;
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
