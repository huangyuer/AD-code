<template>
  <div class="message-tip">
    <svg-icon iconClass="notice" class="icon"></svg-icon>
    <span v-if="ckNum>0">您有{{ckNum}}篇留言在审核中</span>
    <span v-else>您有{{failNum}}篇留言未通过审核</span>
  </div>
</template>
<script>
export default {
  name: "messageTip",
  data() {
    return {};
  },
  props: {
    ckNum: {
      type: Number,
      default: 0
    },
    failNum: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="less" scoped>
.message-tip {
  height: 0.8rem;
  margin: 0 0.32rem;
  background: #f9f9f9;
  border-radius: 0.08rem;
  display: flex;
  align-items: center;
  .icon {
    width: 0.4rem;
    height: 0.36rem;
    margin: 0 0.16rem 0 0.32rem;
  }
  span {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0.16rem;
      height: 0.16rem;
      background: rgba(255, 117, 90, 1);
      border-radius: 100%;
    }
  }
}
</style>
