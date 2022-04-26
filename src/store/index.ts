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
