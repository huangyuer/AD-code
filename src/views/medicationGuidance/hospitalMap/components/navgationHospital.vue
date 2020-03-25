<template>
  <van-action-sheet class="ss" v-model="isShow" :overlay="false" :round="false">
    <div class="hospitalDetailWapper" ref="container">
      <div class="headerTol">
        <div class="tip"></div>
      </div>
      <div class="hospitalContent">
        <div class="hospitalItem">
          <div class="left">
            <div class="hospitalname">
              终点：上海市皮肤病医院
            </div>
            <div class="hospitaladdress">起点：我的位置</div>
          </div>
          <div class="closeicon" @click="closeNav()">
            <svg-icon iconClass="close" className="icon"></svg-icon>
          </div>
        </div>
        <div class="bottom">
          <div class="go-left">
            <div>10分钟</div>
            <div>234m</div>
          </div>
          <div class="go-right">
            <svg-icon iconClass="daohang" className="daohang"></svg-icon>
            出发
          </div>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    this.isShow = this.show;
  },
  methods: {
    closeNav() {
      this.isShow = false;
      this.$emit("closeNav", false);
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
  }
  .hospitalContent {
    padding-top: 0.4rem;
    .hospitalItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      border-bottom: 0.02rem solid #e5e5e5;
      position: relative;
      .closeicon {
        position: absolute;
        right: 0;
        top: 0.2rem;
        .icon {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
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
        }
        .hospitaladdress {
          font-size: 0.28rem;
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: initial;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.24rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(84, 84, 84, 1);
      line-height: initial;
      height: 2.04rem;
      .go-left {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        > div:nth-child(1) {
          font-size: 0.32rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: initial;
          margin-bottom: 0.04rem;
        }
        > div:nth-child(2) {
          font-size: 0.24rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(84, 84, 84, 1);
          line-height: initial;
        }
      }
      .go-right {
        width: 1.4rem;
        height: 0.52rem;
        background: rgba(0, 153, 102, 1);
        border-radius: 0.4rem;
        font-size: 0.24rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.52rem;
        text-align: center;
        .daohang {
          width: 0.24rem;
          height: 0.24rem;
          fill: #ffffff !important;
        }
      }
    }
  }
}
.ss.van-action-sheet {
  max-height: 32%;
  height: 32%;
}
</style>
