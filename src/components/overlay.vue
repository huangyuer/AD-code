<template>
  <van-overlay :show="show" @click="isShow()">
    <div class="wrapper" @click.stop>
      <div class="vanimage">
        <svg-icon iconClass="jiantou" class="icon"></svg-icon>
      </div>
      <div class="sharetitle">请点击右上角把它发送给好友或分享到朋友圈</div>
    </div>
  </van-overlay>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
export default {
  name: "vanoverlay",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isShow() {
      this.$emit("isShowOverlay");
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  //   display: flex;
  // align-items: center;
  // justify-content: center;
  //   height: 100%;
  .vanimage {
    width: 2rem;
    height: 1.66rem;
    position: absolute;
    right: 0.48rem;
    top: 0.46rem;
  }
  .sharetitle {
    width: 2.8rem;
    height: 1.68rem;
    color: #ffffff;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    position: absolute;
    right: 1.4rem;
    top: 2.5rem;
  }
}
.svg-icon {
  width: 2rem !important;
  height: 1.66rem !important;
}
</style>