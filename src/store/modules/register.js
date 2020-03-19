import { getOpenIdApi,sendValidateCode,register } from "@/api/register";
import {
  getToken,
  getOpenId,
  setOpenId,
  setToken,
  removeToken
} from "@/utils/auth";
// import router, { resetRouter } from '@/router'
import qs from "qs";

const state = {
  token: getToken(),
  code: '',
  openId: getOpenId(),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CODE: (state, code) => {
    state.code = code;
  },
  SET_OPENID: (state, openId) => {
    state.openId = openId;
  }
};

const actions = {
  getOpenIdApi({ commit }) {
  const AppId = "wx23922f116d0212aa"; // 测试公众号平台的APPID，第1步那个链接里
  const { code = "" } = qs.parse(window.location.search); // 获取当前页面地址中的code参数的值
  const local = window.location.href; // 对当前地址用encodeURIComponent进行编码
  // 如果code是''，说明还没有授权，访问下面连接，用户同意授权，获取code
  if (code === "") {
    // console.log("获取微信code：", encodeURIComponent(local, "UTF-8"));
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(
      local,
      "UTF-8"
    )}&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect`;

  } else {
    return new Promise((resolve, reject) => {
      getOpenIdApi({
        code: code
      }).then(response => {
        const { data } = response;
        commit("SET_OPENID", data.openId);
        setOpenId(data.openId)
        resolve();
        console.log("----ddd", response);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  },
  sendValidateCode({ commit },phone) {
    return new Promise((resolve, reject) => {
      sendValidateCode({
        phone: phone
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  register({ commit },params) {
    console.log("-----sss",params)
    const {phone,validateCode,openId,invCode}=params
    return new Promise((resolve, reject) => {
      register({
        phone: phone,
        validateCode:validateCode,
        openId:openId,
        invCode:invCode
      }).then(response => {
        const {data} =response
        commit("SET_TOKEN", data.token);
        setToken(data.token)
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
