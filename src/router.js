import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/auth/sign-in',
    name: 'SignIn',
    component: () => import('./view/auth/SignIn')
  },
  {
    path: '/',
    name: 'Orders',
    component: () => import('./view/orders/index'),
    meta: {
      title: 'All orders today'
    }
  },
  {
    path: '/edit/:id',
    name: 'OrdersEdit',
    component: () => import('./view/orders/edit'),
    meta: {
      title: 'Edit order'
    }
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('./view/submit'),
    meta: {
      title: 'Submit'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('./view/user'),
    meta: {
      title: 'User center'
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('./view/user/password'),
    meta: {
      title: 'Change Password'
    }
  },
  {
    path: '/report-bad-customers',
    name: 'ReportBadCustomers',
    component: () => import('./view/user/reportBadCustomers'),
    meta: {
      title: 'Report Bad Customers'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('./view/search'),
    meta: {
      title: 'Search'
    }
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export { router }
