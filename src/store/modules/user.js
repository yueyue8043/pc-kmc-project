import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, postUserInfo } from '@/api/user'
const state = {
    token: getToken(),
    userInfo: {},
    rowData: {},
}

const mutations = {
    setToken(state, token) {
        state.token = token
        setToken(token)
    },
    removeToken(state) {
        state.token = null
        removeToken()
    },
    setUserInfo(state, data) {
        state.userInfo = data
    },
    //当前送货信息
    setRowData(state, data) {
        state.rowData = data
    }
}
const actions = {
    async login(context, data) {
        const loginData = await login(data)
        if(loginData.status !== 200) {
            this.$message.error(loginData.message)
        }
        context.commit('setToken', loginData.token)
    },
    async getUserInfo(context, data) {
        const result = await getUserInfo()
        context.commit('setUserInfo', result.data)
    },

    async postUserInfo(context, data) {
        const result = await postUserInfo(data)
        // console.log(result)
        // context.commit('setUserInfo', result.data)
    },
    logOut(context) {
        context.commit('removeToken')
        context.commit('setUserInfo', {})
    }

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}