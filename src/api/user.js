import request from '../utils/requirest'

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data,
    })
}

export function register(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data,
    })
}


export function getUserInfo() {
    return request({
        url: '/user/getUserInfo',
        method: 'get',

    })

}

export function postUserInfo(data) {
    return request({
        url: '/user/postUserInfo',
        method: 'post',
        data,
   
    })
}


export function postChangeUserPassWord(data) {
    return request({
        url: '/api/postChangeUserPassWord',
        method: 'post',
        data,
   
    })
}