<template>
    <div class="part-charts">
        <el-row :gutter="15">
            <el-col :lg="14" :md="12" :xs="24">
                <kx-card :title="viewCountsTitle">
                    <template #body>
                        <bar-echart :barData="viewCounts"></bar-echart>
                    </template>
                </kx-card>
            </el-col>
            <el-col :lg="10" :md="12" :xs="24">
                <kx-card :title="categoryTitle">
                    <template #body>
                        <pie-echart :pieData="categoryDTOList"></pie-echart>
                    </template>
                </kx-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { KxCard } from '@/base-ui/index'
import { BarEchart } from '@/components/index'
import { PieEchart } from '@/components'
import { useStore } from '@/store'
import { computed, watchEffect } from 'vue'
import {
    IArticleRankDTO,
    IPieData,
} from '@/views/main/main-content/home/home-panel/home-charts/types'
import { ICategoryDTOList } from '@/store/main/home/types'

const store = useStore()
//标题
const viewCountsTitle = '文章浏览量排行'
const categoryTitle = '文章分类统计'

//柱图:文章浏览量排行数据
const viewCounts = computed<IArticleRankDTO[]>(() => {
    const data: any[] = []
    store.state.homeModule.articleRankDTOList.forEach((item: IArticleRankDTO) => {
        data.push([item.articleTitle, item.viewsCount])
    })
    return data
})

//饼图:分类文章数据
const categoryDTOList = computed<IPieData[]>(() => {
    const data: any = []
    store.state.homeModule.categoryDTOList.forEach((item: ICategoryDTOList) => {
        data.push({ value: item.articleCount, name: item.categoryName })
    })
    return data
})

watchEffect(() => {
    // console.log(categoryDTOList.value)
})
</script>

<style scoped lang="less">
.el-card {
    margin-bottom: 10px;
}
</style>
