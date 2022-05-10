<template>
    <div class="photo-header">
        <el-row class="header">
            <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                <div class="images-info">
                    <img :src="props.imagesInfo.albumCover" alt="" />
                    <span class="hidden-xs-only">{{ props.imagesInfo.albumName }}</span>
                    <span class="hidden-xs-only">{{ props.imagesInfo.photoCount }}张</span>
                    <span class="hidden-xs-only">{{ props.imagesInfo.albumDesc }}</span>
                    <el-button class="upload-btn">上传照片</el-button>
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
                    <span>已选择0张</span>
                    <el-button style="margin-right: 12px">移动到</el-button>
                    <el-button>批量删除</el-button>
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

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import 'element-plus/theme-chalk/display.css'
import { IImagesInfoState } from '@/store/images'

const props = defineProps<{
    imagesInfo: IImagesInfoState
}>()

const checkAll = ref(false)
const isIndeterminate = ref(false)
const handleCheckAllChange = () => {
    //
}
</script>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.images-info {
    height: 108px;
    position: relative;
    img {
        width: 150px;
        height: 108px;
        object-fit: scale-down;
    }
    & > span:nth-of-type(1) {
        //position: relative;
        //width: 100px;
        font-size: 25px;
        //bottom: 70px;
    }
    & > span:nth-of-type(2) {
        //position: relative;
        font-size: 16px;
        //bottom: 50px;
        //right: 100px;
    }
    & > span:nth-of-type(3) {
        //position: relative;
        font-size: 8px;
        //bottom: 30px;
        //right: 124px;
    }
    .upload-btn {
        //margin-left: -150px;
        margin-bottom: 30px;
    }
}
.photo-operate {
}
.all-checked {
    margin-right: 15px;
}
</style>
