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
      <div class="swiperInner">
        <div style="padding-top:.6rem">
            <div class="group-title">{{personalQuestion.group}}</div>
            <radio-box-item
            v-if="personalQuestion.qsList"
            :dataitem="personalQuestion.qsList[0]"
            :index="1"
            @radiobox="radiobox"
            ></radio-box-item>
            <van-areas
            v-if="personalQuestion.qsList"
            :dataitem="personalQuestion.qsList[1]"
            :formvalue="place"
            :formplaceholder="'请选择所在地区'"
            :forminputalign="'left'"
            :columnsnum="3"
            @onConfirm="onConfirm"
            ></van-areas>
            <div class="group-title">{{demandQuestion.group}}</div>
            <div v-for="item in demandQuestion.qsList" :key="item._id" style="padding-bottom: 0.48rem;">
                <check-box-item
                :dataitem="item"
                @checkbox="checkbox"
                ></check-box-item>
            </div>
            <div class="group-title">{{researchQuestion.group}}</div>
            <div v-for="(tip, index) in researchQuestion.qsList" :key="tip._id">
                <radio-box-item
                :dataitem="tip"
                :index="index"
                @radiobox="radiobox"
                ></radio-box-item>
            </div>
            <div class="submit" @click="submitAnswer">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RadioBoxItem from "./components/radioboxItem";
import VanAreas from "./components/vanareas";
import CheckBoxItem from "./components/checkboxitem";
import { Toast } from "vant";

export default {
  name:'demandResearch',
  data() {
    return {
      isShowresult: false, //是否显示诊断结果
      personalQuestion: [],
      demandQuestion: [],
      researchQuestion: [],
      place: '',
      current: 0,
      questions: [],
      detail: [], //提交的答案
      final: false,
      levelresult: {}
    };
  },
  async created() {
    await this.getQuestions();
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
  methods: {
    onConfirm(values) {
      let current = values[0].name + values[1].name + values[2].name
      var objradio = {};
      objradio["question"] = this.personalQuestion.qsList[1]._id;
      objradio["answers"] = {};
      objradio.answers[current] = 0;
      var index = this.detail.findIndex(element => {
        return element.question == this.personalQuestion.qsList[1]._id
      })
      if (index === -1) {
        this.detail.push(objradio);
      } else {
        this.detail.splice(index, 1, objradio);
      }
    },
    radiobox(item, current, key) {
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
    checkbox(result, dataItem) {
      var objradio = {};
      objradio["question"] = dataItem._id;
      objradio["answers"] = {};
      var index = this.detail.findIndex(element => {
        return element.question == dataItem._id
      })
      result.forEach(element => {
        objradio.answers[element] = 0;
      });
      if (index === -1) {
        this.detail.push(objradio);
      } else {
        this.detail.splice(index, 1, objradio);
      }
    },
    getQuestions() {
      this.$store
        .dispatch("patientManagement/getQuestions",'research')
        .then(data => {
            this.personalQuestion = this.$store.getters.getquesion[0];
            this.demandQuestion   = this.$store.getters.getquesion[1];
            this.researchQuestion = this.$store.getters.getquesion[2]; 
        })
        .catch(e => {});
    },
    submitAnswer() {
      console.log("this.detail",this.detail);
      if (this.detail.length < 7) {
        Toast('请完成先完成调研再提交哦');
        return
      }
      this.$store
        .dispatch("patientManagement/submitAnswer", this.detail)
        .then(response => {
            Toast(response.msg);
            this.levelresult = response.data;
        })
    }
  },
  components: {
    RadioBoxItem,
    CheckBoxItem,
    VanAreas
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@{aaa}.van-picker__mask {
position: absolute;
    top: 1px;
    left: 0;
}
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
      border: 0;
      background-color: #ffffff;
      box-sizing: border-box;
      padding-bottom: 0.4rem;
      overflow: scroll;
      &.swiperesult {
        height: 10rem;
      }
    }
  }
  .submit {
    width: 6rem;
    height: .8rem;
    background: #009966;
    border-radius: .4rem;
    font-size: .3rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .8rem;
    text-align: center;
    margin: 0 auto;
  }
}
.group-title {
    width: 88%;
    margin: 0 auto .48rem;
    font-size: .32rem;
    font-weight: 500;
    color: #009966;
}
</style>
