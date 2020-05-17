<template>
  <div>
    <div class="wapperItemInfo" v-if="Object.keys(article).length > 0 || !vloading">
      <div class="header">
        <div class="title">{{ this.article.title }}</div>
        <div class="time">{{ this.article.date }}</div>
      </div>
      <div class="content">
        <!-- <van-image  /> -->
        <div class="ql-editor" v-html="this.article.contentHtml">{{ this.article.contentHtml }}</div>
      </div>
      <like-and-forward
        v-if="flag"
        :like="this.$route.query.like"
        :forward="this.$route.query.forward"
        :starId="this.$route.query.id"
        :isStar="this.$route.query.isStar"
        :path="this.$route.path"
        @likeBtn="likeBtn"
        @forwardBtn="forwardBtn"
      ></like-and-forward>
      <van-over-lay :show="showoverlay" @isShowOverlay="isShowOverlay"></van-over-lay>
      <div class="more-btn" v-if="!flag" @click="register">查看更多内容，请点击注册</div>
    </div>
    <vant-loading v-else></vant-loading>
    <van-image-preview v-model="showImgPre" :images="images" @change="onChange">
      <template v-slot:indexImg>{{ indexImg }}</template>
    </van-image-preview>
  </div>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
import VanOverLay from "@/components/overlay";
import VantLoading from "@/components//loading";
import { Toast } from "vant";
import { getToken } from "@/utils/auth";
import { indexImg } from "./clickImg";
export default {
  name: "DiseaseDetail",
  components: { LikeAndForward, VanOverLay, VantLoading },
  beforeRouteLeave(to, form, next) {
    next();
    this.addOutPageLog();
  },
  beforeRouteEnter(to, from, next) {
    console.log("to", to.meta.title);
    window.document.title = to.meta.title;
    next(vm => {
      // window.document.title = this.article.title;
    });
  },
  data() {
    return {
      id: "",
      article: "",
      showoverlay: false,
      flag: true,
      vloading: true,
      showImgPre: false,
      indexImg: 0,
      images: []
    };
  },
  created() {
    if (getToken()) this.flag = true;
    else this.flag = false;
    this.$store.dispatch("diseaseKnowledge/getLvMsgUrl").then(response => {
      console.log("data", window.location.href);
      console.log("data22", response.url);
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.getSignature(response.url);
      } else {
        this.getSignature(window.location.href);
      }
    });
    this.$store
      .dispatch("common/getArticle", this.$route.query.id)
      .then(data => {
        this.vloading = false;
        this.article = this.$store.getters.articleDetail.article;
        this.$route.meta.title = this.article.title;
      })
      .catch(e => {
        console.log("=====ss", e);
        // if (e) {
        //   Toast(e);
        // }
      });
  },
  mounted() {
    // var imglist = document.getElementsByTagName("img");
    // console.log("imglist[i]", imglist, this.images);
    // // window.addEventListener("load", function() {
    // for (var i = 0; i < imglist.length; i++) {
    //   var _this = this;
    //   _this.images.push(imglist[i].src);
    //   console.log("imglist[i]", imglist, this.images);
    //   (function(i) {
    //     imglist[i].onclick = function() {
    //       _this.showImgPre = true;
    //       _this.indexImg = i;
    //       console.log("index", i);
    //     };
    //   })(i);
    // }
    // // });
  },
  methods: {
    getSignature(url) {
      this.$store
        .dispatch("common/getSignature", url)
        .then(response => {
          console.log("data111111111111111111", response, this.article.title);
          var _this = this;

          wx.config({
            debug: false,
            appId: "wx8ef854b5878d3b8d",
            timestamp: response.data.timestamp,
            nonceStr: response.data.nonce_str,
            signature: response.data.signature,
            jsApiList: [
              "checkJsApi",
              "updateTimelineShareData",
              "updateAppMessageShareData"
            ]
          });
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: [
                "updateTimelineShareData",
                "updateAppMessageShareData"
              ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                console.log("getsuccess");
              },
              fail() {
                console.log("getfail");
              }
            });
            wx.updateAppMessageShareData({
              title: _this.article.title, // 分享标题
              desc: "", // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "", // 分享图标
              success: function() {
                // 设置成功
              }
            });
            wx.updateTimelineShareData({
              title: _this.article.title, // 分享标题
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "", // 分享图标
              success: function() {
                // 设置成功
              }
            });
          });
          wx.error(function(res) {
            console.log("error", res);
          });
          wx.success(function(res) {
            console.log("success", res);
          });
        })
        .catch(e => {});
    },
    onChange(index) {
      this.indexImg = index;
    },
    register() {
      this.$router.push({
        path: "/register"
      });
    },
    addOutPageLog() {
      this.$store
        .dispatch("common/addOutPageLog", this.$route.meta.title)
        .then(response => {})
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    },
    likeBtn() {
      console.log("-----d");
    },
    forwardBtn() {
      console.log("-----dss");
      this.showoverlay = true;
    },
    isShowOverlay() {
      this.showoverlay = false;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.wapperItemInfo {
  width: 100%;
  height: 100%;
  .header {
    color: #333333;
    font-size: 0.3rem;
    text-align: center;
    font-family: "PingFangSC-Medium";
    // height: 1.12rem;
    padding: 0.4rem 0 0.18rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-bottom: 0.02rem solid #e5e5e5;
    .title {
      font-size: 0.32rem;
      color: #009966;
    }
    .time {
      color: #acadaf;
      font-family: "PingFangSC-Regular";
      line-height: 0.4rem;
      font-size: 0.28rem;
      margin-top: 0.1rem;
    }
  }
  .content {
    font-family: "PingFangSC-Regular";
    font-size: 0.28rem;
    padding: 0.32rem 0.32rem;
    @{aaa}.ql-editor {
      img {
        width: 100% !important;
      }
    }
  }
  .more-btn {
    width: 6.4rem;
    height: 0.8rem;
    background: rgba(0, 157, 117, 1);
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 153, 102, 0.5);
    border-radius: 0.4rem;
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
    text-align: center;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0.8rem;
  }
}
</style>
