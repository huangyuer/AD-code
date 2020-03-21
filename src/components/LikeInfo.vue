<template>
  <div class="like-item" @click="likeItem">
    <div class="like-content">
      <div class="like-text">{{ info.title }}</div>
      <div class="like-btn">
        <div @click.stop="likeBtn">
          <svg-icon iconClass="heart" className="icon" v-if="info.isStar"></svg-icon>
          <svg-icon iconClass="heart" className="grey" v-else></svg-icon>
          <span>收藏</span>
        </div>
      </div>
    </div>
    <div class="like-time">{{ info.date }}</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "LikeInfo",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
    };
  },

  methods: {
    likeBtn() {
            if (!this.info.isStar) {
        let params = {
          menu: this.$route.meta.title,
          starId: this.info._id
        };
        this.$store.dispatch("common/star", params).then((res)=>{
          Toast({
          message: res,
          icon: "like-o"
        });
             this.$emit("likeBtn",this.info);

        });
      } else {
        let params = { starId: this.info._id };
        this.$store.dispatch("common/unStar", params).then((res)=>{
           Toast({
          message: res,
          icon: "like-o"
        });
             this.$emit("likeBtn",this.info);

        });

      }
 
    },
    likeItem(){
      this.$emit("likeItem",this.info);
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
