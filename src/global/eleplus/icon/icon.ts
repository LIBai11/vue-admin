import * as ElIcons from '@element-plus/icons-vue'
import { App } from 'vue'

export default function (app: App) {
    for (const name in ElIcons) {
        app.component(name, (ElIcons as any)[name])
    }
}
