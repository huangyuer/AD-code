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

const codeKey = 'Admin-codeId'
export function getCode() {
  return Cookies.get(codeKey)
}

export function setCode(code) {
  return Cookies.set(codeKey, code)
}

export function removeCode() {
  return Cookies.remove(codeKey)
}



export function GetQueryString(name){
  var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i');
  var r=window.location.search.substr(1).match(reg);
  if(r!=null){
      return unescape(r[2]);
  }
  return null;
}
//截取code
export function GetUrlParame(parameName){
    var params=window.location.search
    if(params.indexOf(parameName)>-1){
        var paramValue=''
        paramValue=params.substring(params.indexOf(parameName),params.length)
        if(paramValue.indexOf('&'>-1)){
            paramValue=paramValue.substring(0,paramValue.indexOf("&"))
            paramValue=paramValue.replace(parameName+'=','')
            return paramValue
        }
        return ''
    }
}