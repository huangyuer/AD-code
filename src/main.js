// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import "./assets/icons";
import Vant from "vant";
import "vant/lib/index.css";
import Axios from "axios";

import VueWechatTitle from "vue-wechat-title";
import qs from "qs";
Vue.prototype.$qs = qs;

import "./assets/font_1686774_85lo9chzwmt/iconfont.css";
import { Icon } from "vant";
import { setOpenId, getOpenId,removeOpenId,setToken } from "@/utils/auth";
Vue.use(Icon);

Vue.use(Vant);

Vue.use(VueWechatTitle);
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = "/api";
Axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title;
  }
  next();
});

Vue.config.productionTip = false;


  // const AppId = "wx23922f116d0212aa"; // 测试公众号平台的APPID，第1步那个链接里
  // const { code = "" } = qs.parse(window.location.search); // 获取当前页面地址中的code参数的值
  // const local = window.location.href; // 对当前地址用encodeURIComponent进行编码

  // // 如果code是''，说明还没有授权，访问下面连接，用户同意授权，获取code
  // if (code === "") {
  //   // console.log("获取微信code：", encodeURIComponent(local, "UTF-8"));
  //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(
  //     local,
  //     "UTF-8"
  //   )}&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect`;
  //   removeOpenId()
  //   setOpenId(code);   
  // } else {
  //   removeOpenId()
  //   setOpenId(code);
  // }

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});

if(!getOpenId()){
  setOpenId('omJO-vqXceLy5Qrw9g7kzGmTtQz4')
  setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBEYXRlIjoiMjAyMC0wMy0yNyAwNjozMjowMiIsIm5hbWUiOiIiLCJyb2xlIjowLCJ1c2VySWQiOiI1ZTcyMzBlMmY0YzBkMTRhOTE0NTk3OWUifQ.VHgVgG_nnf0o6QDaF2TZ-bZb4BewqAyLJwiUR15OmOI')
  // store.dispatch('register/getOpenIdApi')
}else{
  store.commit('register/SET_OPENID',getOpenId())

}