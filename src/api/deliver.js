import request from '../utils/requirest'

//新建送货流程
export function postNewProcess(data) {
    return request({
        url: '/deliver/postNewProcess',
        method: 'post',
        data,
    })
}

//获取送货订单列表
export function getOrderList(params) {
    return request({
        url:'/deliver/getOrderList',
        params
    })
}

//填写出库信息
export function postWarehouseInfo(data) {
    return request({
        url: '/deliver/postWarehouseInfo',
        method: 'post',
        data,
    })
}

//中止送货流程
export function postCloseProcess(data) {
    return request({
        url: '/deliver/postCloseProcess',
        method: 'post',
        data,
    })
}

//填写回单信息
export function postReplyInfo(data) {
    return request({
        url: '/deliver/postReplyInfo',
        method: 'post',
        data,
    })
}


//获取STS
export function getSTSToken() {
    return request({
        url:'/deliver/getSTSToken',
 
    })
}

//提交回单照片
export function postReceiptPhotos(data) {
    return request({
        url: '/deliver/postReceiptPhotos',
        method: 'post',
        data,
    })
}

//关闭订单
export function postCloseOrder(data) {
    return request({
        url: '/deliver/postCloseOrder',
        method: 'post',
        data,
    })
}