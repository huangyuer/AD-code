<template>
  <div class="like-item">
    <div class="like-content">
      <div class="like-text">{{ info.title }}</div>
      <div class="like-btn">
        <div @click="likeBtn">
          <svg-icon iconClass="heart" className="icon" v-if="info.isHeart"></svg-icon>
          <svg-icon iconClass="heart" className="grey" v-else></svg-icon>
          <span>收藏</span>
        </div>
      </div>
    </div>
    <div class="like-time">{{ info.time }}</div>
  </div>
</template>
<script>
export default {
  name: "LikeItem",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    likeBtn() {
      this.$emit("likeBtn",this.info);
    }
  }
};
</script>
<style lang="less" scoped>
.like-item {
  height: 1.32rem;
  border-top: 0.02rem solid rgba(243, 243, 243, 1);

  border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
  position: relative;
  padding: 0 0.32rem;
margin-bottom: 0.2rem;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    content: "";
    /* height: 8px; */
    width: 0.08rem;
    height: 0.8rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 4px;
  }
  .like-content {
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    .like-text {
      font-size: 0.3rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(5, 15, 43, 1);
      height: 0.8rem;
      line-height: 0.8rem;
    }
    .like-btn {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .icon {
        fill: #ff7559 !important;
        width: 0.32rem;
        height: 0.28rem;
      }
      .grey{
          fill:#9A979B!important;
               width: 0.32rem;
        height: 0.28rem;
      }
      span {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .like-time {
    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(172, 173, 175, 1);
    line-height: 1;
  }
}
</style>
