import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

const server = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: '/kmc',
    timeout: 10000
})

server.interceptors.request.use((config) => {
    if (store.getters.token) {
        config.headers.Authorization = store.getters.token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

server.interceptors.response.use(async(response) => {
    const { message, success } = response.data
    if (success) {
        return response.data
    } else {
        if (response.data.status == 500 && response.data.message == '身份认证失败') {
           await store.dispatch('user/logOut')
            router.push('/login')
            router.go(0)
        }
        return Promise.reject(new Error(message))
    }
}, (error) => {
    Message({ type: 'error', message: error.message })
    return Promise.reject(error)
})

export default server