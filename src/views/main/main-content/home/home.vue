<template>
    <n-scrollbar>
        <div class="home">
            <base-data></base-data>
            <week-views-chart></week-views-chart>
            <contribute-cart></contribute-cart>
            <view-cate-charts></view-cate-charts>
            <map-tag-charts></map-tag-charts>
        </div>
    </n-scrollbar>
</template>

<script lang="ts" setup>
import {
    BaseData,
    ContributeCart,
    MapTagCharts,
    ViewCateCharts,
    WeekViewsChart,
} from './home-panel/index'
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    width: 100%;
}
</style>
