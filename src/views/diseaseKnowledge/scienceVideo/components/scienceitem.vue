<template>
  <div class="sciencelist">
    <div
      class="scienceitem"
      v-for="(item, key) in itemlist"
      :key="key"
      @click="toPageVideodetail(item.id)"
    >
      <van-image width="100%" height="1.8rem" fit="cover" :src="item.src" />
      <div class="saveicon" @click="iconcolorchange(key)">
        <svg-icon iconClass="heart" className="heart-icon" />
      </div>
      <div>
        <div class="title">{{ item.title }}</div>
        <div class="chakancontent">
          <span>{{ item.timer }}</span>
          <span
            ><img src="../../../../assets/chakan@2x.png" alt="" />{{
              item.time
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  methods: {
    iconcolorchange(key) {
      var hearticon = document.getElementsByClassName("heart-icon")[key];
      if (!hearticon.classList.contains("iconactive")) {
        hearticon.classList.add("iconactive");
        Toast({
          message: "收藏成功",
          icon: "like-o"
        });
        this.$emit("iconcolorchange", key, true);
      } else {
        hearticon.classList.remove("iconactive");
        Toast({
          message: "取消收藏",
          icon: "like-o"
        });
        this.$emit("iconcolorchange", key, false);
      }
    },
    toPageVideodetail(id) {
      this.$emit("toPageVideodetail", id);
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
.sciencelist {
  padding: 0.12rem 0.19rem 0;
  overflow: hidden;
  .scienceitem {
    width: 3.3rem;
    height: 3.2rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    border: 0.02rem solid rgba(243, 243, 243, 1);
    padding: 0.2rem 0.15rem;
    box-sizing: border-box;
    line-height: 0;
    margin: 0.12rem 0.13rem;
    float: left;
    position: relative;
    .title {
      font-size: 0.28rem;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(5, 15, 43, 1);
      margin-top: 0.28rem;
      line-height: initial;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chakancontent {
      font-size: 0.28rem;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(172, 173, 175, 1);
      display: flex;
      align-items: center;
      line-height: initial;
      span {
        display: flex;
        align-items: center;
        img {
          width: 0.32rem;
          height: 0.24rem;
          margin-left: 0.24rem;
          margin-right: 0.06rem;
        }
      }
    }
  }
}
</style>
