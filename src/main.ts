import { createApp } from 'vue'
import App from './App.vue'
import registerGlobalApp from '@/global'
import { setupStore, store } from '@/store'
import router from '@/router'

import '@/assets/css/base.css'
setupStore()
const app = createApp(App)
app.use(store)
app.use(router)

registerGlobalApp(app)

app.mount('#app')
