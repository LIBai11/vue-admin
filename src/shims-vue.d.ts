/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'nprogress'
declare module '*.json'
declare module 'TagCloud/src/index.js'
declare module 'vue-img-cutter/src/index.js'
declare let $store: any
declare let $filter: any
