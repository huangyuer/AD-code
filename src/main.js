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
import {
    Toast
} from "vant";
import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
import VueWechatTitle from "vue-wechat-title";
import qs from "qs";
Vue.prototype.$qs = qs;

import "./assets/font_1686774_85lo9chzwmt/iconfont.css";
import {
    Icon
} from "vant";
import {
    setOpenId,
    getOpenId,
    getToken,
    removeOpenId,
    setToken
} from "@/utils/auth";
Vue.use(Icon);

Vue.use(Vant);

Vue.use(VueWechatTitle);
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = "/api";
Axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    // console.log("--------1");
    // setOpenId("oQEE8wgh7QVhrNi4f6frjxI_qiAw");
    window.sessionStorage.setItem('firstUrl', window.location.href)
    let params = {
        local: window.location.host + to.path
    }
    if (to.meta.title) {
        window.document.title = to.meta.title;
    }
    if (Object.is(to.name, "Register")) {
        if (getOpenId() || Object.is(from.name, "DiseaseDetail") ||
            Object.is(from.name, "PatientDetail") ||
            Object.is(from.name, "videoDetail")) {
            console.log("opendID---1", getOpenId());
            next();
            // return;
        } else {
            store.dispatch("register/getOpenIdApi", params).then(() => {
                console.log("opendID---2", getOpenId());
                next();
                // return;
            });
        }
    } else {
        // next();
        if (getOpenId()) {
            store.dispatch("register/login1").then(res => {
                if (res.token) {
                    next();
                } else {
                    if (
                        Object.is(to.name, "DiseaseDetail") ||
                        Object.is(to.name, "PatientDetail") ||
                        Object.is(to.name, "videoDetail")
                    ) {
                        console.log("Detail1");
                        next();
                    } else {
                        router.push({
                            name: "Register"
                        });
                        return;
                    }
                }
            });
        } else {
            if (
                Object.is(to.name, "DiseaseDetail") ||
                Object.is(to.name, "PatientDetail") ||
                Object.is(to.name, "videoDetail")
            ) {
                store.dispatch("register/getOpenIdApi", params).then(() => {
                    next();
                    console.log("Detail2");
                });
            } else {
                // setOpenId('oiqI3whGt9CxL7N-oXeUdGR_6JZ4')
                store.dispatch("register/getOpenIdApi", params).then(() => {
                    store.dispatch("register/login1").then(res => {
                        if (res.token) {
                            next();
                        } else {
                            router.push({
                                name: "Register"
                            });
                            return;
                        }
                    });
                });
            }
        }
    }
    //   if(getOpenId()){
    //     store.dispatch("register/login1").then((res) => {
    //        if(res.token){
    //         next();
    //        }else{
    //         // if(Object.is(to.name,'Register')) {
    //        }
    //     });
    //   }

    //   if(getOpenId()) {
    //     next();
    //   }else {
    //     // router.push({name:'Register'})
    //   }

    // if(!getToken()){
    //     // console.log("======ss")
    //     next({ path: '/register' })
    // }else{
    // next();

    // }
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

// setOpenId('oiqI3whHXikr12gjRdg2Ynh4yYJM')
// if (!getOpenId()) {
//   store.dispatch('register/getOpenIdApi').then(() => {
//     store.dispatch("register/login").then(() => {

//     });
//   })
// }

// setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBEYXRlIjoiMjAyMC0wNC0xNyAwNjo0MTo0MyIsIm5hbWUiOiIiLCJyb2xlIjowLCJ1c2VySWQiOiI1ZThkZTJhN2Y0YzBkMTE4MWI0N2VjMWYifQ.3An5uKzojYcIPv1f2u7noU9mXg6SCPv_aJzd8jrA2zc')

// if (!getOpenId()) {
//     // setOpenId('omJO-vqXceLy5Qrw9g7kzGmTtQz4')
//     // setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBEYXRlIjoiMjAyMC0wNC0xMCAwNTo0MDoyMSIsIm5hbWUiOiIiLCJyb2xlIjowLCJ1c2VySWQiOiI1ZTc4MmE2NGY0YzBkMTZmZjMwMjNmYzMifQ.j3Qks5pIBy3nmSBMZJTX6XAcXCZ6d92JC-8_AX6Il50')
//     store.dispatch('register/getOpenIdApi').then(()=>{
//         store.dispatch("register/login");
//     })
//     // location.reload();

// } else {
//     store.dispatch("register/login");
//     // location.reload();
// }

// if (!getToken()) {
//     store.dispatch("register/login");
//     location.reload();
// }