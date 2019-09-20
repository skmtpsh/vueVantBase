import Vue from 'vue'
import App from './App.vue'
// 菜单和路由设置
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import 'amfe-flexible'
import '@/assets/style/index.scss'
// svg 图标
import '@/assets/svg-icons'
// import '@/components'

import filters from './filters'

import {
  Collapse, CollapseItem, Toast, Skeleton
} from 'vant'

Vue.use(Collapse).use(CollapseItem).use(Toast).use(Skeleton)

FastClick.attach(document.body)
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
