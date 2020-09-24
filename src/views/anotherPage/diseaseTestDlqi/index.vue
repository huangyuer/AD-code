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
      <div
        :class="{
          swiperInner: true,
          swiperesult: isShowresult
        }"
      >
        <!-- <van-swipe
          v-if="poemQuestion.length > 0"
          :class="{ 'my-swipe': true, myswiperesult: isShowresult }"
          ref="myswiper"
          :loop="false"
          :show-indicator="false"
          :initial-swipe="0"
          indicator-color="white"
          vertical
          :stop-propagation="false"
          @change="onChange"
        > -->
          <!-- <van-swipe-item> -->
            <div v-if="!isShowresult" style="padding-top:.6rem">
                <div
                  v-for="(item, index) in poemQuestion"
                  :key="index">
                  <slider-box-item
                    v-if="item.type == 'radio'"
                    :index="item.no"
                    :dataitem="item"
                    @sliderbox="sliderbox"
                  ></slider-box-item>
                </div>
                <div class="groupnext" @click="submitAnswer()">提交</div>
            </div>
            <div v-show="isShowresult" style="text-align: center;">
              <result-info :dataresult="levelresult" :type="'dlqi'"></result-info>
            </div>
          <!-- </van-swipe-item> -->
        <!-- </van-swipe> -->
      </div>
    </div>
  </div>
</template>
<script>
import ResultInfo from "../../patientManagement/diseaseTest/components/resultInfo"
import SliderBoxItem from "../components/sliderBoxItem"
import { Toast } from "vant";
export default {
  data() {
    return {
      optionsFirst: [],
      currentIndex: 0,
      isShowresult: false, //是否显示诊断结果
      //登陆
      poemQuestion: [],
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
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
  mounted() {},
  methods: {
    onChange(index) {
      // console.log("index,,,,,,,",index);
    },
    sliderbox(item, current, index) {
      var objradio = {};
      objradio["question"] = item._id;
      objradio["answers"] = {};
      objradio.answers[current] = 0;
      var index = this.detail.findIndex(element => {
        return element.question == item._id
      })
      if (index === -1) {
        this.detail.push(objradio);
      } else {
        this.detail.splice(index, 1, objradio);
      }
    },
    getQuestions() {
      this.$store
        .dispatch("patientManagement/getQuestions",'dlqi')
        .then(data => {
          this.poemQuestion = this.$store.getters.getquesion;
          this.poemQuestion.forEach(element => {
            let objradio = {};
            objradio["question"] = element._id;
            objradio["answers"] = {};
            objradio.answers[element.options[0].option] = 0;
            this.detail.push(objradio);
          })
        })
    },
    submitAnswer() {
      this.$store
        .dispatch("patientManagement/submitAnswer", this.detail)
        .then(response => {
          Toast(response.msg);
          this.isShowresult = true;
          this.levelresult = response.data;
        })
    }
  },
  components: {
    ResultInfo,
    SliderBoxItem,
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
      height: calc(100vh - 1rem);
      border-radius: 0.2rem;
      // padding: 0.6rem 0 0 0;
      border: 0;
      background-color: #ffffff;
      box-sizing: border-box;
      padding-bottom: 0.4rem;
      overflow: scroll;
      &.swiperesult {
        height: 10rem;
      }
      // &.swiperone {
      //   height: calc(100vh - 2.6rem);
      // }
    }
    .swiperWapper {
      position: relative;
      width: 100%;
      // margin-top: 0.6rem;
      margin-bottom: 0.6rem;
      height: calc(100% - 1rem);
      border-radius: 0.2rem;
      background-color: #ffffff;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
  @{aaa}.my-swipe {
    position: relative;
    width: 100%;
    // margin-top: 0.6rem;
    height: 100%;
    border-radius: 0.2rem;
    background-color: #ffffff;
    box-sizing: border-box;
    &.myswiperesult {
      // height: calc(100% - 1rem);
    }
    .van-swipe-item {
      color: #fff;
      font-size: 0.2rem;
      text-align: center;
      background-color: #ffffff;
      box-shadow: 0px 0.04rem 0.02rem 0px rgba(195, 223, 214, 1);
      box-sizing: border-box;
      overflow-y: scroll;
      padding-bottom: 0.4rem;
      border-radius: 0.2rem;
      .logo {
        width: 1.6rem !important;
        height: 1.32rem !important;
        margin: 0.6rem auto 0.6rem;
      }
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
  background-color: rgba(255, 255, 255, 1);
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
    background-color: rgba(0, 153, 102, 1);
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
