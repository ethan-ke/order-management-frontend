import { router } from './router'
import store from './store'
import { showFailToast } from 'vant'
import { getAccessToken } from '@/utils/auth' // 获取 Cookie Token[cite: 8]

const whiteList = ['/auth/sign-in'] // 免登录白名单[cite: 8]

router.beforeEach(async (to, from, next) => {
  const hasToken = getAccessToken()

  if (hasToken) {
    if (to.path === '/auth/sign-in') {
      // 已登录状态访问登录页，直接重定向回首页
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters?.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 获取失败清空 Token 并跳转登录页[cite: 8]
          await store.dispatch('user/resetToken')
          showFailToast(error?.message || 'Session expired, please sign in again')
          next(`/auth/sign-in?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* 未登录状态 */
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/auth/sign-in?redirect=${to.path}`)
    }
  }
})