import request from '@/utils/request'
export function getVideos(data) {
  return request({
    url: '/getVideos',
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
