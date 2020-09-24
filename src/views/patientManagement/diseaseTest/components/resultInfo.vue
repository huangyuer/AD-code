<template>
  <!-- v-if="Object.keys(result).length!=0" -->
  <div class="resultWapper">
    <div class="degtitle">
      <div class="score">
        <span>{{ result.score }}</span>
        <b>分</b>
      </div>
      <div class="tip">
        <span v-if="parseInt(result.addScore) > 0" class="spanup"
          >+{{ result.addScore }}</span
        >
        <span v-else-if="parseInt(result.addScore) === 0" class="spanup"
          >+{{ result.addScore }}</span
        >
        <span v-else-if="parseInt(result.addScore) < 0" class="spandown">{{
          result.addScore
        }}</span>
        <span v-if="result.addScore !== ''" class="title">较均值</span>
      </div>
    </div>
    <div class="time">{{ result.date }}</div>
    <div class="content">
      <div class="header">评估建议</div>
      <div class="detail">{{ result.msg }}</div>
    </div>
    <div class="groupnext" @click="topagePersonalCenter()">关闭</div>
    <div class="titledetail" v-if="result.addScore !== ''">
      <b>*</b>较均值：此次测试前2周得分的均值
    </div>
    <div class="titledetail" v-if="type === 'poem' || type === 'dlqi'">
      <b>*</b>最新权威中国AD患者自测可参考ADCT评估
      <div class="titledetail__toGo" @click="togoDiseaseText()">建议前往 <svg-icon iconClass="gengduo" class="gengduo"></svg-icon></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataresult: {
      type: Object,
      default: function() {
        return {};
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      result: {}
      // dataresult:{
      //   addScore: "0"
      //   date: "2020-04-07"
      //   msg: "您的特应性皮炎控制得不错，再接再厉"
      //   score: 0
      // }
    };
  },
  created() {},
  mounted() {},
  methods: {
    topagePersonalCenter() {
      if ( this.type === 'poem' || this.type === 'dlqi') {
        this.$router.push({ path: "/anotherTest" });
      } else {
        this.$router.push({ path: "/personalCenter" });
      }
    },
    togoDiseaseText() {
      this.$router.push({ path: "/diseaseTest" });
    }
  },
  watch: {
    dataresult: function(val, oldval) {
      this.result = val;
      console.log("this.result", this.result);
    }
  }
};
</script>
<style lang="less" scoped>
.gengduo {
  width: 0.16rem !important;
  height: 0.28rem !important;
  margin-left: 0.12rem;
}
.resultWapper {
  padding-top: 0.6rem;
  .degtitle {
    font-weight: 500;
    line-height: initial;
    font-size: 0.6rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: #f2a900;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.84rem;
    > .score {
      display: flex;
      align-items: baseline;
      justify-content: center;
      b {
        font-size: 0.4rem;
        font-weight: 500;
        line-height: initial;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: #f2a900;
        margin-right: 0.08rem;
      }
    }
    .tip {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: column;
      height: 0.84rem;
      .title {
        font-size: 0.26rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
      .spanlevel {
        width: 0.32rem;
        height: 0.04rem;
        background: rgba(153, 153, 153, 1);
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .spanup {
        width: 0.8rem;
        height: 0.36rem;
        background: linear-gradient(
          270deg,
          rgba(255, 157, 138, 1) 0%,
          rgba(255, 117, 90, 1) 100%
        );
        display: block;
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.36rem;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
      }
      .spandown {
        display: block;
        width: 0.8rem;
        height: 0.36rem;
        line-height: 0.36rem;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        background: linear-gradient(
          270deg,
          rgba(50, 209, 157, 1) 0%,
          rgba(0, 153, 102, 1) 100%
        );
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .time {
    font-size: 0.32rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.44rem;
    // padding-bottom: 0.22rem;
  }
  .content {
    width: 6.06rem;
    margin: 0 auto;
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.4rem;
    text-align: center;
    min-height: 5rem;
    .header {
      font-size: 0.3rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      margin: 0.28rem auto 0.1rem;
      text-align: center;
    }
    .detail {
      font-size: 0.28rem;
      text-align: left;
      color: rgba(102, 102, 102, 1);
      text-indent: 0.2em;
    }
  }
}
.groupnext {
  width: 6rem;
  height: 0.8rem;
  background: rgba(242, 169, 0, 1);
  border-radius: 0.4rem;
  margin: 0 auto;
  font-size: 0.3rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8rem;
  // margin-top: auto;
  margin-bottom: 0.8rem;
  // position: absolute;
  // bottom: 0;
  // left: calc(50% - 3rem);
}
.titledetail {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  text-align: center;
  // margin-top: auto;
  // width: 5rem;
  // margin-bottom: 0.84rem;
  // position: absolute;
  // bottom: 0;
  // left: calc(50% - 2.5rem);
  > b {
    color: #ff755a;
    font-weight: 500;
  }
  &__toGo {
    color: #009966;
    font-size: .24rem;
    text-align: center;
    text-decoration: underline;
    margin-top: 0.16rem;
    img {
      margin-left: .5rem;
    }
  }
}
</style>
