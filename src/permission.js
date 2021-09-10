import {router} from './router'
import store from './store'
import { Toast } from 'vant'

import { getAccessToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/auth/sign-in'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  // set page title
  document.title = 'Order system'

  // determine whether the user has logged in
  const hasToken = getAccessToken()

  if (hasToken) {
    if (to.path === '/auth/sign-in') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Toast.fail(error || 'Has Error')
          next(`/auth/sign-in?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/auth/sign-in?redirect=${to.path}`)
    }
  }
})
