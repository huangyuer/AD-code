import request from '@/utils/request'
export function getMyLocation(data) {
    return request({
        url: '/getMyLocation',
        method: 'post',
        data
    })
}
export function getNearHospitals(data) {
    return request({
        url: '/getNearHospitals',
        method: 'post',
        data
    })
}
export function getHospital(data) {
    return request({
        url: '/getHospital',
        method: 'post',
        data
    })
}
export function getDoctors(data) {
    return request({
        url: '/getDoctors',
        method: 'post',
        data
    })
}
export function hospitalSign(data) {
    return request({
        url: '/hospitalSign',
        method: 'post',
        data
    })
}
export function hospSignCheck(data) {
    return request({
        url: '/hospSignCheck',
        method: 'post',
        data
    })
}
export function searchAddress(data) {
    return request({
        url: '/searchAddress',
        method: 'post',
        data
    })
}