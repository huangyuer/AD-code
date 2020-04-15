import request from '@/utils/request'
export function getVideos(data) {
    return request({
        url: '/getVideos',
        method: 'post',
        data
    })
}
// 获取视频详情
export function getVideo(data) {
    return request({
        url: '/getVideo',
        method: 'post',
        data
    })
}
export function upVideoClickNum(data) {
    return request({
        url: '/upVideoClickNum',
        method: 'post',
        data
    })
}
export function getLive(data) {
    return request({
        url: '/getLive',
        method: 'post',
        data
    })
}

export function uploadFile(data) {
    return request({
        url: '/uploadFile',
        method: 'post',
        data
    })
}
export function getLeaveMsgList(data) {
    return request({
        url: '/getLeaveMsgList',
        method: 'post',
        data
    })
}

export function addLeaveMsg(data) {
    return request({
        url: '/addLeaveMsg',
        method: 'post',
        data
    })
}

export function delLeaveMsg(data) {
    return request({
        url: '/delLeaveMsg',
        method: 'post',
        data
    })
}

export function getLvMsgSelect() {
    return request({
        url: '/getLvMsgSelect',
        method: 'post'
    })
}

export function uploadBase64File() {
    return request({
        url: '/uploadBase64File',
        method: 'post'
    })
}