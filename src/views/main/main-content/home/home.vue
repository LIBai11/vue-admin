<template>
    <n-scrollbar>
        <div class="home">
            <base-data></base-data>
            <week-views-chart></week-views-chart>
            <contribute-cart></contribute-cart>
        </div>
    </n-scrollbar>
</template>

<script lang="ts" setup>
import { BaseData, WeekViewsChart, ContributeCart } from './home-panel/index'
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    width: 100%;
}
</style>
