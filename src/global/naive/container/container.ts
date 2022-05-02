import {
    create,
    NButton,
    NForm,
    NFormItem,
    NGradientText,
    NH3,
    NH5,
    NIcon,
    NInput,
    NLayout,
    NLayoutSider,
    NLoadingBarProvider,
    NMenu,
    NScrollbar,
    NSwitch,
    NText,
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
        NH5,
        NText,
    ],
})
export default naive
