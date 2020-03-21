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
