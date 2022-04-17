<template>
    <div class="week-views" v-once>
        <el-row :gutter="10">
            <el-col :span="24">
                <kx-card :title="weekViewTitle">
                    <template #body>
                        <line-echart :lineData="lineData"></line-echart>
                    </template>
                </kx-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { KxCard } from '@/base-ui'
import { LineEchart } from '@/components/index.ts'
import { computed } from 'vue'
import { useStore } from '@/store'
import { IUniqueViewDTOList } from '@/components/page-echarts/types'

const store = useStore()
const weekViewTitle = '一周访问量'
const xData: any = []
const yData: any = []

const lineData = computed(() => {
    return store.state.homeModule.uniqueViewDTOList.map((key: IUniqueViewDTOList) => {
        xData.push(key.day)
        yData.push(key.viewsCount)
        return {
            xData,
            yData,
        }
    })
})
</script>

<style lang="less" scoped>
.week-views {
    background-color: white;
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>
