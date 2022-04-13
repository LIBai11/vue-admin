import {
    create,
    NButton,
    NForm,
    NFormItem,
    NGradientText,
    NH3,
    NIcon,
    NInput,
    NLayout,
    NLayoutSider,
    NLoadingBarProvider,
    NMenu,
    NScrollbar,
    NSwitch,
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NLoadingBarProvider,
        NH3,
        NGradientText,
        NInput,
        NIcon,
        NSwitch,
        NFormItem,
        NForm,
        NMenu,
        NLayout,
        NLayoutSider,
        NScrollbar,
    ],
})
export default naive
