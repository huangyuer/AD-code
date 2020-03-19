import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const OpenIdKey = 'Admin-OpenId'

export function getOpenId() {
  return Cookies.get(OpenIdKey)
}

export function setOpenId(OpenId) {
  return Cookies.set(OpenIdKey, OpenId)
}

export function removeOpenId() {
  return Cookies.remove(OpenIdKey)
}