import {
  getOpenIdApi,
  sendValidateCode,
  register,
  login
} from "@/api/register";
import {
  getToken,
  getOpenId,
  setOpenId,
  setToken,
  removeToken,
  setCode,
  getCode,
  removeCode,
  GetQueryString,
  GetUrlParame
} from "@/utils/auth";
import router from "@/router";
// import router, { resetRouter } from '@/router'
import qs from "qs";

const state = {
  token: getToken(),
  code: "",
  openId: getOpenId()
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
    if (!GetQueryString("code")&&!getCode()) {
      const AppId = "wx91701d2b2f9ed162"; // 测试公众号平台的APPID，第1步那个链接里
     
      // const code=window.location.search; // 获取当前页面地址中的code参数的值
      const local = window.location.href; // 对当前地址用encodeURIComponent进行编码
      // 如果code是''，说明还没有授权，访问下面连接，用户同意授权，获取code
     
        // console.log("获取微信code：", encodeURIComponent(local, "UTF-8"));
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(
          local,
          "UTF-8"
        )}&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect`;
      } 
    else {
      let code=GetUrlParame('code')
      setCode(code)
      console.log("code", code);
      return new Promise((resolve, reject) => {
        getOpenIdApi({
          code: GetUrlParame('code')
        })
          .then(response => {
            const { data } = response;
            commit("SET_OPENID", data.openId);
            setOpenId(data.openId);
            resolve();
            console.log("----ddd", response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  sendValidateCode({ commit }, phone) {
    return new Promise((resolve, reject) => {
      sendValidateCode({
        phone: phone
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  register({ commit }, params) {
    console.log("-----sss", params);
    const { phone, validateCode,invCode } = params;
    return new Promise((resolve, reject) => {
      register({
        phone: phone,
        validateCode: validateCode,
        openId: getOpenId(),
        invCode: invCode
      })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
  login({ commit }) {
    if(!getOpenId())return
    return new Promise((resolve, reject) => {
      login({
        openId: getOpenId()
      })
        .then(response => {
          const { data } = response;
          if (!data.token)
            router.push({
              path: "/register"
            });
          else {
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            location.reload();
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  login1({ commit }) {
    if(!getOpenId())return
    return new Promise((resolve, reject) => {
      login({
        openId: getOpenId()
      })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
