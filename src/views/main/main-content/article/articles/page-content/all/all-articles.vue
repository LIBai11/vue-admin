<template>
    <div class="all-articles">
        <div class="content-header">
            <el-form>
                <el-form-item>
                    <el-row :gutter="15">
                        <el-col :xs="0" :sm="6" :md="4" :lg="3" :xl="4">
                            <el-button type="danger" :icon="Delete" round>批量删除</el-button>
                        </el-col>
                        <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                            <el-form-item>
                                <el-select v-model="typeId" clearable placeholder="请选择文章类型">
                                    <el-option
                                        v-for="type in typeOptions"
                                        :key="type.name"
                                        :label="type.name"
                                        :value="type.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                            <el-form-item>
                                <el-select v-model="categoryId" clearable placeholder="请选择分类">
                                    <el-option
                                        v-for="category in categoryList"
                                        :key="category.categoryName"
                                        :label="category.categoryName"
                                        :value="category.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                            <el-form-item>
                                <el-select v-model="tagId" clearable placeholder="请选择标签">
                                    <el-option
                                        v-for="tag in tagsList"
                                        :key="tag.tagName"
                                        :label="tag.tagName"
                                        :value="tag.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                            <el-form-item>
                                <el-input
                                    placeholder="请输入文章名"
                                    style="width: 200px"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="0" :sm="6" :md="4" :lg="3" :xl="4">
                            <el-button type="success" :icon="Search" round>搜索</el-button>
                        </el-col>
                        <el-col :xs="6" :sm="0" :md="0" :lg="0" :xl="0">
                            <el-button type="danger" :icon="Delete" round />
                        </el-col>
                        <el-col :xs="6" :sm="0" :md="0" :lg="0" :xl="0">
                            <el-button type="success" :icon="Search" round />
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useStore } from '@/store'
import { Delete, Search } from '@element-plus/icons-vue'
import { ICategoryState, ITagState } from '@/store/publish/search/types'

const store = useStore()
store.dispatch('publishSearchModule/getPublishSearch')

//标签列表
const tagId = ref()
const tagsList = computed<ITagState>(() => {
    return store.state.publishSearchModule.tags
})

//分类列表
const categoryId = ref()
const categoryList = computed<ICategoryState>(() => {
    return store.state.publishSearchModule.categories
})

//文章类型列表
const typeId = ref()
const typeOptions = [
    {
        name: '原创',
        key: 1,
    },
    {
        name: '转载',
        key: 2,
    },
    {
        name: '翻译',
        key: 3,
    },
]
watchEffect(() => {
    // console.log(tagsList.value)
    // console.log(categoryList.value)
})
</script>

<style scoped lang="less">
:deep(.el-icon) {
    margin-left: 1px;
}
:deep(.el-col) {
    margin-top: 15px;
    margin-right: 10px;
}
</style>
