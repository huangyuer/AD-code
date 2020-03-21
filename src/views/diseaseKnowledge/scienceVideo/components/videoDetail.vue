<template>
  <div class="wapperItemInfo" v-if="videoitem">
    <div class="header">
      <div class="title">{{ videoitem.title }}</div>
      <div class="time">{{ videoitem.date }}</div>
    </div>
    <div class="content">
      <div class="LinkItem">
        <van-image
          width="100%"
          height="2.8rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-image
          class="playicon"
          width=".48rem"
          height=".48rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="content-title">
        <div class="titlepos">视频介绍</div>
        {{ videoitem.introduction }}
      </div>
    </div>
  </div>
</template>
<script>
import "./json2";
export default {
  data() {
    return {
      videoitem: ""
    };
  },
  created() {},
  mounted() {
    if (this.$store.getters.videoList.videos != undefined) {
      this.videoitem = this.$store.getters.videoList.videos[
        this.$route.query.key
      ];
      localStorage.setItem("videoitem", JSON.stringify(this.videoitem));
      localStorage.setItem("videoitemkey", this.$route.query.key);
    } else if (
      this.$store.getters.videoList.videos == undefined &&
      localStorage.getItem("videoitemkey") != this.$route.query.key
    ) {
      this.videoitem = "";
    } else {
      this.videoitem = JSON.parse(localStorage.getItem("videoitem"));
    }
  }
};
</script>
<style lang="less" scoped>
.wapperItemInfo {
  width: 100%;
  .header {
    color: #333333;
    font-size: 0.3rem;
    text-align: center;
    font-family: "PingFangSC-Medium";
    height: 1.12rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-bottom: 2px solid #e5e5e5;
    .time {
      color: #acadaf;
      font-family: "PingFangSC-Regular";
      line-height: 0.4rem;
    }
  }
  .content {
    font-family: "PingFangSC-Regular";
    font-size: 0.28rem;
    padding: 0.32rem 0.32rem 0;
    .LinkItem {
      position: relative;
      margin-bottom: 0.54rem;
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
