<template>
  <div>
    <div class="selecthistoryinner" v-if="medications.options.length!=0">
      <div class="title" v-if="typethis == 'notype1' || typethis == 'notype3'">{{index+'.'+medications.title}}</div>
      <van-checkbox-group @change="onChange" v-model="result" direction="horizontal">
        <van-checkbox
          v-if="key<thiskeymax && key>=thiskeymin"
          v-for="(index, key) in medications.options"
          :key="key"
          :name="index.option"
        >
          <div>{{index.option}}</div>
          <div
            class="exp"
          >{{index.remark}}</div>
        </van-checkbox>
      </van-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name:"checkboxitem",
  props: {
    typethis: {
      type: String,
      default: ""
    },
    medications:{
      type: Object,
      default: function (){
        return {}
      }
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      result: [],
      // medications: [],
      thiskeymax: 4,
      thiskeymin: 0,
    };
  },
  mounted() {
    // console.log("medications",this.medications);
    // this.getMedications();
  },
  updated() {
    // console.log(":upupuuuuuppppp", this.typethis);
    if (this.typethis == "notype1") {
      this.thiskeymin = 0;
      this.thiskeymax = 6;
    } else if (this.typethis == "notype2") {
      this.thiskeymin = 6;
      this.thiskeymax = this.medications.options.length;
    } else if (this.typethis == "notype3") {
      this.thiskeymin = 0;
      this.thiskeymax = 4;
    } else if (this.typethis == "notype4") {
      this.thiskeymin = 4;
      this.thiskeymax = this.medications.options.length;
    }
  },
  methods: {
    // getMedications() {
    //   this.$store
    //     .dispatch("patientManagement/getMedications")
    //     .then(data => {
    //       this.medications = this.$store.getters.getmedications.medications;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    onChange(name) {
      this.$emit("checkbox", this.result, this.medications._id, this.typethis);
      //   console.log("this.result", this.result);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.selecthistoryinner {
  padding: 0 0.4rem 0rem 0.4rem;
  box-sizing: border-box;
  .title {
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: initial;
    text-align: left;
  }
  .exp {
    color: #666666;
    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
@{aaa}.van-checkbox {
  margin-top: 0.12rem;
  margin-bottom: 0.12rem;
  width: 100%;
}
@{aaa}.van-checkbox__icon .van-icon {
  background: RGBA(206, 206, 206, 1);
  color: #ffffff;
}
@{aaa}.van-checkbox__icon--round .van-icon {
  border-radius: 0;
}
@{aaa}.van-checkbox__icon--checked .van-icon {
  background-color: RGBA(4, 151, 101, 1);
  border-color: RGBA(4, 151, 101, 1);
}
@{aaa}.van-checkbox__label {
  font-size: 0.28rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: initial;
  text-align: left;
}
</style>