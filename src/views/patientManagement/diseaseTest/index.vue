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
      <van-swipe
        class="my-swipe"
        ref="myswiper"
        :loop="false"
        :show-indicator="false"
        :touchable="false"
        indicator-color="white"
        @change="onChange"
      >
        <van-swipe-item v-for="(item,index) in questions" :key="index">
          <div class="swipediv">{{item.no + "." + item.title}}</div>
          <radio-box
            v-if="item.type=='radio' && !item.isSpecial"
            :list="item.options"
            :title="item._id"
            :type="item.type"
            @nextToPageradiobox="nextToPageradiobox"
          ></radio-box>
          <check-box
            v-if="item.type=='checkbox' && !item.isSpecial"
            :list="item.options"
            :title="item._id"
            :type="item.type"
            @nextToPagecheckbox="nextToPagecheckbox"
          ></check-box>
          <slider-box
            v-if="item.isSpecial"
            :list="item.options"
            :title="item._id"
            :type="'slider'"
            @nextToPageslider="nextToPageslider"
          ></slider-box>
          <div v-if="current+1<total" class="groupnext" @click="groupNextBtn()">下一题</div>
          <div v-if="current+1==total" class="groupnext" @click="uptoCommit()">提交</div>
        </van-swipe-item>
        <van-swipe-item>
          <result-info :dataresult="levelresult"></result-info>
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator" v-if="current+1<=total">
          {{ current + 1 }}
          <b>/{{total}}</b>
        </div>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import CheckBox from "./components/checkbox";
import RadioBox from "./components/radiobox";
import SliderBox from "./components/sliderbox";
import ResultInfo from "./components/resultInfo";
import { Toast } from "vant";
export default {
  data() {
    return {
      current: 0,
      questions: [],
      total: 0,
      detail: [], //提交的答案
      type: "",
      typeS: "",
      objradio: {},
      objcheck: {},
      objslider: {},
      final: false,
      levelresult: {}
    };
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    submitAnswer() {
      this.$store
        .dispatch("patientManagement/submitAnswer", this.detail)
        .then(response => {
          //   console.log("response", response);
          Toast(response.msg);
          this.$refs.myswiper.next();
          this.levelresult = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onChange(index) {
      if (
        index < this.questions.length &&
        this.questions[index].isSpecial == true
      ) {
        this.nextToPageslider(
          this.questions[index].options[0],
          this.questions[index]._id,
          "slider"
        );
      }
    },
    next() {
      this.type = "";
      this.current = this.current + 1;
      if (!this.final) {
        this.$refs.myswiper.next();
      } else {
        this.submitAnswer();
      }
    },
    groupNextBtn() {
      if (this.type == "radio") {
        this.detail.push(this.objradio);
        this.next();
      } else if (this.type == "checkbox") {
        this.detail.push(this.objcheck);
        this.next();
      } else if (this.type == "slider") {
        this.detail.push(this.objslider);
        this.next();
      } else {
        Toast("请先作答");
      }
    },
    uptoCommit() {
      this.final = true;
      this.groupNextBtn();
    },
    nextToPageradiobox(val, title, type) {
      console.log("val--radio", val, title);
      this.type = type;
      this.objradio["question"] = title;
      this.objradio["answers"] = {};
      this.objradio.answers[val] = 0;
    },
    nextToPagecheckbox(result, title, type) {
      console.log("val--radio", result, title);
      this.type = type;
      this.objcheck["question"] = title;
      this.objcheck["answers"] = {};
      for (var i = 0; i < result.length; i++) {
        this.objcheck.answers[result[i]] = 0;
      }
    },
    nextToPageslider(val, title, type) {
      this.type = type;
      this.objslider["question"] = title;
      this.objslider["answers"] = {};
      this.objslider.answers[val] = 0;
    },
    getQuestions() {
      this.$store
        .dispatch("patientManagement/getQuestions")
        .then(data => {
          this.questions = this.$store.getters.getquesion.questions;
          this.total = this.$store.getters.getquesion.total;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: { CheckBox, RadioBox, SliderBox, ResultInfo }
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
  }
  @{aaa}.my-swipe {
    position: relative;
    width: 100%;
    height: 10rem;
    border-radius: 0.2rem;
    background: #ffffff;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 0.2rem;
      box-shadow: 0px 4px 2px 0px rgba(195, 223, 214, 1);
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
    margin-top: 2.96rem;
  }
}
</style>