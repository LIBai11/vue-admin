<template>
    <div class="header">
        <div class="breadcrumb">breadcrumb</div>
        <div class="avatar">
            <img :src="avatar" alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IUserData } from '@/store/login/types'
import { useLocalCache, useSessionCache } from '@/utils/use-storage'

const userData: IUserData = useSessionCache.getCache('userData')
const avatar = userData.avatar
</script>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: space-between;

    align-items: center;
}
.foldIcon {
    font-size: 25px;
    line-height: 55px;
}
.avatar {
    width: 50px;

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 10px;
    }
}
</style>
