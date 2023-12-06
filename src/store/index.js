import Vue from 'vue'
import Vuex from 'vuex'
// 引入持久化存储
import VuexPersistence from 'vuex-persist'
// 模块化，用户状态
import { authStore } from './auth.store'

const keyPrefix = '__vuex__'

const vuexLocal = new VuexPersistence({
  key: `${keyPrefix}local`,
  storage: window.localStorage,
  modules: ['authModule'], // only save user module
  filter: mutation => {
    return true
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule: authStore
  },
  plugins: [vuexLocal.plugin]
})
