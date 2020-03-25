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
        <div class="tip" @click="clicktip()"></div>
        <!-- <van-sticky :container="container"> -->
        <div class="headertop">
          <div>附近医院</div>
          <div class="distance">
            <!-- <van-field
              readonly
              clickable
              name="picker"
              :value="typeValue"
              placeholder="位置距离"
              @click="typePicker = true"
            /> -->
            <div @click="toopen()" class="distancediv">
              <span ref="distancediv">位置距离</span>
              <img
                style="width:.24rem;height:.24rem;margin-top:.12rem;margin-left:.08rem"
                :src="require('../../../../assets/downGrey.png')"
              />
            </div>
          </div>
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
              <span class="top">首推</span>
              <span class="hot">热门</span>
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
    },
    typeValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShow: false,
      typePicker: false,
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
    toopen() {
      this.typePicker = true;
      this.$emit("typePickeropen", true);
    },
    toPageDetail(item) {
      this.isShow = false;
      this.$emit("toHostipalDetail", item, false);
    },
    clicktip() {
      var vanpopup = document.getElementsByClassName("van-popup")[0];
      let scrollTop = vanpopup.scrollTop;
      var bottom = document.getElementsByClassName("van-popup--bottom")[0];
      console.log(bottom.style.top);
      if (bottom.style.top == "50%") {
        vanpopup.style.scrollTop = 0;
        bottom.style.top = "0";
        bottom.style.transition = "0.3s";
      } else {
        bottom.style.top = "50%";
        bottom.style.transition = "0.3s";
      }
    },
    touchstart(e) {
      // touchstart(e);
    },
    touchmove(e) {
      // touchmove(e);
    }
  },
  watch: {
    show: function(val) {
      this.isShow = val;
    },
    typeValue: function(val) {
      this.$refs.distancediv.innerHTML = val;
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
        .distancediv {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
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
          .top {
            width: 0.8rem;
            height: 0.36rem;
            background: linear-gradient(
              270deg,
              rgba(50, 209, 157, 1) 0%,
              rgba(0, 153, 102, 1) 100%
            );
            font-size: 0.24rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            padding: 0 0.16rem;
            border-top-left-radius: 0.3rem;
            border-top-right-radius: 0.2rem;
            border-bottom-right-radius: 0.2rem;
            margin-left: 0.2rem;
          }
          .hot {
            width: 0.8rem;
            height: 0.36rem;
            background: linear-gradient(
              270deg,
              rgba(250, 212, 0, 1) 0%,
              rgba(242, 169, 0, 1) 100%
            );
            font-size: 0.24rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            padding: 0 0.16rem;
            border-top-left-radius: 0.3rem;
            border-top-right-radius: 0.2rem;
            border-bottom-right-radius: 0.2rem;
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
          fill: #009966 !important;
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
  // height: 100vh;
  // -webkit-overflow-scrolling: touch;
}
.van-popup--bottom {
  top: 50%;
}
</style>
