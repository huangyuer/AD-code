<template>
  <div class="assessDetail-wapper" v-if="Object.keys(answerLog).length != 0">
    <!-- <div class="bgcome"></div> -->
    <div class="detailcontent">
      <div class="svgicon">
        <svg-icon iconClass="zicebaogao" class="icon"></svg-icon>
      </div>
      <div class="head">自测报告</div>
      <div class="time">{{answerLog.date}}</div>
      <div class="detaillist" v-if="answerLog.isAd != '是'">
        <div v-if="answerLog.isAd == '不清楚'">
          <div class="title">评估建议：</div>
          <div class="result-one">
            {{ answerLog.suggest.msg.split("[]")[0]
            }}
            <b>{{ answerLog.suggest.answer }}</b>
          </div>
        </div>
        <div v-if="answerLog.isAd == '否' || answerLog.isAd == '不清楚' || answerLog.isAd == ''">
          <div class="title">诊断标准：</div>
          <div class="standard">{{ answerLog.diagnosis.title }}</div>
          <div class="answerlist">
            <div class="answeritem" v-for="(item, index) in answerLog.diagnosis.res" :key="index">
              <svg-icon v-if="item.answer == '是'" iconClass="gouxuan2" class="icon"></svg-icon>
              <svg-icon v-if="item.answer == '否'" iconClass="guanbi" class="icon"></svg-icon>
              <svg-icon v-if="item.answer == '不清楚'" iconClass="wenhao" class="icon"></svg-icon>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detaillist">
        <div class="title">评估结论：</div>
        <div class="result-one">
          {{ answerLog.conclusion.msg.split("[]")[0]
          }}
          <b
            class="conclusionanswer"
          >{{ answerLog.conclusion.answer }}</b>
        </div>
        <div v-if="answerLog.adReason.length != 0">
          <div class="title">问题原因：</div>
          <div v-for="(item, index) in answerLog.adReason">
            <div class="result-one">
              {{ item.msg.split("[]")[0] }}
              <b>{{ item.answer }}</b>
              {{ item.msg.split("[]")[1] }}
            </div>
          </div>
        </div>
        <div>
          <div class="title">用药历史：</div>
          <div>
            <div class="med-title" v-if="answerLog.isAd == '是'">近一周使用过 ：</div>
            <div class="medical-list" v-if="answerLog.z_Medication.length != 0">
              <div
                v-for="(item, key) in answerLog.z_Medication"
                :key="key"
                :class="{ 'medical-item': true, islong: lengthz[key] > 16 }"
              >{{ item }}</div>
            </div>
          </div>
          <div v-if="answerLog.isAd == '是'">
            <div class="med-title">曾经使用过 ：</div>
            <div class="medical-list" v-if="answerLog.c_Medication.length != 0">
              <div
                v-for="(item, key) in answerLog.c_Medication"
                :key="key"
                :class="{ 'medical-item': true, islong: lengthc[key] > 16 }"
              >{{ item }}</div>
            </div>
          </div>
        </div>
        <div class="tip">
          <b>*</b>可向您的主治医生出示测试结果，以便医生更好了解特应性皮炎对您造成的影响
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      answerLog: {},
      medicallist: ["激素药膏", "口服免疫抑制剂", "复方甘草酸苷、硫代硫酸钠"],
      answeritem: [
        " 对称性湿疹超过6个月",
        "特应性个人史和/或家族史",
        "血清总IgE升高/外周血嗜酸性粒细胞升高/一种以上特异性IgE阳性"
      ],
      lengthz: [],
      lengthc: []
    };
  },
  created() {
    this.time = this.$route.query.date;
    this.getAnswerLog();
  },
  methods: {
    getBLen(str) {
      if (str == null) return 0;
      if (typeof str != "string") {
        str += "";
      }
      return str.replace(/[^\x00-\xff]/g, "01").length;
    },
    getAnswerLog() {
      this.$store
        .dispatch("patientManagement/getAnswerLog", this.$route.query.id)
        .then(response => {
          this.answerLog = response.data.answerLog;
          for (var i = 0; i < this.answerLog.z_Medication.length; i++) {
            this.$set(
              this.lengthz,
              i,
              this.getBLen(this.answerLog.z_Medication[i])
            );
          }
          for (var i = 0; i < this.answerLog.c_Medication.length; i++) {
            this.$set(
              this.lengthc,
              i,
              this.getBLen(this.answerLog.c_Medication[i])
            );
          }
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.assessDetail-wapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../../../assets/diseasetestbg.png") repeat;
  background-size: 100% 100%;
  min-height: -webkit-fill-available;
  .bgcome {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url(/static/img/diseasetestbg.11f1293.png) repeat;
    background-size: 100% 100%;
  }
  .detailcontent {
    width: 6.86rem;
    background: #ffffff;
    border-radius: 0.2rem;
    // position:absolute;
    z-index: 2;
    box-shadow: 0 0.04rem 0.02rem 0 rgba(195, 223, 214, 1);
    margin: 0.8rem auto 0.6rem;
    padding-bottom: 0.28rem;
    min-height: 80%;
    left: calc(50% - 3.43rem);
    top: 0;
    .svgicon {
      .icon {
        width: 1.26rem;
        height: 1.26rem;
        margin: -0.4rem auto 0;
        display: block;
      }
    }
    .head {
      font-size: 0.32rem;
      text-align: center;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: initial;
    }
    .time {
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: initial;
      text-align: center;
      margin-top: 0.04rem;
    }
    .detaillist {
      padding-left: 0.28rem;
      padding-right: 0.26rem;
      .title {
        font-size: 0.3rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 153, 102, 1);
        margin-top: 0.4rem;
        margin-bottom: 0.2rem;
      }
      .med-title {
        font-size: 0.28rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.2rem;
      }
      .result-one {
        width: 6.2rem;
        height: 0.6rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 0.3rem;
        line-height: 0.6rem;
        padding-left: 0.32rem;
        box-sizing: border-box;
        font-size: 0.28rem;
        margin-bottom: 0.2rem;
        > b {
          color: #ff755a;
          font-size: 0.28rem;
          font-weight: 400;
          &.conclusionanswer {
            color: #f2a900;
          }
        }
      }
      .standard {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
        margin-bottom: 0.32rem;
      }
      .answerlist {
        .answeritem {
          display: flex;
          justify-content: flex-start;
          align-items: end;
          font-size: 0.28rem;
          line-height: initial;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 0.22rem;
          .icon {
            width: 0.38rem;
            height: 0.38rem;
          }
          > span {
            margin-left: 0.12rem;
            max-width: 5.8rem;
          }
        }
      }
      .medical-list {
        overflow: hidden;
        .medical-item {
          float: left;
          width: 2.8rem;
          height: 0.56rem;
          background: rgba(247, 247, 247, 1);
          border-radius: 0.28rem;
          font-size: 0.28rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 153, 102, 1);
          text-align: center;
          line-height: 0.56rem;
          margin-right: 0.35rem;
          margin-bottom: 0.2rem;
          &.islong {
            width: 6rem;
          }
        }
      }
      .tip {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 0.4rem;
        > b {
          font-weight: 400;
          color: #ff755a;
        }
      }
    }
  }
}
</style>
