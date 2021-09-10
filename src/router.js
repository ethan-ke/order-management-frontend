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
    component: () => import('./view/orders'),
    meta: {
      title: 'All orders today'
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
