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
          landing: () => import(/* webpackChunkName: "welcome" */ '../components/HelloWorld')
        }
      },
      {
        path: '/about',
        name: 'About',
        components: {
          landing: () => import(/* webpackChunkName: "about" */ '../views/About')
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
