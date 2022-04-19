<template>
    <div>
        <base-echart :options="option" :height="height"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { BaseEchart } from '@/base-ui'

import { EChartsOption } from 'echarts'

const props = defineProps<{
    lineData: any[]
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
            data: props.lineData[0],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: props.lineData[1],
                type: 'line',
                smooth: true,
            },
        ],
    }
})
</script>

<style scoped lang="less"></style>
