import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import echarts from 'echarts' // 导入echarts
import VueBMap from 'vue-bmap-gl' // 导入vue-bmap-gl 百度地图组件
import 'vue-bmap-gl/dist/style.css'
import VueMapvgl from 'vue-mapvgl' // 导入vue-mapvgl
import '@/icons' // icon
import '@/permission' // permission control
import JsonExcel from 'vue-json-excel' // 导入vue-json-excel超级方便导出excel表格数据
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
Vue.use(VueBMap)
Vue.use(VueMapvgl)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel) // 注册全局组件
VueBMap.initBMapApiLoader({
  ak: 'GYqucKgQD6kmLmICzoglATNBV3RITmqq',
  v: '1.0'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
