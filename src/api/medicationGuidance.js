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
export function getDoctors(data) {
  return request({
    url: '/getDoctors',
    method: 'post',
    data
  })
}
