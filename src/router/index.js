import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../Views/Main.vue'
import Home from '../Views/Home.vue'
// import Mall from '../Views/Mall.vue'
// import User from '../Views/User.vue'
// import PageOne from '../Views/PageOne.vue'
// import PageTwo from '../Views/PageTwo.vue'
import Login from '../Views/Login.vue'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
    // 主路由
    {
        path: '/',
        name:'Main',
        component: Main,
        redirect: '/home', // 重定向
        children: [
            // 子路由
            // { path: '/home', name: 'home', component: Home }, // 首页
            // { path: '/user', name: 'user', component: User }, // 用户管理
            // { path: '/mall', name: 'mall', component: Mall }, // 商品管理
            // { path: '/page1', name: 'page1', component: PageOne }, // 页面1
            // { path: '/page2', name: 'page2', component: PageTwo }, // 页面2
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        // redirect: '', // 重定向
    }

]

const router = new VueRouter({
    //  mode: 'history', // 启用历史模式
    routes
})

// 路由守卫:全局前置导航守卫
router.beforeEach((to, from, next) => {
    // 获取token

    // console.log(to.name);
    const token = Cookie.get('token_iecshowroom')
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    }
    else if (token && to.name === 'login') {
        next({ name: 'home' })
    }
    else {
        // console.log('enter', to.name);
        next()
    }



})


export default router