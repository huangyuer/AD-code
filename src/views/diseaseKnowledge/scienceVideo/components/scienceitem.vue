<template>
  <div class="sciencelist">
    <div class="caringItem" v-for="(item, index) in itemlist" :key="index">
        <div class="header">
          <div class="left">{{ item.date }}</div>
          <div class="right">
            <div class="like-btn">
              <div class="likeclick" @click.stop="likeBtn(item)">
                <svg-icon iconClass="heart" class="icon" v-if="item.isStar"></svg-icon>
                <svg-icon iconClass="heart" class="grey" v-else></svg-icon>
                <span>收藏</span>
              </div>
            </div>
          </div>
        </div>
        <div class="center" @click="toPageVideodetail(item)">
          <van-image width="100%" height="2.6rem" :src="item.coverImg[0].httpUrl" fit="cover" />
        </div>
        <div class="bottom">
          {{ item.title }}
        </div>
      </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
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
    toPageVideodetail(item) {
      if (!item.video[0].httpUrl.includes("ad.kurite.com") && !item.video[0].httpUrl.includes("iframe")) {
        this.$store.dispatch("diseaseKnowledge/upVideoClickNum", item._id)
        window.location.href = item.video[0].httpUrl
      } else {
        this.$emit("toPageVideodetail", item);
      }
    }
  },
  props: {
    itemlist: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang="less" scoped>
.saveicon {
  position: absolute;
  top: 1.7rem;
  right: 0.24rem;
  width: 0.58rem;
  height: 0.58rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  .heart-icon {
    width: 0.32rem !important;
    height: 0.28rem !important;
    fill: #9a979b !important;
    &.iconactive {
      fill: #ff765d !important;
    }
  }
}
.like-btn {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .likeclick {
    display: flex;
    align-items: center;
  }
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
    padding-left: 0.1rem;
  }
}
.sciencelist {
  padding: 0.12rem 0.19rem 0;
  overflow: hidden;
   .caringItem {
    width: 95%;
    border-radius: 0.08rem;
    border: 0.02rem solid #f3f3f3;
    margin: 0 auto;
    box-sizing: border-box;
    margin-bottom: 0.24rem;
    .header {
      height: 0.68rem;
      padding: 0.2rem 0.2rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: #666666;
        flex: 9;
      }
      .right {
        font-size: 0.24rem;
        color: #999999;
        font-family: "PingFangSC-Regular";
        display: flex;
        align-items: center;
      }
    }
    .center {
      overflow: hidden;
      line-height: 0;
      border-top: 0.02rem solid #F3F3F3;
      border-bottom: 0.02rem solid #F3F3F3;
    }
    .bottom {
      margin: 0.2rem 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 0.3rem;
      color: #050f2b;
      text-align: left;
      box-sizing: border-box;
    }
  }
}
</style>
