import { IMenuState } from '@/store/login/types'
import { h } from 'vue'
import { ElIcon } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'

const naiMenuList: any = []
function renderIcon(icon: any) {
    return () => h(ElIcon, null, { default: () => h(icon) })
}

//循环实现
export function getMenuList(userMenus: IMenuState) {
    for (const menuC of userMenus) {
        if (menuC.children.length === 0) {
            naiMenuList.push({
                label: menuC.name,
                key: menuC.id,
                href: menuC.path,

                icon: renderIcon(menuC.icon),
            })
        } else if (menuC.children.length !== 0) {
            const index = naiMenuList.length
            naiMenuList.push({
                label: menuC.name,
                key: menuC.id,
                href: menuC.path,
                icon: renderIcon(menuC.icon),
                children: [],
            })
            //遍历二级菜单
            for (const menuCC of menuC.children) {
                naiMenuList[index].children.push({
                    label: menuCC.name,
                    key: menuCC.id,
                    href: menuCC.path,
                    icon: renderIcon(menuCC.icon),
                })
            }
        }
    }
    // console.log(menuList)
    return naiMenuList
}

//递归实现
function getArray(params: any) {
    const array: any[] = []
    for (let i = 0; i < params.length; i++) {
        if (params[i].children && params[i].children.length > 0) {
            array[i] = {}
            array[i].label = params[i].name
            array[i].children = [...getArray(params[i].children)]
        } else {
            array.push({
                label: params[i].name,
            })
        }
    }
    return array
}

export function mapMenusToRoutes(userMenuList: IMenuState): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []

    //1.先加载默认所有的routes
    const allRoutes: RouteRecordRaw[] = []
    //只找当前文件夹,不向下查找就是false
    const routeFiles = require.context('../router/main/main-content', true, /\.ts/)
    routeFiles.keys().forEach((key) => {
        // console.log(key)
        const route = require('../router/main/main-content' + key.split('.')[1])
        allRoutes.push(route.default)
    })
    allRoutes.forEach((item, index) => {
        allRoutes[index].path = item.path.split('/main/main-content')[1]
    })
    // console.log(allRoutes[0])

    //2.根据菜单获取需要添加的routes
    const _recurseGetRoute = (menus: IMenuState) => {
        for (const menu of menus) {
            if (menu.children === null) {
                //find:找到后停止
                const route = allRoutes.find((route) => route.path === menu.path)
                if (route) {
                    routes.push(route)
                }
            } else if (menu.children.length === 0) {
                const route = allRoutes.find((route) => route.path === menu.path)
                if (route) {
                    routes.push(route)
                }
            } else {
                _recurseGetRoute(menu.children)
            }
        }
    }
    _recurseGetRoute(userMenuList)

    return routes
}
