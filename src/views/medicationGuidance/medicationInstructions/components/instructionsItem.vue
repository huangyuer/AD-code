<template>
  <div>
    <div class="instructionsItem" v-for="(index, key) in articles" :key="key">
      <div class="top" @click="ClickInstructionItem(index)">
        <div class="left">
          <div class="title">
            {{ index.title }}
          </div>
          <div class="content">
            {{ index.introduction }}
          </div>
        </div>
        <div class="right">
          <van-image
            width="2rem"
            height="2rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
          />
        </div>
      </div>
      <div class="bottom">
        <span class="time">{{ index.date }}</span>
        <span class="saveicon" @click="iconcolorchange(index.isStar, key)">
          <svg-icon
            iconClass="heart"
            :class="{ 'heart-icon': true, iconactive: index.isStar }"
          />
          收藏
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  props: {
    articles: {
      type: Array,
      default: []
    }
  },
  methods: {
    iconcolorchange(isStar, key) {
      if (!isStar) {
        this.$emit("isStar", !isStar, key);
        // hearticon.classList.add("iconactive");
        Toast({
          message: "收藏成功",
          icon: "like-o"
        });
      } else {
        // hearticon.classList.remove("iconactive");
        this.$emit("isStar", !isStar, key);
        Toast({
          message: "取消收藏",
          icon: "like-o"
        });
      }
    },
    ClickInstructionItem(index) {
      this.$router.push({ path: "/DetailInfo?id=" + index._id });
    }
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>
<style lang="less">
.heart-icon {
  width: 0.32rem !important;
  height: 0.28rem !important;
  fill: #9a979b !important;
  &.iconactive {
    fill: #ff765d !important;
  }
}
.instructionsItem {
  padding: 0.24rem 0;
  margin: 0 0.32rem;
  .top {
    display: flex;
    .left {
      flex: 2;
      width: 4.68rem;
      padding-right: 0.26rem;
      .title {
        color: #050f2b;
        font-size: 0.3rem;
        text-align: left;
        font-family: "PingFangSC-Regular";
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.12rem;
        line-height: initial;
      }
      .content {
        color: #666666;
        font-size: 0.28rem;
        text-align: left;
        font-family: "PingFangSC-Regular";
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 0.45rem;
        font-weight: 400;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .bottom {
    font-size: 0.3rem;
    text-align: left;
    color: #999999;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    .time {
      font-size: 0.3rem;
      color: #acadaf;
      padding-right: 0.28rem;
      font-weight: 400;
    }
  }
  &:not(:last-child) {
    border-bottom: 2px solid #e5e5e5;
  }
}
</style>
