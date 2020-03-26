<template>
  <div class="resultWapper" v-if="Object.keys(result).length!=0">
    <div class="degtitle">
      <div>
        {{ result.score }}
        <b>分</b>
      </div>
      <span v-if="level=='peace'" class="spanlevel"></span>
      <span v-else-if="level=='up'" class="spanup">+1</span>
      <span v-else-if="level=='down'" class="spandown">-2</span>
    </div>
    <!-- <star-scale
      v-if="Object.keys(dataresult).length != 0"
      :scale="dataresult.star"
    />-->
    <div class="time">{{result.date}}</div>
    <div class="content">
      <div class="header">评估建议</div>
      {{ result.msg }}
    </div>
    <div class="groupnext" @click="topagePersonalCenter()">关闭</div>
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
    }
  },
  data() {
    return {
      level: "",
      result: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    topagePersonalCenter() {
      this.$router.push({ path: "/personalCenter" });
    }
  },
  watch: {
    dataresult: function(val, oldval) {
      this.result = val;
      if (localStorage.getItem("score") != null) {
        this.level = "peace";
        localStorage.setItem("score", this.result.score);
      } else {
        if (localStorage.getItem("score") < this.result.score) {
          this.level = "down";
          localStorage.setItem("score", this.result.score);
        } else {
          this.level = "up";
          localStorage.setItem("score", this.result.score);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.resultWapper {
  .degtitle {
    font-weight: 500;
    line-height: initial;
    padding-top: 0.86rem;
    font-size: 0.6rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(242, 169, 0, 1);
    display: flex;
    align-items: center;
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
    .header {
      font-size: 0.3rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      margin: 0.28rem auto 0.1rem;
      text-align: center;
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
  margin-top: 3.2rem;
}
</style>
