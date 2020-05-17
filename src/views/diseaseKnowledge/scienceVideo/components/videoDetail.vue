<template>
  <div class="wapperItemInfo" v-if="Object.keys(videoitem).length != 0">
    <div class="header">
      <div class="title">{{ videoitem.title }}</div>
      <div class="time">{{ videoitem.date }}</div>
    </div>
    <div class="content">
      <div class="LinkItem" @click="isIframe">
        <div ref="container" class="container" v-if="!isvideo">
          <!-- <div v-html="tt"></div> -->
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="
              videoitem.coverImg != []
                ? videoitem.coverImg[0].httpUrl
                : ''
            "
          />
        </div>
        <video
          v-else
          :src="videoitem.video[0].httpUrl"
          controls="controls"
          autoplay
          style
        >您的浏览器不支持 video 标签。</video>
        <van-image
          class="playicon"
          width=".48rem"
          height=".48rem"
          fit="cover"
          :src="require('../../../../assets/play.png')"
        />
      </div>
      <div class="content-title">
        <div class="titlepos">视频介绍</div>
        {{ videoitem.introduction }}
      </div>
    </div>
    <like-and-forward
      v-if="flag"
      :like="this.$route.query.like"
      :path="this.$route.path"
      :forward="this.$route.query.forward"
      :starId="this.$route.query.id"
      :isStar="this.$route.query.isStar"
      @likeBtn="likeBtn"
      @forwardBtn="forwardBtn"
    ></like-and-forward>
    <van-over-lay :show="showoverlay" @isShowOverlay="isShowOverlay"></van-over-lay>
    <div class="more-btn" v-if="!flag" @click="register">查看更多内容，请点击注册</div>
  </div>
</template>
<script>
import "./json2";
import { Toast } from "vant";
import LikeAndForward from "@/components/LikeAndForward";
import VanOverLay from "@/components/overlay";
import { getToken } from "@/utils/auth";
export default {
  components: { LikeAndForward, VanOverLay },
  beforeRouteLeave(to, form, next) {
    next();
    this.addOutPageLog();
  },
  data() {
    return {
      videoitem: {},
      isvideo: false,
      iframe: "",
      showoverlay: false,
      flag: true
    };
  },
  created() {
    if (getToken()) this.flag = true;
    else this.flag = false;
  },
  mounted() {
    this.getVideo();
  },
  methods: {
    register() {
      this.$router.push({
        path: "/register"
      });
    },
    addOutPageLog() {
      this.$store
        .dispatch("common/addOutPageLog", "科普视频")
        .then(response => {})
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    },
    getVideo() {
      this.$store
        .dispatch("diseaseKnowledge/getVideo", this.$route.query.id)
        .then(response => {
          if (response.code == 1) {
            Toast(response.msg);
            return;
          }
          this.videoitem = response.data.video;
          this.$route.meta.title = this.videoitem.title;
          this.iframe = this.videoitem.video[0].httpUrl;
        })
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    },
    isIframe() {
      if (this.iframe.indexOf("iframe") != -1) {
        this.isvideo = false;
        document.getElementsByClassName("container")[0].innerHTML = this.iframe;
        document.getElementsByClassName("playicon")[0].style.display = "none";
      } else {
        document.getElementsByClassName("playicon")[0].style.display = "none";
        this.isvideo = true;
      }
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
      width: 80%;
    }
    .time {
      color: #acadaf;
      font-family: "PingFangSC-Regular";
      line-height: 0.4rem;
      margin-top: 0.08rem;
      font-size: 0.28rem;
    }
  }
  .content {
    font-family: "PingFangSC-Regular";
    font-size: 0.28rem;
    padding: 0.32rem 0.32rem 0;
    .LinkItem {
      position: relative;
      margin-bottom: 0.54rem;
      video {
        width: 100%;
        height: 3.8rem;
        object-fit: cover;
      }
      .container {
        height: 3.8rem;
      }
      .playicon {
        position: absolute;
        top: calc(50% - 0.24rem);
        left: calc(50% - 0.24rem);
      }
    }
    .content-title {
      border: 0.02rem solid rgba(229, 229, 229, 1);
      padding: 0.28rem 0.25rem 0.2rem;
      box-sizing: border-box;
      position: relative;
      height: auto;
      word-wrap: break-word;
      .titlepos {
        position: absolute;
        top: -0.25rem;
        left: 0.28rem;
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(0, 153, 102, 1);
        line-height: initial;
        background: #ffffff;
        padding: 0 0.1rem;
      }
    }
  }
}
</style>
