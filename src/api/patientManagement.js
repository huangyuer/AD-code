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
export function getAnswerLogs(data) {
  return request({
    url: '/getAnswerLogs',
    method: 'post',
    data
  })
}
//获取地址
export function getMyAddress(data) {
  return request({
    url: '/getMyAddress',
    method: 'post',
    data
  })
}
//更改个人信息
export function upMyInfo(data) {
  return request({
    url: '/upMyInfo',
    method: 'post',
    data
  })
}
//更新收货地址
export function upMyAddress(data) {
  return request({
    url: '/upMyAddress',
    method: 'post',
    data
  })
}
//注销账号
export function delMyInfo(data) {
  return request({
    url: '/delMyInfo',
    method: 'post',
    data
  })
}
//获取商品列表
export function getGoods(data) {
  return request({
    url: '/getGoods',
    method: 'post',
    data
  })
}
//兑换商品
export function exchangeGoods(data) {
  return request({
    url: '/exchangeGoods',
    method: 'post',
    data
  })
}
//获取兑换的列表
export function getExchangeLogs(data) {
  return request({
    url: '/getExchangeLogs',
    method: 'post',
    data
  })
}
// 查看兑换详情
export function getExchangeDetail(data) {
  return request({
    url: '/getExchangeDetail',
    method: 'post',
    data
  })
}
//获取任务列表
export function getTasks(data) {
  return request({
    url: '/getTasks',
    method: 'post',
    data
  })
}
//获取我的积分
export function getMyScore(data) {
  return request({
    url: '/getMyScore',
    method: 'post',
    data
  })
}
