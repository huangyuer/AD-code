import request from '@/utils/request'

export function getOpenId(data) {
  return request({
    url: '/getOpenId',
    method: 'post',
    data
  })
}



