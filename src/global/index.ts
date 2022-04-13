import { App } from 'vue'
import 'element-plus/dist/index.css'
import EIcon from './eleplus/icon/icon'
import naive from '@/global/naive/container/container'

const registerGlobalApp = (app: App) => {
    app.use(EIcon)
    app.use(naive)
}

export default registerGlobalApp
