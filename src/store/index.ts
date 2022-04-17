import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStore } from '@/store/types'
import { commonModule } from '@/store/common'
import { loginModule } from '@/store/login/login'
import { homeModule } from '@/store/main/home/home'

export const store = createStore<IRootState>({
    modules: {
        commonModule,
        loginModule,
        homeModule,
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
