<template>
    <base-echart :options="option" height="500px" width="100%"></base-echart>
</template>

<script lang="ts" setup>
import { BaseEchart } from '@/base-ui/index'
import { computed, defineProps } from 'vue'
import { IUserArea } from '@/store/main/user/types'

const props = defineProps<{
    mapData: IUserArea[]
}>()

const option = computed<any>(() => {
    return {
        visualMap: {
            orient: 'horizontal',
            type: 'piecewise',
            itemWidth: 15,
            itemHeight: 10,
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: 300,
            inRange: {
                color: ['#e4f2dc', '#cde8bc', '#a3ea77', '#90d764', '#68b837'],
            },

            color: '#7B93A7',
            fontSize: 14,
        },
        tooltip: {
            show: true,
            formatter: function (params: any) {
                return `${params.data ? params.data.name : params.name}<br/>用户数量:${
                    params.data ? params.data?.value : 0
                }`
            },
        },
        geo: {
            map: 'china',
            itemStyle: {
                areaColor: '#999999',
                borderColor: '#fff',
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#3333cc',
                },
                label: {
                    show: true,
                },
            },
        },
        series: [
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.2, //长宽比
                showLegendSymbol: true, // 存在legend时显示
                tooltip: {
                    show: true,
                },
                label: {
                    show: true,
                },
                itemStyle: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#2B91B7',
                    },
                    label: {
                        show: true,
                        color: '#fff',
                    },
                },
                animation: false,
                data: props.mapData,
            },
        ],
    }
})
</script>

<style lang="less" scoped></style>
