<template>
    <div class="contribute-chart">
        <el-row>
            <el-col :span="24">
                <kx-card :title="contributeTitle" :cardConfig="config">
                    <template #body>
                        <heat-map :heatMapData="heatMapData"></heat-map>
                    </template>
                </kx-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { KxCard } from '@/base-ui'
import { HeatMap } from '@/components/index'
import { useStore } from '@/store'
import { computed } from 'vue'
import { IArticleStatisticsList } from '@/store/main/home/types'
import { IHeatMapData } from '@/views/main/main-content/home/home-panel/home-charts/types'
import { IkxCard } from '@/views/main/main-content/home/home-panel/base-data/types'

const store = useStore()

const config: IkxCard = {
    shadow: 'always',
    bodyStyle: { height: '300px' },
}

const contributeTitle = '文章贡献表'
const heatMapData = computed<IHeatMapData[]>(() => {
    const date: IHeatMapData[] = []
    //[['2022-04-17', 1], ['2022-01-24', 1]]
    store.state.homeModule.articleStatisticsList.forEach((key: IArticleStatisticsList) => {
        date.push([key.date, key.count])
    })
    return date
})
</script>

<style scoped lang="less">
.contribute-chart {
    margin-bottom: 15px;
}
</style>
