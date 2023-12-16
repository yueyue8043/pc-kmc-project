import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        }
        else {
            next('/login')
        }
    } else {
        console.log(to.path)
      if(whiteList.includes(to.path)) {
        next()
      }else {
        next('/login')
      }
    }
})