<template>
  <div class="message-tip">
  <svg-icon iconClass="notice" className="icon"></svg-icon>
  <!-- <van-notice-bar :scrollable="true" class="notice-bar">
    <span v-if="ckNum>0" style="margin-right:40px">您有{{ckNum}}篇留言在审核中</span>
    <span >您有{{failNum}}篇留言未通过审核</span>
</van-notice-bar> -->

<van-swipe :autoplay="3000" :vertical="true" :height="40" class="notice-bar" :show-indicators="false">
  <van-swipe-item v-if="ckNum>0"> <span style="margin-right:40px">您有{{ckNum}}篇留言在审核中</span></van-swipe-item>
  <van-swipe-item v-if="failNum>0"><span>您有{{failNum}}篇留言未通过审核</span></van-swipe-item>
</van-swipe>
<!-- <van-notice-bar text="通知内容5" left-icon="volume-o" /> -->
   
  </div>
</template>
<script>
export default {
  name: "messageTip",
  data() {
    return {};
  },
  props:{
    ckNum:{
      type:Number,
      default:0
    },
    failNum:{
      type:Number,
      default:0
    }
  }
};
</script>
<style lang="less" scoped>
.message-tip {
  height: 0.8rem;
  margin: 0 0.32rem;
  background: #f9f9f9;
  border-radius: .08rem;
  display: flex;
  align-items: center;
  .notice-bar{
  width: 100%;
  height:100%;
  line-height: 40px;
  background: transparent;
  }
  .icon {
    width: 0.4rem;
    height: 0.36rem;
    margin: 0 0.16rem 0 0.32rem;
  }
  span {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0.16rem;
      height: 0.16rem;
      background: rgba(255, 117, 90, 1);
      border-radius: 100%;
      right: -.1.5rem;
      top: 0;
    }
  }
}
</style>
