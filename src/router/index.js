import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
// import store from '@/store'
import iView from 'iview'
import { setTitle } from '@/libs/util' // canTurnTosetToken setToken, getToken,
// import config from '@/config'
// const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'hash'
})

// const LOGIN_PAGE_NAME = 'login'

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   const token = getToken()
//   console.log(token)
//   console.log(to.name)
//   if (!token && to.name !== LOGIN_PAGE_NAME) {
//     // 未登录且要跳转的页面不是登录页
//     next({
//       name: LOGIN_PAGE_NAME // 跳转到登录页
//     })
//   } else if (!token && to.name === LOGIN_PAGE_NAME) {
//     // 未登陆且要跳转的页面是登录页
//     next() // 跳转
//   } else if (token && to.name === LOGIN_PAGE_NAME) {
//     // 已登录且要跳转的页面是登录页
//     next({
//       name: homeName // 跳转到homeName页
//     })
//   } else {
//     console.log('dddd')
//     if (store.state.user.hasGetInfo) {
//       next()
//     } else {
//       store.dispatch('getUserInfo').then(() => {
//         // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
//         next()
//       }).catch(() => {
//         setToken('')
//         next({
//           name: 'login'
//         })
//       })
//     }
//   }
// })

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
