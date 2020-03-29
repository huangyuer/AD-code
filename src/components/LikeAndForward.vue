<!-- 
props: like:false|true,forward:false|true,isStar:false|true,starId:''
event:likeBtn,forwardBtn 
-->

<template>
  <div class="like-forward">
    <div v-if="like" @click="likeBtn">
      <svg-icon
        v-show="isLike"
        iconClass="like-btn"
        className="like-icon"
      ></svg-icon>
      <svg-icon
        v-show="!isLike"
        iconClass="likeGrey-btn"
        className="like-icon"
      ></svg-icon>
    </div>
    <div v-if="forward" @click="forwardBtn">
      <svg-icon iconClass="forward-btn" className="forward-icon"></svg-icon>
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
      this.$emit("forwardBtn");
      console.log("----1111-", wx.updateAppMessageShareData);
      //需在用户可能点击分享按钮前就先调用
      wx.updateAppMessageShareData({
        title: "sss", // 分享标题
        desc: "sss", // 分享描述
        link:
          "https://note.youdao.com/ynoteshare1/index.html?id=4e314c4cfb5c952a70a60fda7400c91d&type=note", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: "", // 分享图标
        success: function() {
          console.log("----ss");
          // 设置成功
        }
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
