import { IUserMenusState } from '@/store/login/types'
import { h } from 'vue'
import { ElIcon } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'

const naiMenuList: any = []

export function getAssetsIcon(iconName: string) {
    iconName = iconName.substring(0, 1).toLowerCase() + iconName.substring(1)
    const icon = iconName.replace(/([A-Z])/g, '-$1').toLowerCase()
    return require('@element-plus/icons-vue/dist/es/' + icon).default
}

// getAssetsImages('Albums')

export function renderIcon(icon: any) {
    return () => h(ElIcon, null, { default: () => h(icon) })
}

//循环实现
export function getMenuList(userMenus: IUserMenusState) {
    for (const menuC of userMenus) {
        if (menuC.name === null && !menuC.hidden) {
            for (const menuCC of menuC.children) {
                naiMenuList.push({
                    label: menuCC.name,
                    key: menuCC.name,
                    href: menuC.path,
                    icon: renderIcon(getAssetsIcon(menuCC.icon)),
                })
            }
        } else if (menuC.name !== null && !menuC.hidden) {
            // console.log(menuC)
            const index = naiMenuList.length
            naiMenuList.push({
                label: menuC.name,
                key: menuC.name,
                href: menuC.path,
                icon: renderIcon(getAssetsIcon(menuC.icon)),
                children: [],
            })
            //遍历二级菜单
            for (const menuCC of menuC.children) {
                if (!menuCC.hidden) {
                    // console.log(menuCC)
                    naiMenuList[index].children.push({
                        label: menuCC.name,
                        key: menuCC.name,
                        href: menuCC.path,
                        icon: renderIcon(getAssetsIcon(menuCC.icon)),
                    })
                }
            }
        }
    }
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

export function mapMenusToRoutes(userMenuList: IUserMenusState): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []

    //1.先加载默认所有的routes
    const allRoutes: RouteRecordRaw[] = []
    //只找当前文件夹,不向下查找就是false
    const routeFiles = require.context('../router/main/main-content', true, /\.ts/)
    routeFiles.keys().forEach((key) => {
        const route = require('../router/main/main-content' + key.split('.')[1])
        allRoutes.push(route.default)
    })
    allRoutes.forEach((item, index) => {
        allRoutes[index].path = item.path?.split('/main/main-content')[1]
    })
    //2.根据菜单获取需要添加的routes
    const _recurseGetRoute = (menus: any) => {
        // console.log(menus)
        for (const menu of menus) {
            if (menu.children === null) {
                //find:找到后停止
                const route = allRoutes.find((route) => route.path === menu.path)
                if (route) {
                    routes.push(route)
                }
            } else if (menu.name === null) {
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
    // console.log(routes)
    return routes
}

/*
        if (menu.type === 1) {
          console.log(menu.children)
          const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
          if (findMenu) {
            return findMenu
          }
        } else if (menu.type === 2 && menu.url === currentPath) {
          return menu
        }
        */

//获取面包屑数据
export function pathMapToMenu(menus: IUserMenusState, currentPath: string) {
    for (const menuC of menus) {
        if (menuC.name === null) {
            if (menuC.path == currentPath) {
                return menuC
            }
        } else {
            if (menuC.path == currentPath) {
                return menuC
            }
            for (const menuCC of menuC.children) {
                if (menuCC.path == currentPath) {
                    return menuCC
                }
            }
        }
    }
}
