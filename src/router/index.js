import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/register',
    // name: 'register',
    component: () => import('@/views/register/register.vue')
  },
  {
    path: '/login',
    // name: 'register',
    component: () => import('@/views/login/login.vue')
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
