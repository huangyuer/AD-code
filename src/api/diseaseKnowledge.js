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
