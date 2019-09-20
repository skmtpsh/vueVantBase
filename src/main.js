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
  Button,
  Divider,
  Loading,
  Icon,
  Checkbox,
  Row, Col,
  Field,
  NavBar,
  CellGroup,
  Toast,
  Dialog,
  ActionSheet,
  RadioGroup, Radio,
  Cell
} from 'vant'

Vue.use(Loading).use(Icon).use(Divider).use(Button).use(Checkbox)
  .use(Row).use(Col).use(Field).use(NavBar).use(CellGroup).use(Cell)
  .use(Toast).use(Dialog).use(ActionSheet).use(RadioGroup).use(Radio)

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
