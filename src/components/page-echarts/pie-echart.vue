<template>
    <base-echart :options="options"></base-echart>
</template>

<script lang="ts" setup>
import { computed, defineProps, watchEffect } from 'vue'
import { BaseEchart } from '@/base-ui/index'
import { EChartsOption } from 'echarts'
import { IPieData } from '@/views/main/main-content/home/home-panel/home-charts/types'

const props = defineProps<{
    pieData: IPieData[]
}>()

const options = computed<EChartsOption>(() => {
    return {
        tooltip: {},
        legend: {
            top: 'bottom',
        },

        series: [
            {
                name: '文章分类统计',
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8,
                },
                data: props.pieData,
            },
        ],
    }
})

watchEffect(() => {
    // console.log(1, props.pieData)
    // console.log(2, options.value?.series)
})
</script>

<style lang="less" scoped></style>
