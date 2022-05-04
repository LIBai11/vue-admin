import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStore } from '@/store/types'
import { commonModule } from '@/store/common'
import { loginModule } from '@/store/login/login'
import { homeModule } from '@/store/main/home/home'
import { userModule } from '@/store/main/user/user'
import { publishSearchModule } from '@/store/article/publish/search/publish-search'
import { noAsyncModule } from '@/store/no-async/no-async'
import { searchArticlesModule } from '@/store/article/articles/search/articles-search'
import { editArticleModule } from '@/store/article/articles/edit/edit-article'
import { articleCategoriesModule } from '@/store/article/articles/categories/article-categories'
import { articleTagsModule } from '@/store/article/articles/tags/article-tags'
//消息管理
import { commentModule, wordsModule } from './message/index'
//用户
import { userListModule } from '@/store/users/user-list/user-list'
import { userRolesModule } from '@/store/users/user-list/user-roles'
import { activeUsersModule } from '@/store/users/active-users/active-users'
import {
    apiModule,
    menuModule,
    roleMenuModule,
    roleModule,
    roleResourceModule,
} from '@/store/permission'
import { websiteModule } from '@/store/system'

export const store = createStore<IRootState>({
    modules: {
        commonModule,
        loginModule,
        homeModule,
        userModule,
        publishSearchModule,
        noAsyncModule,
        searchArticlesModule,
        editArticleModule,
        articleCategoriesModule,
        articleTagsModule,
        commentModule,
        wordsModule,
        userListModule,
        userRolesModule,
        activeUsersModule,
        menuModule,
        apiModule,
        roleModule,
        roleMenuModule,
        roleResourceModule,
        websiteModule,
    },
})

export function useStore(): Store<IStore> {
    return useVuexStore()
}

export function setupStore() {
    store.dispatch('loginModule/getLocalCache').then((r) => {
        return r
    })
}
