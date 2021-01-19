import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
