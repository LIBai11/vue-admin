<template>
    <base-echart :options="options"></base-echart>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { BaseEchart } from '@/base-ui/index'
import { EChartsOption } from 'echarts'
import { IArticleRankDTO } from '@/views/main/main-content/home/home-panel/home-charts/types'

const props = defineProps<{
    barData: IArticleRankDTO[]
}>()

const options = computed<EChartsOption>(() => {
    return {
        dataset: [
            {
                dimensions: ['article', 'viewCount'],
                source: props.barData,
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: 'viewCount', order: 'desc' },
                },
            },
        ],
        xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30 },
        },
        yAxis: {},
        series: {
            type: 'bar',
            encode: { x: 'article', y: 'viewCounts' },
            datasetIndex: 1,
        },
    }
})
</script>

<style lang="less" scoped></style>
