import request from '../utils/requirest'

export function login(data) {
   return request({
       url: '/api/login',
       method: 'post',
       data,
    })
}