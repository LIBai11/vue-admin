import * as Echarts from 'echarts'

export default function useEchart(el: HTMLElement) {
    const echartInstance = Echarts.init(el)

    const setOptions = (options: Echarts.EChartsCoreOption) => {
        echartInstance.setOption(options)
    }
    const updateSize = () => {
        echartInstance.resize()
    }
    window.addEventListener('resize', () => {
        echartInstance.resize()
    })

    return {
        echartInstance,
        setOptions,
    }
}
