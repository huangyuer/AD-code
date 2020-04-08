<!-- 
props: like:false|true,forward:false|true,isStar:false|true,starId:''
event:likeBtn,forwardBtn 
-->

<template>
  <div class="like-forward">
    <div v-if="like" @click="likeBtn">
      <svg-icon v-show="isLike" iconClass="like-btn" class="like-icon"></svg-icon>
      <svg-icon v-show="!isLike" iconClass="likeGrey-btn" class="like-icon"></svg-icon>
    </div>
    <div v-if="forward" @click="forwardBtn">
      <svg-icon iconClass="forward-btn" class="forward-icon"></svg-icon>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "LikeAndForward",
  props: {
    like: {
      type: Boolean,
      default: false
    },
    forward: {
      type: Boolean,
      default: false
    },
    isStar: {
      type: Boolean,
      default: true
    },
    starId: {
      type: String,
      default: ""
    },
    path: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isLike: this.isStar
    };
  },
  created() {
    wx.ready(function() {});
  },
  methods: {
    likeBtn() {
      if (!this.isLike) {
        let params = {
          menu: this.$route.meta.title,
          starId: this.starId
        };
        this.$store.dispatch("common/star", params).then(res => {
          this.isLike = true;
          Toast({
            message: res,
            icon: "like-o"
          });
        });
      } else {
        let params = { starId: this.starId };
        this.$store.dispatch("common/unStar", params).then(res => {
          this.isLike = false;
          Toast({
            message: res,
            icon: "like-o"
          });
        });
      }
      this.$emit("likeBtn");
    },
    forwardBtn() {
      this.getShareUrl();
      this.$emit("forwardBtn");
    },
    getShareUrl() {
      if (this.path.charAt(0) == "/") var string = this.path.substr(1);
      var form = {
        url: string,
        id: this.starId
      };
      this.$store
        .dispatch("common/getShareUrl", form)
        .then(data => {
          this.getSignature(data.url);
        })
        .catch(e => {
          Toast(e);
        });
    },
    getSignature(url) {
      this.$store
        .dispatch("common/getSignature", url)
        .then(response => {
          console.log("data", response);
          wx.config({
            debug: true,
            appId: "wx23922f116d0212aa",
            timestamp: response.data.timestamp,
            nonceStr: response.data.nonce_str,
            signature: response.data.signature,
            jsApiList: [
              "checkJsApi",
              "updateTimelineShareData",
              "updateAppMessageShareData",
              "onMenuShareWeibo",
              "onMenuShareQZone"
            ] // 必填，需要使用的JS接口列表
          });

          wx.ready(function() {
            var obj = {
              title: this.$route.meta.title, // 标题
              desc: this.$route.meta.title, // 说明文字
              link: url, // 链接
              imgUrl:
                "https://seats-1257313859.cos.ap-beijing.myqcloud.com/ustar/images/kickoff.png" // 分享的图标
            };
            wx.checkJsApi({
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData",
                "onMenuShareQZone",
                "onMenuShareWeibo"
              ] // 需要检测的JS接口列表，所有JS接口列表见附录2,
            });

            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.updateAppMessageShareData(obj);
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.updateTimelineShareData(obj);
            // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareWeibo(obj);
            // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
            wx.onMenuShareQZone(obj);
          });
          wx.error(function(res) {
            console.log("error", res);
          });
          wx.success(function(res) {
            console.log("success", res);
          });
        })
        .catch(e => {
          Toast(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.like-forward {
  .like-icon {
    position: fixed;
    top: 7.5rem;
    right: 0.08rem;
    width: 1.36rem !important;
    height: 1.36rem !important;
    opacity: 0.9;
  }
  .forward-icon {
    position: fixed;
    top: 8.78rem;
    right: 0.32rem;
    width: 0.88rem !important;
    height: 0.88rem !important;
  }
}
</style>
