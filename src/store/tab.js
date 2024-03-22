import Cookie from "js-cookie"
import i18n from '../utils/i18n/index'


export default {
    state: {
        isCollapse: false,//导航栏是否折叠
        tabList: [
            {
                path: '/home',
                name: 'home',
                // label: '首頁',
                label: i18n.t('tab.home'),
                icon: 's-home',
                url: 'Home/Home'
            }
        ],//面包屑的数据:点了哪个路由,首页是一定有的
        menu: [],//不同用户的菜单
    },
    mutations: {
        // 修改导航栏展开和收起的方法
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        getMenu(state) {
            console.log(state.tabList)
            console.log(state.menu)
        },
        // 改变用户菜单中每一项的数据
        Menulang(state) {
            state.tabList.forEach(item => {
                item.label = i18n.t(`tab.${item.name}`)
            })

            state.menu.forEach(item => {
                item.label = i18n.t(`tab.${item.name}`)
            })
            // Cookie.set('menu_iecshowroom', JSON.stringify(state.menu))
        },
        // 更新面包屑的数据
        SelectMenu(state, item) {
            // 如果点击的不在面包屑数据中,则添加
            const index = state.tabList.findIndex(val => val.name === item.name)
            if (index === -1) {
                state.tabList.push(item)
            }
        },
        // 删除tag:删除tabList中对应的item
        closeTag(state, item) {
            // 要删除的是state.tabList中的item
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        // 设置不同用户的菜单
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu_iecshowroom', JSON.stringify(val))
        },
        // 动态添加路由
        addMenu(state, router) {
            // 判断Cookie
            if (!Cookie.get('menu_iecshowroom')) return
            const menu = JSON.parse(Cookie.get('menu_iecshowroom'))
            state.menu = menu

            const menuArray = []

            // 组装路由
            menu.forEach(item => {
                // 判断是否有子路由
                if (item.children) {
                    item.children = item.children.map(itemm => {
                        itemm.component = () => import(`../Views/${itemm.url}`)
                        return itemm
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../Views/${item.url}`)
                    menuArray.push(item)
                }
            });

            // console.log(menuArray, 'menuArray');

            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}