import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
    token: getToken()
}

const mutations = {
    setToken(state, token) {
        state.token = token
        setToken(token)
    },
}
const actions = {
   async login(context, data) {
     const loginData = await login(data)
        context.commit('setToken', loginData.token)
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}