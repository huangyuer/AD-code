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
      @touchstart="touchstart"
      @touchmove="touchmove"
    >
      <!-- <div class="whiteskr"></div> -->
      <div class="exceptwhite">
        <div class="headerTol">
          <div class="tip" @click="clicktip()"></div>
        </div>
        <div class="hospitalContent">
          <div class="hospitalContentname">医院详情</div>
          <div class="todaohangItem">
            <!-- <van-image
              width="2.8rem"
              height="2rem"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            /> -->
            <div class="right">
              <div class="hp-address">上海市长宁区武夷路196号</div>
              <div class="hp-phone">电话：(021)57687676</div>
              <div class="hp-distance">距离您569m</div>
            </div>
            <div class="hp-btn" @click="goNav()">
              <svg-icon iconClass="daohang" className="daohang"></svg-icon>导航
            </div>
          </div>
          <div class="hospitalContentname">医生列表</div>
          <div class="doctorList">
            <div
              class="doctorItem"
              v-for="(item, key) in doctoritem"
              :key="key"
            >
              <div class="doc-top">
                <van-image
                  round
                  width=".72rem"
                  height=".72rem"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div class="doc-detail">
                  <div class="doc-name">
                    胡光 | 男
                  </div>
                  <div class="doc-work">pifuke | zhurenyishi</div>
                </div>
              </div>
              <div class="doc-major">
                <b>擅长领域：</b>皮癣，银屑病，特应性皮炎
              </div>
            </div>
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
      doctoritem: [{}, {}, {}, {}, {}]
    };
  },
  mounted() {
    this.isShow = this.show;
  },
  watch: {
    show: function(val) {
      this.isShow = val;
    }
  },
  methods: {
    goNav() {
      this.$emit("goNav", false);
    },
    clicktip() {
      var vanpopup = document.getElementsByClassName("van-popup")[0];
      let scrollTop = vanpopup.scrollTop;
      var bottom = document.getElementsByClassName("van-popup--bottom")[0];
      console.log(bottom.style.top);
      this.isShow = false;
      this.$emit("closedetailNav", false);
    },
    touchstart(e) {
      // touchstart(e);
    },
    touchmove(e) {
      // touchmove(e);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.hospitalDetailWapper {
  position: relative;
  .whiteskr {
    width: 100%;
    height: 50vh;
    background: transparent;
  }
  .exceptwhite {
    background: #ffffff;
    padding: 0 0.32rem;
    .headerTol {
      position: fixed;
      width: calc(100% - 0.64rem);
      background: #ffffff;
      z-index: 2;
      .tip {
        width: 100%;
        height: 0.56rem;
        background: #ffffff;
        position: fixed;
        width: calc(100% - 0.64rem);
        background: #ffffff;
        z-index: 2;
        &:after {
          content: "";
          position: absolute;
          left: calc(50% - 0.4rem);
          bottom: 0.24rem;
          width: 0.8rem;
          height: 0.1rem;
          background: rgba(216, 216, 216, 1);
          border-radius: 0.11rem;
        }
      }
    }
    .hospitalContent {
      padding-top: 0.56rem;
      .hospitalContentname {
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
        padding-bottom: 0.16rem;
        border-bottom: 0.02rem solid #e5e5e5;
      }
      .todaohangItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.22rem 0;
        .right {
          // padding-left: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          .hp-address {
            font-size: 0.28rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: initial;
          }
          .hp-phone {
            font-size: 0.28rem;
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: rgba(84, 84, 84, 1);
            line-height: initial;
            margin: 0.04rem 0;
          }
          .hp-distance {
            font-size: 0.28rem;
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: rgba(84, 84, 84, 1);
            line-height: initial;
          }
        }
        .hp-btn {
          width: 1.4rem;
          height: 0.44rem;
          border-radius: 0.4rem;
          border: 0.02rem solid rgba(0, 153, 102, 1);
          font-size: 0.24rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.2rem;
          background: #009d75;
          .daohang {
            margin-right: 0.12rem;
            width: 0.24rem;
            height: 0.24rem;
            fill: #ffffff !important;
          }
        }
      }
      .doctorList {
        .doctorItem {
          padding: 0.2rem 0;
          border-bottom: 0.02rem solid #e5e5e5;
          .doc-top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .doc-detail {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              flex-direction: column;
              padding-left: 0.2rem;
              .doc-name {
                color: #333333;
                font-family: "PingFangSC-Medium";
                font-size: 0.28rem;
                line-height: initial;
                font-weight: 500;
                .topicon {
                  width: 0.86rem;
                  height: 0.32rem;
                  margin-left: 0.12rem;
                }
              }
              .doc-work {
                color: #666666;
                font-family: "PingFangSC-Regular";
                font-size: 0.28rem;
                line-height: initial;
                font-weight: 400;
              }
            }
          }
          .doc-major {
            font-size: 0.28rem;
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: #333333;
            line-height: initial;
            margin-top: 0.12rem;
            > b {
              color: #666666;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
.ss.van-action-sheet {
  max-height: 100%;
  height: 100vh;
}
.van-popup--bottom {
  top: 0;
}
</style>
