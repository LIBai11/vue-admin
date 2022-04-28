<template>
    <div class="article-pagination">
        <el-pagination
            small
            background
            layout="total, sizes, prev, pager, next"
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 15, 20]"
            :total="props.counts"
        />
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps<{
    counts: number
}>()
const total = ref(props.counts)

const emits = defineEmits(['handleWatchCurrent', 'handleWatchSize'])

// const currentPage = ref(props.currentPage)
// const pageSize = ref(props.pageSize)
// const articleCounts = ref(props.articleCount)

const store = useStore()

//获取文章数量
// const articleCounts = computed<number>(() => store.state.searchArticlesModule.count)
//当前页码
const currentPage = ref(1)
//一页展示的数据
const pageSize = ref(10)
//监听每页数据的变化
const handleSizeChange = (newSize: number) => {
    pageSize.value = newSize
    emits('handleWatchSize', newSize)
}
//监听页码改变
const handleCurrentChange = (newCurrent: number) => {
    currentPage.value = newCurrent
    emits('handleWatchCurrent', newCurrent)
}
</script>

<style scoped lang="less"></style>
