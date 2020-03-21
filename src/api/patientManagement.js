import request from '@/utils/request'
export function getMyInfo(data) {
  return request({
    url: '/getMyInfo',
    method: 'post',
    data
  })
}
export function getMedications(data) {
  return request({
    url: '/getMedications',
    method: 'post',
    data
  })
}
//获取我的收藏分类
export function getStarMenus(data) {
  return request({
    url: '/getStarMenus',
    method: 'post',
    data
  })
}
//拿到我的收藏
export function getMyStars(data) {
  return request({
    url: '/getMyStars',
    method: 'post',
    data
  })
}
//自我评估
export function getQuestions(data) {
  return request({
    url: '/getQuestions',
    method: 'post',
    data
  })
}
//自我评估提交问卷
export function submitAnswer(data) {
  return request({
    url: '/submitAnswer',
    method: 'post',
    data
  })
}
