import Vue from 'vue'
import Router from 'vue-router'
import RouteConfig from './config'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

NProgress.configure({ showSpinner: false })

const commonPath = 'h5'
const componentPath = 'views'
const routes = []
RouteConfig.routesList.forEach((item) => {
  const { path, title, compath, keepalive } = item

  let oRouter = {
    name: item.name,
    path: `/${commonPath}/${path}`,
    component: () => import(`@/${componentPath}/${compath}.vue`),
    meta: {
      title,
      keepalive
    },
    url: `@/${componentPath}/${compath}.vue`
  }
  routes.push(oRouter)
})

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()

  if (to.meta.title) {
    document.title = to.meta.title // 设置wap网页title
    try {
    } catch (error) {
      // console.log(error)
    }
  }
  next()
})
router.afterEach(route => {
  // 进度条
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router
