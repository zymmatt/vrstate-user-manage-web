import Vue from "vue";
import Vuex from 'vuex';
import tab from './tab';

// import getters from './getter';

Vue.use(Vuex)
/*
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {});
*/

// 创建Vuex实例并导出
export default new Vuex.Store({
    // state,
    // mutations,
    // actions,

    modules:{
        tab
    }
})