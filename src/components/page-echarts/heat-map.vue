<template>
    <base-echart :options="options"></base-echart>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { BaseEchart } from '@/base-ui'
import { EChartsOption } from 'echarts'
import { IHeatMapData } from '@/views/main/main-content/home/home-panel/home-charts/types'

const props = defineProps<{
    heatMapData: IHeatMapData[]
}>()

const startDate = props.heatMapData[0][0].substr(
    0,
    props.heatMapData[props.heatMapData.length - 1][0].lastIndexOf('-')
)

const endDate = props.heatMapData[props.heatMapData.length - 1][0].substr(
    0,
    props.heatMapData[props.heatMapData.length - 1][0].lastIndexOf('-')
)
const options = computed<EChartsOption>(() => {
    return {
        visualMap: {
            min: 0,
            max: 10,
            color: ['#008000', '#00b300', '#1aff1a', '#ccffcc'],
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65,
        },
        tooltip: {
            formatter: function (arg: any) {
                return `日期:${arg.data[0]}<br/>
                发表文章数量:${arg.data[1]} `
            },
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: ['2022-01', '2022-12'],
            itemStyle: {
                borderWidth: 0,
            },
            yearLabel: { show: false },
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',

            data: props.heatMapData,
        },
    }
})
</script>

<style scoped lang="less"></style>
