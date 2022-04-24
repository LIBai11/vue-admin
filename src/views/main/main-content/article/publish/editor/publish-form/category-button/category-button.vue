<template>
    <div class="category-btn">
        <el-popover
            placement="right"
            :width="400"
            trigger="click"
            title="请选择文章分类名称"
            :disabled="isPopActive"
            transition="el-zoom-in-top"
        >
            <template #reference>
                <n-button strong secondary round type="info" v-if="categoryNameIn === ''">
                    <template #icon>
                        <n-icon><duplicate /></n-icon>
                    </template>
                    添加分类
                </n-button>

                <el-tag
                    v-else
                    :key="categoryIdIn"
                    @close="handleCloseTag"
                    closable
                    size="large"
                    effect="light"
                    disable-transitions
                    round
                    hit
                >
                    {{ categoryNameIn }}
                </el-tag>
            </template>
            <el-row>
                <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                    <category-form
                        :categoryData="props.categoryData"
                        @handleClickSelect="handleCateChange"
                    />
                </el-col>
            </el-row>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'
import { Duplicate } from '@vicons/ionicons5'
import CategoryForm from './category-form.vue'
import { ICategoryState } from '@/store/article/publish/search/types'

//接收父组件的数据
const props = defineProps<{
    categoryData: ICategoryState[]
}>()
//向父组件传值
const emits = defineEmits(['pushCategoryData'])
//popover是否可用
const isPopActive = ref(false)

//已添加的category的name和id
const categoryNameIn = ref<string | undefined>('')
const categoryIdIn = ref<number | undefined>(0)

//通过emit改变btn
const handleCateChange = (hasCategory: ICategoryState) => {
    categoryNameIn.value = hasCategory.categoryName
    categoryIdIn.value = hasCategory.id
    const categoryData = {
        id: categoryIdIn.value,
        categoryName: categoryNameIn.value,
    }
    emits('pushCategoryData', categoryData)
    isPopActive.value = true
}

//按钮点击事件
// const handleTagsBtn = () => {
//     console.log(123)
// }

const handleCloseTag = () => {
    categoryNameIn.value = ''
    categoryIdIn.value = 0
    emits('pushCategoryData', {})
    isPopActive.value = false
}
</script>

<style scoped lang="less"></style>
