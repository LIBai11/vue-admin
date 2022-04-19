# vue-admin

###	2022.04.19-1

**首页**制作完成</br>
优化样式,增加响应式布局


###	2022.04.17-1

实现动态数据的ECharts热点图的封装</br>
已知问题: <br/>
网页速度加载过慢,由于是webpack环境,require方法会将所有文件扫描一遍<br/>删除@vicons/ionicons5中的es和lib文件夹暂时解决


###	2022.04.16-1

实现动态数据的ECharts柱图的封装</br>
已知问题: 网页速度加载过慢,是由于vicons文件过多导致,目前已稍加改善,等待后续优化


###	2022.04.15-2

优化Tabs标签移除逻辑</br>
已知问题: 网页速度加载过慢,刷新一下要5-10秒


###	2022.04.15-2

Tabs标签页样式修改</br>
已知问题: 网页速度加载过慢,刷新一下要5-10秒

###	2022.04.15-1

实现动态添加和移除Tabs标签页</br>
已知问题: 网页速度加载过慢,刷新一下要5-10秒



###	2022.04.14-4

实现动态添加面包屑导航,</br>
我曹了,怎么网页加载这么慢 </br>
已知问题: 网页速度加载过慢,刷新一下要5-10秒


###	2022.04.14-3

实现动态添加侧边菜单图标的功能,并对侧边菜单的样式进行了细微地修改</br>
已知问题: 网页速度加载过慢,刷新一下要5-10秒



###	2022.04.14-2

优化了文章修改的动态路由添加的问题,实现侧边菜单的组件封装



###	2022.04.14-1

修复了路径问题,modify不知道为啥不能添加到路由里去,只能手动添加了



## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
