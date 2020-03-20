<template>
  <div
    data-v-0c38f854=""
    data-v-6f539d17=""
    class="van-popup van-popup--bottom"
    style="z-index: 2008;"
    v-if="isShow"
    ref="vanpopup"
  >
    <div
      class="hospitalDetailWapper"
      ref="container"
      @touchstart="touchstart"
      @touchmove="touchmove"
    >
      <div class="headerTol">
        <div class="tip"></div>
        <!-- <van-sticky :container="container"> -->
        <div class="headertop">
          <div>附近医院</div>
          <div>位置距离</div>
        </div>
        <!-- </van-sticky> -->
      </div>
      <div class="hospitalContent">
        <div
          class="hospitalItem"
          v-for="(item, key) in itemlist"
          :key="key"
          @click="toPageDetail(item)"
        >
          <div class="left">
            <div class="hospitalname">
              上海市皮肤病医院
              <svg-icon iconClass="topicon" className="topicon"></svg-icon>
            </div>
            <div class="hospitaladdress">上海市长宁区武夷路196号</div>
          </div>
          <div class="right">
            <svg-icon iconClass="daohang" className="dao-hang"></svg-icon
            ><span>787m</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { touchstart, touchmove } from "./touch";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      itemlist: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      container: null,
      startx: 0,
      starty: 0
    };
  },
  mounted() {
    this.isShow = this.show;
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "";
  },
  methods: {
    toPageDetail(item) {
      this.isShow = false;
      this.$emit("toHostipalDetail", item, false);
    },
    touchstart(e) {
      touchstart(e);
    },
    touchmove(e) {
      touchmove(e);
    }
  },
  watch: {
    show: function(val) {
      this.isShow = val;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.hospitalDetailWapper {
  padding: 0 0.32rem;
  position: relative;
  .headerTol {
    position: fixed;
    width: calc(100% - 0.64rem);
    background: #ffffff;
    z-index: 2;
    .tip {
      width: 100%;
      height: 0.3rem;
      background: #ffffff;
      position: fixed;
      width: calc(100% - 0.64rem);
      background: #ffffff;
      z-index: 2;
      &:after {
        content: "";
        position: absolute;
        left: calc(50% - 0.4rem);
        bottom: 0;
        width: 0.8rem;
        height: 0.1rem;
        background: rgba(216, 216, 216, 1);
        border-radius: 0.11rem;
      }
    }
    .headertop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.28rem 0 0.16rem 0;
      border-bottom: 0.02rem solid rgba(229, 229, 229, 1);

      > div:nth-child(1) {
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
      }
      > div:nth-child(2) {
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: initial;
      }
    }
  }

  .hospitalContent {
    padding-top: 0.86rem;
    .hospitalItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      border-bottom: 0.02rem solid #e5e5e5;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .hospitalname {
          font-size: 0.28rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: initial;
          .topicon {
            width: 0.86rem;
            height: 0.32rem;
            margin-left: 0.12rem;
          }
        }
        .hospitaladdress {
          font-size: 0.28rem;
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: initial;
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.24rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(84, 84, 84, 1);
        line-height: initial;
        margin-top: 0.4rem;
        .dao-hang {
          margin-right: 0.08rem;
          width: 0.24rem;
          height: 0.24rem;
        }
      }
    }
  }
}
.ss.van-action-sheet {
  //   max-height: 50%;
  height: 50%;
}
.van-popup {
  //   max-height: 50%;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
}
.van-popup--bottom {
  top: 50%;
}
</style>
