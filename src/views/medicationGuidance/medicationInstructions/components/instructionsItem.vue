<template>
  <div>
    <div class="instructionsItem" v-for="(index, key) in articles" :key="key">
      <div class="top" @click="ClickInstructionItem(index)">
        <div class="left">
          <div class="title">{{ index.title }}</div>
          <div class="content">{{ index.introduction }}</div>
        </div>
        <div class="right">
          <van-image
            width="2rem"
            height="2rem"
            :src="
              index.coverImg.length != 0
                ? index.coverImg[0].httpUrl
                : 'https://img.yzcdn.cn/vant/cat.jpeg'
            "
            fit="cover"
          />
        </div>
      </div>
      <div class="bottom">
        <span class="time">{{ index.date }}</span>
        <div class="like-btn">
          <div @click.stop="likeBtn(index)">
            <svg-icon
              iconClass="heart"
              className="icon"
              v-if="index.isStar"
            ></svg-icon>
            <svg-icon iconClass="heart" className="grey" v-else></svg-icon>
            <span>收藏</span>
          </div>
        </div>
        <!-- <span class="saveicon" @click="iconcolorchange(index, key)">
          <svg-icon
            ref="hearticon"
            iconClass="heart"
            :class="{ 'heart-icon': true, iconactive: index.isStar }"
          />收藏
        </span> -->
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
    likeBtn(index) {
      if (!index.isStar) {
        let params = {
          menu: this.$route.meta.title,
          starId: index._id
        };
        this.$store.dispatch("common/star", params).then(res => {
          Toast({
            message: res,
            icon: "like-o"
          });
          this.$emit("likeBtn", index);
        });
      } else {
        let params = { starId: index._id };
        this.$store.dispatch("common/unStar", params).then(res => {
          Toast({
            message: res,
            icon: "like-o"
          });
          this.$emit("likeBtn", index);
        });
      }
    },
    ClickInstructionItem(index) {
      if (index.link) {
        window.location.link = index.link;
      } else {
        this.$router.push({
          path: "/DetailInfo",
          name: "DetailInfo",
          params: {
            id: index._id,
            like: true,
            forward: false,
            isStar: index.isStar
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
.like-btn {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .icon {
    fill: #ff7559 !important;
    width: 0.32rem;
    height: 0.28rem;
  }
  .grey {
    fill: #9a979b !important;
    width: 0.32rem;
    height: 0.28rem;
  }
  span {
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.instructionsItem {
  padding: 0.24rem 0;
  margin: 0 0.32rem;
  border-bottom: 2px solid #e5e5e5;

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
    display: flex;
    .time {
      font-size: 0.3rem;
      color: #acadaf;
      padding-right: 0.28rem;
      font-weight: 400;
    }
  }
  &:not(:last-child) {
    // border-bottom: 2px solid #e5e5e5;
  }
}
</style>
