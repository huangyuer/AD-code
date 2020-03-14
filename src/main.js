// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './assets/icons'
import Vant from 'vant';
import 'vant/lib/index.css';

import VueWechatTitle from 'vue-wechat-title'

Vue.use(Vant);

Vue.use(VueWechatTitle)
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        window.document.title = to.meta.title
    }
    next()

})

Vue.config.productionTip = false
    //
    // window.onresize = setHtmlFontSize;

// function setHtmlFontSize() {
//     const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//     const htmlDom = document.getElementsByTagName('html')[0];
//     htmlDom.style.fontSize = htmlWidth / 10 + 'px';
// };
// setHtmlFontSize();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})