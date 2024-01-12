import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/personCenter',
        component: () => import('@/views/PersonCenter')
      },
      {
        path: '/warehouse',
        name: 'warehouse',
        component: () => import('@/views/Warehouse'),
        children: [
          {
            path: '/deliver',
            name: 'deliver',
            component: () => import('@/views/Warehouse/deliver/index.vue')
          }
        ]
      },
      {
        path: '/attendance',
        name: 'attendance',
        component: () => import('@/views/Attendance'),
        children: [
          {
            path: '/salary',
            name: 'salary',
            component: () => import('@/views/Attendance/salary')
          }
        ]
      },
    ]
  },
  
 
  {
    path: '/register',
    component: () => import('@/views/register/register.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
