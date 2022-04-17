import { createApp } from 'vue'
import App from './App.vue'
import registerGlobalApp from '@/global'
import { setupStore, store } from '@/store'
import router from '@/router'

import '@/assets/css/base.css'

setupStore()
const app = createApp(App)
registerGlobalApp(app)

app.use(store)
app.use(router)

app.mount('#app')
