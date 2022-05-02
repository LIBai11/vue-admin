<template>
    <div class="category-form">
        <el-form :model="cateForm" @submit.prevent="subCategory">
            <el-form-item>
                <el-autocomplete
                    v-model="cateForm.categoryName"
                    :fetch-suggestions="queryCategories"
                    placeholder="键入以搜索或新建"
                    size="large"
                    value-key="categoryName"
                    @select="handleQuerySelect"
                />
            </el-form-item>
            <el-form-item>
                <el-table
                    ref="categoryTableRef"
                    :data="props.categoryData"
                    :show-header="isShowTableHeader"
                    class="category-data-table"
                    fit
                    highlight-current-row
                    @current-change="handleCurrentChange"
                >
                    <el-table-column align="center" property="categoryName" />
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watchEffect } from 'vue'
import { ICategoryState } from '@/store/article/publish/search/types'
import { ElNotification, ElTable } from 'element-plus'
import { searchCategories } from '@/service/category'

//获取父组件信息
const props = defineProps<{
    categoryData: ICategoryState[]
}>()

//拿到table实例
const categoryTableRef = ref<InstanceType<typeof ElTable>>()

//向父组件通知
const emits = defineEmits(['handleClickSelect'])
watchEffect(() => {
    // console.log(props.categoryData)
})
//表单内容
const cateForm = ref({
    categoryName: '',
})

//是否显示表头
const isShowTableHeader = ref(false)
//存放输入建议返回的结果
const queryResult = ref<any[]>([])

//搜索categories
async function queryCategoriesAsync(keywords: any) {
    const res = await searchCategories(keywords)
    if (res.code === 20000) {
        queryResult.value = res.data
    } else {
        ElNotification({
            title: 'Error',
            message: '分类信息获取失败!请检查网络或重试',
            type: 'error',
        })
    }
}

//调用补全建议
const queryCategories = (queryString: any, cb: (args: any) => void) => {
    queryCategoriesAsync(queryString)
    let _queryResult = queryResult.value
    let results = queryString ? _queryResult.filter(createFilter(queryString)) : _queryResult
    // 调用 callback 返回建议列表的数据

    cb(results)
}
// 从数据列表里面查找字符进行匹配
const createFilter = (queryString: string) => {
    return (res: ICategoryState) => {
        return res.categoryName?.indexOf(queryString) !== -1
    }
}

//选择搜索结果
const handleQuerySelect = (item: any) => {
    handleCurrentChange(item)
}

//input回车事件
const subCategory = () => {
    const newCategories: ICategoryState = {
        id: Math.floor(Math.random() * 10),
        categoryName: cateForm.value.categoryName,
    }
    handleCurrentChange(newCategories)
}

//表格行点击事件
const handleCurrentChange = (currentRow: any) => {
    if (currentRow) {
        emits('handleClickSelect', currentRow)
    }
    categoryTableRef.value!.setCurrentRow(null)
}
</script>

<style lang="less" scoped>
.category-data-table {
    cursor: pointer;
}
</style>
