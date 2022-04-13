import { createApp } from 'vue'
import App from './App.vue'
import registerGlobalApp from '@/global'
import { setupStore, store } from '@/store'
import router from '@/router'
import kxRequest from '@/service'
import '@/assets/css/base.css'

const app = createApp(App)
registerGlobalApp(app)
setupStore()
app.use(store)
app.use(router)
kxRequest.post({
    url: '/report',
    data: '',
})

app.mount('#app')
