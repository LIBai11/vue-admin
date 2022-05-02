<template>
    <div class="category-btn">
        <el-popover
            :disabled="isPopActive"
            :width="400"
            placement="right"
            title="请选择文章分类名称"
            transition="el-zoom-in-top"
            trigger="click"
        >
            <template #reference>
                <n-button v-if="categoryNameIn === ''" round secondary strong type="info">
                    <template #icon>
                        <n-icon>
                            <duplicate />
                        </n-icon>
                    </template>
                    添加分类
                </n-button>

                <el-tag
                    v-else
                    :key="categoryIdIn"
                    closable
                    disable-transitions
                    effect="light"
                    hit
                    round
                    size="large"
                    @close="handleCloseTag"
                >
                    {{ categoryNameIn }}
                </el-tag>
            </template>
            <el-row>
                <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="12">
                    <category-form
                        :categoryData="props.categoryData"
                        @handleClickSelect="handleCateChange"
                    />
                </el-col>
            </el-row>
        </el-popover>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import { Duplicate } from '@vicons/ionicons5'
import CategoryForm from './category-form.vue'
import { ICategoryState } from '@/store/article/publish/search/types'
import { useStore } from '@/store'

const store = useStore()
//接收父组件的数据
const props = defineProps<{
    categoryData: ICategoryState[]
}>()
//向父组件传值
const emits = defineEmits(['pushCategoryData'])
//popover是否可用
const isPopActive = ref(false)

//已添加的category的name和id
const categoryNameIn = ref<string | undefined>(store.state.editArticleModule.categoryName)
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

<style lang="less" scoped></style>
