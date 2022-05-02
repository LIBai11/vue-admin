<template>
    <div class="draft">
        <div class="content-header">
            <articles-search
                ref="articlesSearchRef"
                :currentPage="currentPage"
                :pageSize="pageSize"
                :status="status"
            />
        </div>
        <div class="articles-content">
            <articles-content @handleDelete="handleDelete" />
        </div>
        <div class="content-pagination">
            <kx-pagination
                :counts="articleCounts"
                @handleWatchCurrent="handleWatchCurrent"
                @handleWatchSize="handleWatchSize"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ArticlesContent, ArticlesSearch, KxPagination } from '@/components'
import { useStore } from '@/store'

const store = useStore()
//获取文章数量
const articleCounts = computed<number>(() => store.state.searchArticlesModule.count)
//拿到头部组件的实例
const articlesSearchRef = ref<InstanceType<typeof ArticlesSearch>>(null)

const status = 3

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

<style lang="less" scoped></style>
