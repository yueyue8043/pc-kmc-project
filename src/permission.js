import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        }
        else {
        
            if (!store.getters.uid && !store.getters.limits) {
                await store.dispatch("user/getUserInfo");
            } 
                next()
        }
        // if(store.getters.limits != 8) {
        //     if(to.path === '/personCenter') {
        //         next('/')
        //     }
        // }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }

})

router.afterEach((to, from, next) => {

})