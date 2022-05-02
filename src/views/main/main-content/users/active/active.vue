<template>
    <div class="user-list">
        <kx-card>
            <template #header>
                <page-title title="在线用户"></page-title>
            </template>
            <template #body>
                <div class="user-header">
                    <div class="user-header">
                        <users-header :options="false" @handleSearchBtn="handleSearchBtn" />
                    </div>
                </div>
                <div class="user-content">
                    <active-content :table-value="activeUsers" @handlePopBtn="handlePopBtn" />
                </div>
                <div class="content-pagination">
                    <kx-pagination
                        :counts="activeUsersCounts"
                        @handleWatchSize="handleWatchSize"
                        @handleWatchCurrent="handleWatchCurrent"
                    />
                </div>
            </template>
        </kx-card>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/index'
import { KxPagination, UsersHeader } from '@/components'
import ActiveContent from './content/active-content.vue'

import { IActiveUsersParams } from '@/service/users'
import { IActiveUserRecordList } from '@/store/users/active-users/types'

const store = useStore()
const queryActiveUsersParams: IActiveUsersParams = {}

const getActiveUsers = (payload: IActiveUsersParams) => {
    store.dispatch('activeUsersModule/getActiveUsers', payload)
}

getActiveUsers(queryActiveUsersParams)

const activeUsers = computed<IActiveUserRecordList>(() => store.state.activeUsersModule.recordList)
const activeUsersCounts = computed<number>(() => store.state.activeUsersModule.count)
//搜索按钮
const handleSearchBtn = (searchPayload: IActiveUsersParams) => {
    queryActiveUsersParams.keywords = searchPayload?.keywords

    getActiveUsers(queryActiveUsersParams)
}

//监听当前页数改变
const handleWatchCurrent = (currentPage: number) => {
    queryActiveUsersParams.current = currentPage
    getActiveUsers(queryActiveUsersParams)
}

//监听每页长度变化
const handleWatchSize = (currentSize: number) => {
    queryActiveUsersParams.size = currentSize
    getActiveUsers(queryActiveUsersParams)
}
//弹出框确认
const handlePopBtn = (userInfoId: number) => {
    store.dispatch('activeUsersModule/logoffUsers', userInfoId)
}
</script>

<style lang="less" scoped></style>
