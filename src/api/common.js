import request from '@/utils/request'
export function getMenuSelect(data) {
    return request({
        url: '/getMenuSelect',
        method: 'post',
        data
    })
}
export function getArticles(data) {
    return request({
        url: '/getArticles',
        method: 'post',
        data
    })
}
export function getArticle(data) {
    return request({
        url: '/getArticle',
        method: 'post',
        data
    })
}
export function star(data) {
    return request({
        url: '/star',
        method: 'post',
        data
    })
}
export function unStar(data) {
    return request({
        url: '/unStar',
        method: 'post',
        data
    })
}
export function getShareUrl(data) {
    return request({
        url: '/getShareUrl',
        method: 'post',
        data
    })
}
export function addOutPageLog(data) {
    return request({
        url: '/addOutPageLog',
        method: 'post',
        data
    })
}
export function getSignature(data) {
    return request({
        url: '/getSignature',
        method: 'post',
        data
    })
}
export function getTempHtml(data) {
    return request({
        url: '/getTempHtml',
        method: 'post',
        data
    })
}