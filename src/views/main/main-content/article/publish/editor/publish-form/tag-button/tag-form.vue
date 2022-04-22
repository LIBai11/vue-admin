<template>
    <div class="tag-form">
        <el-form :model="tagForm" @submit.prevent="subTag">
            <el-form-item>
                <el-autocomplete
                    size="large"
                    v-model="tagForm.tagName"
                    placeholder="键入以搜索或新建"
                    @select="handleQuerySelect"
                    :fetch-suggestions="queryTags"
                    value-key="tagName"
                />
            </el-form-item>
            <el-form-item>
                <el-card class="box-card" v-if="hasAddTags.length !== 0">
                    <div>
                        <el-tag
                            v-for="tag in hasAddTags"
                            :key="tag"
                            class="tag-preview"
                            @close="handleCloseTag(tag)"
                            closable
                        >
                            {{ tag.tagName }}
                        </el-tag>
                    </div>
                </el-card>
            </el-form-item>
            <el-form-item>
                <el-table
                    ref="tagTableRef"
                    :data="props.tagData"
                    highlight-current-row
                    :show-header="isShowTableHeader"
                    @current-change="handleCurrentChange"
                    fit
                >
                    <el-table-column property="tagName" align="center" />
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { ElTable } from 'element-plus'
import { ITagState } from '@/store/publish/search/types'
import { searchTags } from '@/service/tags'
import { ElNotification } from 'element-plus'

//获取父组件信息
const props = defineProps<{
    tagData: ITagState[]
}>()

//拿到table实例
const tagTableRef = ref<InstanceType<typeof ElTable>>()

//向父组件通知
const emits = defineEmits(['handleClickSelect'])

//新建一个对象来存放添加的tag
const hasAddTags = ref<ITagState[]>([])
//表单内容
const tagForm = ref({
    tagName: '',
})

//是否显示表头
const isShowTableHeader = ref(false)

//存放输入建议返回的结果
const queryResult = ref<any[]>([])

//搜索tags
async function queryTagsAsync(keywords: any) {
    const res = await searchTags(keywords)
    if (res.code === 20000) {
        queryResult.value = res.data
    } else {
        ElNotification({
            title: 'Error',
            message: '标签信息获取失败!请检查网络或重试',
            type: 'error',
        })
    }
}

//调用补全建议
const queryTags = (queryString: any, cb: (args: any) => void) => {
    queryTagsAsync(queryString)
    let _queryResult = queryResult.value
    let results = queryString ? _queryResult.filter(createFilter(queryString)) : _queryResult
    // 调用 callback 返回建议列表的数据

    cb(results)
}
// 从数据列表里面查找字符进行匹配
const createFilter = (queryString: string) => {
    return (res: ITagState) => {
        return res.tagName?.indexOf(queryString) !== -1
    }
}

//选择搜索结果
const handleQuerySelect = (item: any) => {
    handleCurrentChange(item)
}

//input回车事件
const subTag = () => {
    const newTag: ITagState = {
        id: Math.floor(Math.random() * 10),
        tagName: tagForm.value.tagName,
    }
    handleCurrentChange(newTag)
}
//表格的行点击事件
const handleCurrentChange = (currentRow: ITagState) => {
    const tagSet = new Set(hasAddTags.value)
    const setSize = tagSet.size
    tagSet.add(currentRow)
    if (setSize !== tagSet.size) {
        if (hasAddTags.value.length < 3 && currentRow) {
            hasAddTags.value.push(currentRow)
            emits('handleClickSelect', hasAddTags.value)
            tagTableRef.value!.setCurrentRow(null)
        }
    }
}
//移除标签
const handleCloseTag = (tag: ITagState) => {
    const removeTagIndex = hasAddTags.value.indexOf(tag)
    hasAddTags.value.splice(removeTagIndex, 1)
}
</script>

<style scoped lang="less">
.tag-preview {
    margin-right: 15px;
}
</style>
