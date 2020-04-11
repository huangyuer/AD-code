<template>
  <div class="TestWapper">
    <div class="vanimagebg">
      <van-image
        width="100%"
        height="100%"
        :src="require('@/assets/diseasetestbg.png')"
        fit="cover"
      />
    </div>
    <div class="TestWapper-List">
      <div :class="{ swiperInner: true, swiperesult: isShowresult }">
        <van-swipe
          v-if="Object.keys(firstquestion).length != 0"
          :class="{ 'my-swipe': true, myswiperesult: isShowresult }"
          ref="myswiper"
          :loop="false"
          :show-indicator="false"
          :touchable="false"
          :initial-swipe="0"
          indicator-color="white"
          vertical
          :stop-propagation="false"
          @change="onChange"
        >
          <van-swipe-item v-if="!istouchable">
            <div class="swipediv">{{ firstquestion.questions[0].title }}</div>
            <radio-box
              :list="firstquestion.questions[0].options"
              @nextToPageradiobox="nextToPageradiobox"
            ></radio-box>
            <div class="groupnext" @click="openquestion()" style="margin-top: 1.82rem;">开始答题</div>
          </van-swipe-item>
          <van-swipe-item v-if="changeFirstval == '否' || changeFirstval == '不清楚'">
            <div v-if="!isShowresult">
              <div v-for="(item, index) in nextquestionA.questions" :key="index">
                <radio-box-item :index="index" :dataitem="item" @radiobox="radiobox"></radio-box-item>
              </div>
              <div v-if="noFirstquestion">
                <div class="slidertitle">{{ nextquestion.tag }}</div>
                <div v-for="(item, index) in nextquestion.questions" :key="index">
                  <slider-box-item
                    v-if="item.type == 'radio'"
                    :index="index + 4"
                    :dataitem="item"
                    @sliderbox="sliderbox"
                  ></slider-box-item>
                  <check-box-item
                    :index="index + 4"
                    v-if="item.type == 'checkbox'"
                    :medications="item"
                    @checkbox="checkbox"
                  ></check-box-item>
                </div>
                <div class="groupnext" @click="uptoCommit()">提交</div>
              </div>
            </div>
            <div v-else>
              <result-info :dataresult="levelresult"></result-info>
            </div>
          </van-swipe-item>
          <van-swipe-item v-if="!noFirstquestion">
            <div v-if="!isShowresult">
              <div class="slidertitle">{{ nextquestion.tag }}</div>
              <div v-for="(item, index) in nextquestion.questions" :key="index">
                <slider-box-item
                  v-if="item.type == 'radio'"
                  :index="changeFirstval == '是' ? index + 1 : index + 4"
                  :dataitem="item"
                  @sliderbox="sliderbox"
                ></slider-box-item>
                <check-box-item
                  :index="changeFirstval == '是' ? index + 1 : index + 4"
                  v-if="item.type == 'checkbox'"
                  :medications="item"
                  :typethis="'notype3'"
                  @checkbox="checkbox"
                ></check-box-item>
              </div>
              <div class="groupnext" @click="uptoCommit()">提交</div>
            </div>
            <div v-else>
              <result-info :dataresult="levelresult"></result-info>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-overlay :show="showoverlay">
        <div class="wrapper" @click.stop>
          <div class="wrapperblock">
            <div class="title">温馨提示</div>
            <div class="contain">建议您前往医院进一步确诊是否为特应性皮炎。</div>
            <div class="btn" @click="tipnext()">继续答题</div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>
<script>
import CheckBox from "./components/checkbox";
import RadioBox from "./components/radiobox";
import SliderBox from "./components/sliderbox";
import ResultInfo from "./components/resultInfo";
import RadioBoxItem from "./components/radioboxitem";
import SliderBoxItem from "./components/sliderboxitem";
import CheckBoxItem from "./components/checkboxitem";
import { Toast } from "vant";
export default {
  data() {
    return {
      optionsFirst: [],
      istouchable: false,
      touchAble: false,
      changeFirstval: "",
      checkboxresult1: [],
      checkboxresult2: [],
      currentIndex: 0,
      showoverlay: false, //提醒去医院看病
      isShowresult: false, //是否显示诊断结果
      //登陆
      firstquestion: {},
      nextquestionA: {},
      nextquestionB1: {},
      nextquestionB2: {},
      nextquestion: {},
      questionlength: 0,
      noFirstquestion: false,
      current: 0,
      questions: [],
      detail: [], //提交的答案
      final: false,
      levelresult: {}
    };
  },
  created() {
    this.getQuestions();
  },
  mounted() {},
  methods: {
    initFirstAnswer(question) {
      for (var i = 0; i < question.length; i++) {
        var obj = {};
        if (this.changeFirstval != "是" && i < 3) {
          var current = "";
        } else {
          var current = question[i].options[0].option;
        }
        obj["question"] = question[i]._id;
        obj["answers"] = {};
        if (i != question.length - 1) {
          obj.answers[current] = 0;
        }
        this.detail.push(obj);
      }
    },
    openquestion() {
      var obj = {};
      obj["question"] = this.firstquestion.questions[0]._id;
      obj["answers"] = {};
      obj.answers[this.changeFirstval] = 0;
      if (this.changeFirstval == "") {
        Toast("请先选择");
        return;
      } else if (this.changeFirstval == "是") {
        this.istouchable = true;
        this.touchAble = true;
        this.detail.push(obj);
        this.initFirstAnswer(this.nextquestion.questions);
        this.questionlength = this.nextquestion.questions.length;
      } else {
        this.istouchable = true;
        this.detail.push(obj);
        var nextquesion = this.nextquestionA.questions;
        nextquesion = nextquesion.concat(this.nextquestion.questions);
        this.initFirstAnswer(nextquesion);
        this.questionlength = nextquesion.length;
      }
    },
    tipnext() {
      this.showoverlay = false;
    },
    onChange(index) {
      // console.log("index,,,,,,,",index);
    },
    nextToPageradiobox(val) {
      this.changeFirstval = val;
      if (val == "是") {
        this.nextquestion = this.nextquestionB1;
      } else {
        this.nextquestion = this.nextquestionB2;
      }
    },
    radiobox(item, current, index) {
      var objradio = {};
      objradio["question"] = item._id;
      objradio["answers"] = {};
      objradio.answers[current] = 0;
      var no = index;
      this.detail.splice(no + 1, 1, objradio);
      if (
        Object.keys(this.detail[1].answers)[0] == "" ||
        Object.keys(this.detail[2].answers)[0] == "" ||
        Object.keys(this.detail[3].answers)[0] == ""
      ) {
        return;
      } else if (
        Object.keys(this.detail[1].answers)[0] != "是" ||
        (Object.keys(this.detail[1].answers)[0] == "是" &&
          Object.keys(this.detail[2].answers)[0] != "是" &&
          Object.keys(this.detail[3].answers)[0] != "是")
      ) {
        this.noFirstquestion = true;
        this.touchAble = true;
      } else {
        this.noFirstquestion = false;
        this.touchAble = true;
        this.showoverlay = true;
        this.$refs.myswiper.next();
      }
    },
    sliderbox(item, current, index) {
      var objradio = {};
      objradio["question"] = item._id;
      objradio["answers"] = {};
      objradio.answers[current] = 0;
      var no = index;
      this.detail.splice(no, 1, objradio);
    },
    checkbox(result, title, isendChecked) {
      var objradio = {};
      objradio["question"] = title;
      objradio["answers"] = {};
      if (isendChecked) {
        objradio.answers["未使用药物"] = 0;
      } else {
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            objradio.answers[result[i]] = 0;
          }
        } else {
          objradio["answers"] = {};
        }
      }
      this.detail.splice(this.questionlength, 1, objradio);
      console.log("fsfsadf", this.detail);
    },
    uptoCommit() {
      if (
        Object.keys(this.detail[this.detail.length - 1].answers).length != 0
      ) {
        this.touchAble = false;
        this.isShowresult = true;
        this.submitAnswer();
      } else {
        Toast("请先选择是否用药");
      }
    },
    getQuestions() {
      this.$store
        .dispatch("patientManagement/getQuestions")
        .then(data => {
          this.firstquestion = this.$store.getters.getquesion[
            Object.keys(this.$store.getters.getquesion)[0]
          ];
          this.nextquestionA = this.$store.getters.getquesion[
            Object.keys(this.$store.getters.getquesion)[1]
          ];
          this.nextquestionB1 = this.$store.getters.getquesion[
            Object.keys(this.$store.getters.getquesion)[2]
          ];
          this.nextquestionB2 = this.$store.getters.getquesion[
            Object.keys(this.$store.getters.getquesion)[3]
          ];
        })
        .catch(e => {});
    },
    submitAnswer() {
      this.$store
        .dispatch("patientManagement/submitAnswer", this.detail)
        .then(response => {
          Toast(response.msg);
          this.levelresult = response.data;
        })
        .catch(e => {});
    }
  },
  components: {
    CheckBox,
    RadioBox,
    SliderBox,
    ResultInfo,
    RadioBoxItem,
    SliderBoxItem,
    CheckBoxItem
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.TestWapper {
  position: relative;
  height: 100vh;
  .vanimagebg {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .TestWapper-List {
    position: relative;
    z-index: 1;
    left: 5%;
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    .swiperInner {
      position: relative;
      width: 100%;
      height: 11.46rem;
      border-radius: 0.2rem;
      background: #ffffff;
      &.swiperesult {
        height: 10rem;
      }
    }
    .swiperWapper {
      position: relative;
      width: 100%;
      margin-top: 0.6rem;
      height: calc(100% - 2.32rem);
      border-radius: 0.2rem;
      background: #ffffff;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  @{aaa}.my-swipe {
    position: relative;
    width: 100%;
    margin-top: 0.6rem;
    height: calc(100% - 2.32rem);
    border-radius: 0.2rem;
    background: #ffffff;
    &.myswiperesult {
      height: calc(100% - 1rem);
    }
    .van-swipe-item {
      color: #fff;
      font-size: 0.2rem;
      text-align: center;
      background-color: #ffffff;
      box-shadow: 0px 0.04rem 0.02rem 0px rgba(195, 223, 214, 1);
      box-sizing: border-box;
      overflow-y: auto;
    }
    .custom-indicator {
      position: absolute;
      top: 0.62rem;
      left: 0.4rem;
      width: 93%;
      font-size: 0.4rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(36, 153, 118, 1);
      line-height: 0.56rem;
      > b {
        color: #999999;
        font-weight: 500;
      }
    }
  }
  .swipediv {
    font-size: 0.3rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.42rem;
    text-align: left;
    padding-top: 1.58rem;
    width: 88%;
    margin: 0 auto;
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
    margin-top: 0.6rem;
    text-align: center;
  }
}
.slidertitle {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: left;
  width: 88%;
  margin: 0rem auto 0.32rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.wrapperblock {
  width: 4.8rem;
  height: 3.8rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.08rem;
  padding: 0 0.72rem;
  box-sizing: border-box;
  .title {
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin: 0.4rem 0 0.16rem 0;
  }
  .contain {
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
  }
  .btn {
    width: 3rem;
    height: 0.72rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 0.4rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.72rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin: 0.8rem auto 0;
  }
}
@{aaa}.van-swipe__indicators--vertical {
  display: none;
}
</style>
