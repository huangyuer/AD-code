import axios from "axios";
// import { MessageBox, Message } from 'element-ui'
import store from "@/store";
import router from "../router";
import {
  getToken,
  getOpenId,
  setToken
} from "@/utils/auth";
import {
  Toast
} from "vant";


// create an axios instance
const service = axios.create({
  baseURL: "http://ad.kurite.com/api/v1/", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["token"] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log("---------", error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log("ssss", res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 1) {
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (!getToken()) {
        // setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBEYXRlIjoiMjAyMC0wNC0xMCAwNTo0MDoyMSIsIm5hbWUiOiIiLCJyb2xlIjowLCJ1c2VySWQiOiI1ZTc4MmE2NGY0YzBkMTZmZjMwMjNmYzMifQ.j3Qks5pIBy3nmSBMZJTX6XAcXCZ6d92JC-8_AX6Il50')
        // location.reload()
        // to re-login

        if (getOpenId()) {
          store.dispatch("register/login").then(() => {
            // location.reload();
          })
        }
        //  else {
        //   store.dispatch('register/getOpenIdApi').then(() => {
        //     store.dispatch("register/login").then(() => {
        //       // location.reload();
        //     });

        //   })
        // }
      }
      // Toast(res.msg);
       Toast({
            message: res.msg,
            position: "top"
          });
      return Promise.reject(res.msg);
    } else {
      return res;
    }
  },
  error => {
    console.log("err2222", getToken());
    if (error.response.status == 401) {
      if (getOpenId()) {
        store.dispatch("register/login").then(() => {
          // location.reload();
        });

      }
      //  else {
      //   store.dispatch('register/getOpenIdApi').then(() => {
      //     store.dispatch("register/login").then(() => {
      //       // location.reload();
      //     });
      //   })
      // }
    }

    console.log("errzzzzzzz" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject()
    // return Promise.reject("连接超时");
  }
);

export default service;
