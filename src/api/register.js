import request from '@/utils/request'

export function getOpenIdApi(data) {
  return request({
    url: '/getOpenId',
    method: 'post',
    data
  })
}

export function sendValidateCode(data) {
  return request({
    url: '/sendValidateCode',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}



