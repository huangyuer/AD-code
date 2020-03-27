<template>
  <div class="assessDetail-wapper" v-if="Object.keys(answerLog).length!=0">
    <div class="degtitle">
      <div class="degscore">
        <span>{{ answerLog.score }}</span>
        <b>分</b>
      </div>
      <span v-if="level==''" class="spanlevel"></span>
      <span v-else-if="level=='up'" class="spanup">+{{answerLog.addScore}}</span>
      <span v-else-if="level=='down'" class="spandown">-{{answerLog.addScore}}</span>
      <span v-else></span>
    </div>
    <div class="date">{{time}}</div>
    <div class="setconclusion">
      <div class="setconclusioninner">
        <div class="title">评估结论:</div>
        <div class="content">{{answerLog.conclusion}}</div>
        <div class="title">问题原因:</div>
        <div
          class="text"
          v-for="(item,key) in answerLog.reason"
          :class="{content:item.Type=='normal',bg:item.Type=='card'}"
          :key="key"
        >{{item.Msg}}</div>
      </div>
    </div>
    <div>
      <div data-v-60963135 class="van-collapse van-hairline--top-bottom">
        <div data-v-60963135 class="van-collapse-item">
          <div
            role="button"
            tabindex="0"
            aria-expanded="true"
            class="van-cell van-cell--clickable van-collapse-item__title van-collapse-item__title--expanded"
            ref="vancell"
          >
            <div class="van-cell__title">
              <span class="celltitle">测试详情</span>
            </div>
            <div class="showbtn" ref="showbtn" @click="clickall()">
              <span>显示全部</span>
              <i class="van-icon van-icon-arrow van-cell__right-icon">
                <!---->
              </i>
            </div>
          </div>
          <div ref="vancollapseitemwrapper" class="van-collapse-item__wrapper" style>
            <div class="van-collapse-item__content">
              <div class="itemdetail" v-for="(item,index) in answerLog.detail" :key="index">
                <div class="question">{{item.no+'.'+item.title}}</div>
                <div class="answer">
                  选择:
                  <b>{{item.answer}}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      answerLog: {},
      level: "",
      time: "",
      activeNames: ["1"]
    };
  },
  created() {
    this.time = this.$route.query.date;
    this.getAnswerLog();
  },
  methods: {
    getAnswerLog() {
      this.$store
        .dispatch("patientManagement/getAnswerLog", this.$route.query.id)
        .then(response => {
          this.answerLog = response.data.answerLog;
          var str = "-1";
          if (this.answerLog.addScore == "") {
            this.level = "";
          } else if (this.answerLog.addScore.indexOf("-") != -1) {
            this.level = "down";
          } else if (this.answerLog.addScore.indexOf("-") != -1) {
            this.level = "up";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    clickall() {
      //显示全部
      if (
        this.$refs.vancell.classList.contains(
          "van-collapse-item__title--expanded"
        )
      ) {
        this.$refs.vancell.classList.remove(
          "van-collapse-item__title--expanded"
        );
        this.$refs.vancollapseitemwrapper.style.height = "0";
        this.$refs.vancollapseitemwrapper.style.display = "none";
        this.$refs.showbtn.classList.add("down");
      } else {
        this.$refs.vancell.classList.add("van-collapse-item__title--expanded");
        this.$refs.vancollapseitemwrapper.style.height = "auto";
        this.$refs.vancollapseitemwrapper.style.display = "block";
        this.$refs.showbtn.classList.remove("down");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.assessDetail-wapper {
  .degtitle {
    font-weight: 500;
    line-height: initial;
    padding-top: 0.4rem;
    font-size: 0.6rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(242, 169, 0, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .degscore {
      display: flex;
      justify-content: center;
      align-items: baseline;
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

    .spanlevel {
      width: 0.32rem;
      height: 0.04rem;
      background: rgba(153, 153, 153, 1);
      font-size: 0.3rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      text-align: center;
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
      text-align: center;
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
      text-align: center;
    }
  }
  .date {
    text-align: center;
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 0.24rem;
  }
  .setconclusion {
    padding-left: 0.32rem;
    .setconclusioninner {
      border-bottom: 0.02rem solid #e5e5e5;
      overflow: hidden;
      .title {
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(0, 153, 102, 1);
        margin-bottom: 0.12rem;
      }
      .text {
        margin-bottom: 0.2rem;
      }
      .content {
        font-size: 0.28rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.2rem;
      }
      .bg {
        float: left;
        width: 2.5rem;
        height: 0.68rem;
        line-height: 0.68rem;
        margin-right: 0.2rem;
        background: rgba(255, 240, 206, 1);
        border-radius: 0.28rem;
        font-size: 0.28rem;
        text-align: center;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(242, 169, 0, 1);
      }
    }
  }
  .showbtn {
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(0, 153, 102, 1);
    align-items: center;
    line-height: initial;
    &.down {
      color: #999999;
      .van-cell__left-icon,
      .van-cell__right-icon {
        min-width: 1em;
        height: 0.24rem;
        font-size: 0.28rem;
        line-height: 0.24rem;
        color: #999999;
      }
    }
  }
  .van-collapse-item__title .van-cell__right-icon::before {
    transform: rotate(0);
  }
  .van-collapse-item__title--expanded .van-cell__right-icon::before {
    transform: rotate(90deg);
  }
  .celltitle {
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .van-cell::after {
    border-bottom: 0.02rem solid #e5e5e5;
    transform: scale(1);
    content: "";
  }
  .van-cell__left-icon,
  .van-cell__right-icon {
    min-width: 1em;
    height: 0.24rem;
    font-size: 0.28rem;
    line-height: 0.24rem;
    color: rgba(0, 153, 102, 1);
  }
  .van-collapse-item__content {
    padding: 0 0 0 0.32rem;
    .itemdetail {
      padding: 0.2rem 0;
      border-bottom: 0.02rem solid #e5e5e5;
      .question {
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
      }
      .answer {
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
        margin-top: 0.12rem;
        > b {
          color: #009966;
          font-weight: 500;
        }
      }
    }
  }
  .van-hairline--top-bottom::after {
    border: 0;
    border-bottom: 0.02rem solid #c5c5c5;
    opacity: 1;
    right: calc(-50% - 1.2rem);
  }
}
</style>