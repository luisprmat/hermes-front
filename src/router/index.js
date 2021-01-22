import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Welcome',
        components: {
          landing: () => import(/* webpackChunkName: "welcome" */ '../views/landing/Welcome')
        }
      },
      {
        path: '/about',
        name: 'About',
        components: {
          landing: () => import(/* webpackChunkName: "about" */ '../views/landing/About')
        }
      },
      {
        path: '/login',
        name: 'Login',
        components: {
          landing: () => import(/* webpackChunkName: "login" */ '../views/auth/Login')
        }
      }
    ],
    meta: {
      auth: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "users" */ '../views/admin/Users'),
        meta: {
          auth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.auth)) {
    let auth = await store.dispatch('autoLogin')
    if(!auth) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
