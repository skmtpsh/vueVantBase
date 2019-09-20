import Vue from 'vue'
import SvgIcon from '@/components/svgIcon'// svg组件
import Container from '@/components/container'// svg组件

// register globally <svg-icon icon-class="cate" />
Vue.component('svg-icon', SvgIcon)
Vue.component('sh-container', Container)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icons', false, /\.svg$/)

requireAll(req)
