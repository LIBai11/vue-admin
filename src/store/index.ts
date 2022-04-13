import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStore } from '@/store/types'
import { commonModule } from '@/store/common'
import { loginModule } from '@/store/login/login'

export const store = createStore<IRootState>({
    modules: {
        commonModule,
        loginModule,
    },
})

export function useStore(): Store<IStore> {
    return useVuexStore()
}
