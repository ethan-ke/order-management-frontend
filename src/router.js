import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/auth/sign-in',
    name: 'SignIn',
    component: () => import('./view/auth/SignIn.vue'),
    meta: {
      title: 'Sign In',
      showTabbar: false // 🚫 登录页隐藏底部导航栏
    }
  },
  {
    path: '/',
    name: 'Orders',
    component: () => import('./view/orders/index.vue'),
    meta: {
      title: 'All orders today',
      showTabbar: true // ✅ 显示底部导航栏
    }
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('./view/submit/index.vue'),
    meta: {
      title: 'Submit',
      showTabbar: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('./view/search/index.vue'),
    meta: {
      title: 'Search',
      showTabbar: true
    }
  },
  {
    path: '/report/customers/pic',
    name: 'ReportCustomersPic',
    component: () => import('./view/user/reportBadCustomers.vue'),
    meta: {
      title: 'Report Bad Customers',
      showTabbar: false // 子页面隐藏导航栏
    }
  },
  {
    path: '/report/customers/number',
    name: 'ReportCustomersNumber',
    component: () => import('./view/user/reportCustomersNumber.vue'),
    meta: {
      title: 'Report Bad Customers',
      showTabbar: false // 子页面隐藏导航栏
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('./view/user/index.vue'),
    meta: {
      title: 'User center',
      showTabbar: true
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('./view/user/password.vue'),
    meta: {
      title: 'Change Password'
    }
  },
  {
    path: '/edit/:id',
    name: 'OrdersEdit',
    component: () => import('./view/orders/edit.vue'),
    meta: {
      title: 'Edit order',
      showTabbar: false // 编辑页通常隐藏底部栏，留出屏幕空间
    }
  }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
  next()
})