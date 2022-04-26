import { App } from 'vue'
import 'element-plus/dist/index.css'
import EIcon from './eleplus/icon/icon'
import naive from '@/global/naive/container/container'
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'
import { ElCollapseTransition } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import { formatUtcString } from '@/utils/date-format'

const registerGlobalApp = (app: App) => {
    app.use(EIcon)
    app.use(naive)
    //ele内置动画
    app.component(ElCollapseTransition.name, ElCollapseTransition)
    app.config.globalProperties.$filters = {
        formatTime(value: string) {
            return formatUtcString(value)
        },
    }
}

export default registerGlobalApp
