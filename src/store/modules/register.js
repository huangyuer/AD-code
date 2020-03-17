import { getOpenId } from "@/api/register";
import {
  getToken,
  getCode,
  setCode,
  setToken,
  removeToken
} from "@/utils/auth";
// import router, { resetRouter } from '@/router'
import qs from "qs";

const state = {
  token: getToken(),
  code: getCode(),
  openId: ""
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
  getOpenId({ commit }) {
 
    return new Promise((resolve, reject) => {
      getOpenId({
        code: getCode()
      }).then(response => {
        const { data } = response;
        commit("SET_OPENID", data.openId);
        resolve();
        console.log("----ddd", response);
      }).catch(error => {
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
