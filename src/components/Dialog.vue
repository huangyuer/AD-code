<template>
<div v-if="show">
   <van-dialog
    v-model="show"
    :title="title"
    :showConfirmButton="false"
    className="dialog"
  >
    <div @click="closeBtn" v-if="isClose">
      <svg-icon iconClass="close" className="icon"></svg-icon>
    </div>
    <div class="dialog-content">{{ content }}</div>
    <slot name="confirmButton"></slot>
  </van-dialog>
  <slot name="closeButton">
  </slot>

</div>
 
</template>
<script>
export default {
  name: "Dialog",
  props: {
    isClose:{
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    closeBtn() {
      this.$emit("closeBtn")
    },
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.dialog {
  width: 4rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.08rem;
  padding: 0.48rem 0.3rem 0.6rem 0.3rem;
  box-sizing: border-box;
  .icon {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    width: 0.4rem;
    height: 0.4rem;
  }
}
@{aaa} .van-dialog__header {
  padding: 0;
  font-size: 0.28rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.dialog-content {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  padding-top: 0.12rem;
}
</style>
