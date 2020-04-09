<template>
  <div class="assessDetail-wapper" v-if="Object.keys(answerLog).length!=0">
    <!-- <div class="bgcome"></div> -->
    <div class="detailcontent">
      <div class="svgicon"><svg-icon iconClass="zicebaogao" className="icon"></svg-icon></div>
      <div class="head">自测报告</div>
      <div class="time">2020-03-11</div>
      <div class="detaillist" v-if="answerLog.isAd!='是'">
        <div v-if="answerLog.isAd=='不清楚'">
          <div class="title">评估建议：</div>
          <div class="result-one">{{answerLog.suggest.msg.split('[]')[0]}}<b>{{answerLog.suggest.answer}}</b></div>
        </div>
        <div  v-if="answerLog.isAd=='否' || answerLog.isAd=='不清楚'">
          <div class="title">诊断标准：</div>
          <div class="standard">{{answerLog.diagnosis}}</div>
          <div class="answerlist">
            <div class="answeritem" v-for="(item,index) in answerLog.res">
              <svg-icon v-if="item.answer=='是'" iconClass="gouxuan2" className="icon"></svg-icon>
              <svg-icon v-if="item.answer=='否'"  iconClass="guanbi" className="icon"></svg-icon>
              <svg-icon v-if="item.answer=='不清楚'"  iconClass="wenhao" className="icon"></svg-icon>
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detaillist">
        <div class="title">评估结论：</div>
        <div class="result-one">{{answerLog.conclusion.msg.split('[]')[0]}}<b class="conclusionanswer">{{answerLog.conclusion.answer}}</b></div>
        <div v-if="answerLog.adReason.length!=0">
          <div class="title">问题原因：</div>
          <div v-for="(item,index) in answerLog.adReason">
            <div class="result-one">{{item.msg.split('[]')[0]}}<b>{{item.answer}}</b>{{item.msg.split('[]')[1]}}</div>
          </div>
        </div>
        <div v-if="answerLog.z_Medication.length!=0 || answerLog.c_Medication.length!=0">
          <div class="title">用药历史：</div>
          <div v-if="answerLog.z_Medication.length!=0">
            <div class="med-title">近一周使用过 ：</div>
            <div class="medical-list">
              <div v-for="(item,key) in answerLog.z_Medication" :key="key" :class="{'medical-item':true,islong:length[key]>16}">{{item}}</div>
            </div>
          </div>
          <div v-if="answerLog.c_Medication.length!=0">
            <div class="med-title">曾经使用过 ：</div>
            <div class="medical-list">
              <div v-for="(item,key) in answerLog.c_Medication" :key="key" :class="{'medical-item':true,islong:length[key]>16}">{{item}}</div>
            </div>
          </div>
        </div>
        <div class="tip"><b>*</b>可向您的主治医生出示测试结果，以便医生更好了解特应性皮炎对您造成的影响</div>
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
      medicallist:['激素药膏','口服免疫抑制剂','复方甘草酸苷、硫代硫酸钠'],
      answeritem:[' 对称性湿疹超过6个月','特应性个人史和/或家族史','血清总IgE升高/外周血嗜酸性粒细胞升高/一种以上特异性IgE阳性'],
      length:[],
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
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    },
  }
};
</script>
<style lang="less" scoped>
.assessDetail-wapper {
  display:flex;
  justify-content:center;
  align-items:center;
  background:url('../../../../assets/diseasetestbg.png') repeat;
  background-size:100% 100%;
  min-height: -webkit-fill-available;
  .bgcome{
    position:absolute;
    left:0;
    top:0;
    z-index:1;
    width:100%;
    height:100%;
    background: url(/static/img/diseasetestbg.11f1293.png) repeat;
    background-size: 100% 100%;
  }
  .detailcontent{
    width:6.86rem;
    background:#ffffff;
    border-radius:.2rem;
    // position:absolute;
    z-index:2;
    box-shadow:0px 4px 2px 0px rgba(195,223,214,1);
    margin: .8rem auto .6rem;
    padding-bottom:.28rem;
    min-height: 80%;
    left: calc(50% - 3.43rem);
    top: 0;
    .svgicon{
      .icon{
        width:1.26rem;
        height:1.26rem;
        margin:-.4rem auto 0;
        display:block;
      }
    }
    .head{
      font-size:.32rem;
      text-align:center;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:initial;
    }
    .time{
      font-size:.28rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:initial;
      text-align:center;
      margin-top:.04rem;
    }
    .detaillist{
      padding-left:.28rem;
      padding-right:.26rem;
      .title{
        font-size:.3rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,153,102,1);
        margin-top:.4rem;
        margin-bottom:.2rem;
      }
      .med-title{
        font-size:.28rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-bottom:.2rem;
      }
      .result-one{
        width:6.2rem;
        height:.6rem;
        background:rgba(247,247,247,1);
        border-radius:.3rem;
        line-height:.6rem;
        padding-left:.32rem;
        box-sizing:border-box;
        font-size:.28rem;
        margin-bottom: .2rem;
        >b{
          color:#FF755A;
          font-size:.28rem;
          font-weight:400;
          &.conclusionanswer{
            color:#F2A900;
          }
        }
      }
      .standard{
        font-size:.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:initial;
        margin-bottom:.32rem;
      }
      .answerlist{
        
        .answeritem{
          display:flex;
          justify-content:flex-start;
          align-items:end;
          font-size:.28rem;
          line-height:initial;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          margin-bottom:.22rem;
          .icon{
            width:.38rem;
            height:.38rem;
          }
          >span{
            margin-left:.12rem;
            max-width: 5.8rem;
          }
        }
      }
      .medical-list{
        overflow:hidden;
        .medical-item{
          float:left;
          width:2.8rem;
          height:.56rem;
          background:rgba(247,247,247,1);
          border-radius:.28rem;
          font-size:.28rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,153,102,1);
          text-align:center;
          line-height:.56rem;
          margin-right:.35rem;
          margin-bottom:.2rem;
          &.islong{
            width:6rem;
          }
        }
      }
      .tip{
        font-size:.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#999999;
        margin-top:.4rem;
        >b{
          font-weight:400;
          color:#FF755A;
        }
      }
    }
  }
  
}
</style>