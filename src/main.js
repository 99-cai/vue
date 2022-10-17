import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import axios from 'axios'

import '@/icons' // icon
import '@/permission' // permission control
import iconPicker from 'e-icon-picker'
// import 'e-icon-picker/dist/symbol.js' // 基本彩色图标库
// import 'e-icon-picker/dist/index.css' // 基本样式，包含基本图标
// import 'font-awesome/css/font-awesome.min.css' // font-awesome 图标库
// import 'element-ui/lib/theme-chalk/icon.css' // element-ui 图标库

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

//全局挂载axios
Vue.prototype.$axios = axios
axios.defaults.baseURL='/test'

new Vue({
  el: '#app',
  axios,
  router,
  store,
  FontAwesome: true,
  ElementUI: true,
  eIcon: true,
  eIconSymbol: true,
  render: h => h(App)
})
