<template>
    <div>
        <base-echart :options="option" :height="height"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { BaseEchart } from '@/base-ui'
import { IChartDataType } from '@/components/page-echarts/types'
import { EChartsOption } from 'echarts'

const props = defineProps<{
    lineData: IChartDataType[]
}>()
const height = '360px'

const option = computed<EChartsOption>(() => {
    return {
        legend: {},
        tooltip: {
            trigger: 'item',
        },
        xAxis: {
            type: 'category',
            data: props.lineData[0]?.xData,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: props.lineData[0]?.yData,
                type: 'line',
                smooth: true,
            },
        ],
    }
})
</script>

<style scoped lang="less"></style>
