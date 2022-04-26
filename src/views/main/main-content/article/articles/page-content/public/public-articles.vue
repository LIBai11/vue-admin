<template>
    <div class="public-content">
        <div class="content-header">
            <articles-search
                ref="articlesSearchRef"
                :status="status"
                :currentPage="currentPage"
                :pageSize="pageSize"
            />
            <div class="articles-content">
                <articles-content @handleDelete="handleDelete" />
            </div>
            <div class="content-pagination">
                <articles-pagination
                    @handleWatchCurrent="handleWatchCurrent"
                    @handleWatchSize="handleWatchSize"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArticlesSearch, ArticlesContent, ArticlesPagination } from '@/components'
import { ref } from 'vue'

//拿到头部组件的实例
const articlesSearchRef = ref<InstanceType<typeof ArticlesSearch>>(null)

const status = 1

//当前页码
const currentPage = ref(1)
//一页展示的数据
const pageSize = ref(10)
//监听每页数据的变化
const handleWatchSize = (newSize: number) => {
    pageSize.value = newSize
}
//监听页码改变
const handleWatchCurrent = (newCurrent: number) => {
    currentPage.value = newCurrent
}
//处理表格中的删除事件
const handleDelete = () => {
    articlesSearchRef?.value.asyncQueryArticle()
}
</script>

<style scoped lang="less"></style>
