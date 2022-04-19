<template>
    <div ref="main">
        <base-echart :options="options"></base-echart>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import { BaseEchart } from '@/base-ui/index'

const main = ref<HTMLElement>()

const props = defineProps<{
    tagData: any
}>()

let colorList = [
    '#CF4645',
    '#B580B2',
    '#29008A',
    '#146A90',
    '#8956FF',
    '#70C9A8',
    '#bfbfbf',
    '#595959',
    '#40a9ff',
    '#1890ff',
    '#ffd666',
    '#ffc53d',
    '#ffc53d',
    '#ffc069',
    '#ffa940',
    '#fa8c16',
    '#eccbd9',
    '#ffadad',
    '#ff6392',
    '#ffc09f',
    '#ffcb77',
    '#ffe066',
    '#ffd53e',
    '#ffda3d',
    '#adf7b6',
    '#a0e8af',
    '#80ed99',
    '#07beb8',
    '#17c3b2',
    '#48cae4',
    '#97d2fb',
    '#83bcff',
    '#91e5f6',
    '#9381ff',
]
let colorListLen = colorList.length
let fontSizeList = [
    12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21,
    22, 23, 24,
]
let fontSizeListLen = fontSizeList.length
let customLabel = {
    color: colorList[Math.floor(Math.random() * colorListLen)],
    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)],
}
let bgColor = '#fffcf9'
let canDraggable = false

const data2 = [
    {
        name: '',
        value: 0,
        draggable: canDraggable,
        itemStyle: {
            color: bgColor,
        },
        label: {
            color: colorList[Math.floor(Math.random() * colorListLen)],
            fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)],
        },
    },
]
const tagChartData = computed(() => {
    const data: any = []
    props.tagData.map((item: any) => {
        data.push({
            name: item.name,
            draggable: canDraggable,
            itemStyle: {
                color: bgColor,
            },
            label: {
                color: colorList[Math.floor(Math.random() * colorListLen)],
                fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)],
            },
        })
    })
    return data
})

const options = computed(() => {
    return {
        backgroundColor: '#fff',
        color: ['#37A2DA', '#32C5E9', '#67E0E3'],
        title: {
            show: false,
            text: '文章标签',
            x: 'center',
            y: 'bottom',
            // 文字的颜色,默认 #333。
            color: '#666',
            fontSize: 24,
        },
        toolbox: {
            show: false,
            feature: {
                // dataView: {readOnly: false},
                // magicType: {type: ['line', 'bar']},
                restore: {},
                // saveAsImage: {}
            },
        },
        itemStyle: {
            color: bgColor,
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                force: {
                    repulsion: 80,
                    edgeLength: 10,
                },
                roam: false,
                // symbol: '',
                // symbolSize: 0,
                label: {
                    show: true,
                    color: 'auto',
                    fontSize: 14,
                },
                data: tagChartData.value,
            },
        ],
    }
})
</script>

<style lang="less" scoped>
.tag-cloud {
    width: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
