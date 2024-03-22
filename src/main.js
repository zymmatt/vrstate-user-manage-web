import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 修改 el-dialog 默认点击遮照为不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false
import i18n from './utils/i18n'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ELEMENT,
    {
      i18n: (key, value) => i18n.t(key, value) // 在注册Element时设置i18n的处理方法,可以实现当点击切换按钮后，elementUI可以自动调用.js语言文件实现多语言切换
    }
)


new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')
