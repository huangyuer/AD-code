<template>
  <div class="editpersonalInfo" v-if="Object.keys(user).length > 0">
    <div class="baseinfo">基础信息</div>
    <van-field
      :class="{ color3: !isFirstEnter, color9: isFirstEnter }"
      :readonly="!isFirstEnter && user.name!=''"
      v-model="form.name"
      label="姓名"
      placeholder
      input-align="right"
    />
    <van-field
      :class="{ color3: !isFirstEnter, color9: isFirstEnter }"
      v-model="form.tel"
      label="手机号"
      placeholder
      input-align="right"
      readonly
    />
    <van-SexPicker
      :formvalue="form.sex"
      :formtype="'year-month'"
      :formlabel="'性别'"
      :formplaceholder="''"
      :forminputalign="'right'"
      :isFirstEnter="isFirstEnter || !user.hasOwnProperty('sex') || user.sex==''"
      @IsshowSex="IsshowSex"
    ></van-SexPicker>
    <van-time-picker
      :formvalue="form.birth"
      :formtype="'date'"
      :formlabel="'出生年月日'"
      :formplaceholder="''"
      :forminputalign="'right'"
      :isFirstEnter="isFirstEnter || !user.hasOwnProperty('birthday') || user.birthday==''"
      @IsshowTime="IsshowTime"
    ></van-time-picker>
    <van-areas
      :formvalue="form.province + form.area"
      :formlabel="'所在地区（省，市）'"
      :formplaceholder="''"
      :forminputalign="'right'"
      :columnsnum="2"
      :isFirstEnter="isFirstEnter"
      @IsshowArea="IsshowArea"
      @onConfirm="onConfirmplace"
    ></van-areas>
    <div class="baseinfo margin52">疾病信息</div>
    <van-disease-picker
      :formvalue="form.disease"
      :formtype="'year-month'"
      :formlabel="'确诊疾病'"
      :formplaceholder="''"
      :forminputalign="'right'"
      :isFirstEnter="isFirstEnter || !user.hasOwnProperty('disease') || user.disease==''"
      @IsshowDisease="IsshowDisease"
    ></van-disease-picker>
    <van-time-picker
      :formvalue="form.time"
      :formtype="'year'"
      :formlabel="'首次确诊年份'"
      :formplaceholder="''"
      :forminputalign="'right'"
      :isFirstEnter="isFirstEnter || !user.hasOwnProperty('diaTime') || user.diaTime==''"
      @IsshowTime="IsdiaTime"
    ></van-time-picker>
    <div class="selecthistory">
      <div v-if="!isSelectmedical">
        <div class="baseinfo history">
          <div class="left">用药历史</div>
          <div class="right" @click="editmedicinalhistory()">
            编辑
            <img :src="require('../../../../assets/up.png')" />
          </div>
        </div>
        <div class="medicinallist" v-if="user.medications.length>0">
          <div
            :class="{ medicinalitem: true, islong: length[key] > 16 }"
            v-for="(index, key) in user.medications"
            :key="key"
          >{{ index }}</div>
        </div>
      </div>
      <div class="selecthistoryinner" v-if="isSelectmedical">
        <div class="title">近半年治疗该疾病使用过的药物？</div>
        <van-checkbox-group
          @change="onCheckGroup"
          v-model="result"
          direction="horizontal"
          ref="checkboxGroup"
        >
          <div style="width:100%" v-for="(index, key) in medications" :key="key">
            <van-checkbox v-if="key < medications.length - 1" :name="index.name">
              <div>{{ index.name }}</div>
              <div class="exp">{{ index.remark }}</div>
            </van-checkbox>
          </div>
        </van-checkbox-group>
        <van-checkbox
          :name="medications[medications.length - 1].name"
          ref="checkboxes"
          @click="checkAll"
          v-model="checkedmediEnd"
        >
          <div>{{ medications[medications.length - 1].name }}</div>
          <div class="exp">{{ medications[medications.length - 1].remark }}</div>
        </van-checkbox>
      </div>
    </div>
    <div class="selecthistory">
      <div class="baseinfo">您近两个月疾病严重度是？</div>
      <div class="sliderbox">
        <div class="header">
          <span>轻度</span>
          <span>中度</span>
          <span>严重</span>
        </div>
        <van-slider
          :step="50"
          v-model="level"
          bar-height=".16rem"
          active-color="linear-gradient(90deg,rgba(0, 153, 102, 1) 0%,rgba(242, 169, 0, 1) 52%,rgba(255, 63, 15, 1) 100%);"
          @change="onChange"
        />
      </div>
    </div>
    <div class="saveEdit" @click="upMyInfo()">{{ isFirstEnter ? "保存" : "保存修改" }}</div>
  </div>
</template>
<script>
import VanAreas from "@/components/vanareas.vue";
import VanTimePicker from "@/components/vantimepicker.vue";
import VanSexPicker from "@/components/vansexpicker";
import VanDiseasePicker from "@/components/vandiseasepicker";
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        name: "",
        tel: "",
        sex: "",
        birth: "",
        privince: "",
        area: "",
        showArea: false,
        disease: "",
        time: "",
        level: "无"
      },
      level: 0,
      showtime: false,
      result: [],
      length: [],
      isSelectmedical: false,
      isFirstEnter: false,
      medications: [],
      checkedmediEnd: false,
      address: {},
      user: {},
      silderBar: ""
    };
  },
  mounted() {
    this.getMyInfo();
    this.getMedications();
    // this.getMyAddress();
  },
  methods: {
    init() {
      this.$set(this.form, "name", this.user.name);
      this.$set(this.form, "tel", this.user.phone);
      this.$set(this.form, "sex", this.user.sex);
      this.$set(this.form, "birth", this.user.birthday);
      this.$set(this.form, "province", this.user.province);
      this.$set(this.form, "area", this.user.city);
      this.$set(this.form, "disease", this.user.disease);
      this.$set(this.form, "time", this.user.diaTime);
      this.$set(this.form, "level", this.user.level);
      if (this.user.level == "轻度") {
        this.level = 0;
      } else if (this.user.level == "中度") {
        this.level = 50;
        document
          .getElementsByClassName("van-slider__bar")[0]
          .classList.add("backgroundColor50");
      } else if (this.user.level == "严重") {
        this.level = 100;
        document
          .getElementsByClassName("van-slider__bar")[0]
          .classList.add("backgroundColor100");
      } else {
        this.level = 0;
      }
    },
    onConfirmplace(values) {
      this.$set(this.form, "province", values[0].name);
      this.$set(this.form, "area", values[1].name);
    },
    IsshowTime(value) {
      this.$set(this.form, "birth", value);
    },
    IsdiaTime(value) {
      this.$set(this.form, "time", value);
    },
    IsshowSex(value) {
      this.$set(this.form, "sex", value);
    },
    IsshowDisease(value) {
      this.$set(this.form, "disease", value);
    },
    IsshowArea(value) {
      this.$set(this.form, "showArea", value);
    },
    onCheckGroup(name) {
      console.log("this.result====>", this.result);
    },
    checkAll() {},
    onChange(value) {
      var botton = document.getElementsByClassName(
        "van-slider__button-wrapper"
      )[0];
      if (value == 0) {
        this.$set(this.form, "level", "轻度");
        botton.style.right = "-0.22rem";
      } else if (value == 50) {
        botton.style.right = "0";
        document
          .getElementsByClassName("van-slider__bar")[0]
          .classList.add("backgroundColor50");
        if (
          document
            .getElementsByClassName("van-slider__bar")[0]
            .classList.contains("backgroundColor100")
        ) {
          document
            .getElementsByClassName("van-slider__bar")[0]
            .classList.remove("backgroundColor100");
        }
        this.$set(this.form, "level", "中度");
      } else {
        botton.style.right = "0.22rem";
        if (
          document
            .getElementsByClassName("van-slider__bar")[0]
            .classList.contains("backgroundColor50")
        ) {
          document
            .getElementsByClassName("van-slider__bar")[0]
            .classList.remove("backgroundColor50");
        }
        document
          .getElementsByClassName("van-slider__bar")[0]
          .classList.add("backgroundColor100");
        this.$set(this.form, "level", "严重");
      }
    },
    getBLen(str) {
      if (str == null) return 0;
      if (typeof str != "string") {
        str += "";
      }
      return str.replace(/[^\x00-\xff]/g, "01").length;
    },
    editmedicinalhistory() {
      this.isSelectmedical = true;
    },
    upMyInfo() {
      // this.isSelectmedical = false;
      var upmyinfo = {
        name: this.form.name,
        sex: this.form.sex,
        birthday: this.form.birth,
        province: this.form.province,
        city: this.form.area,
        disease: this.form.disease,
        diaTime: this.form.time,
        medications: this.result,
        level: this.form.level
      };
      this.$store
        .dispatch("patientManagement/upMyInfo", upmyinfo)
        .then(data => {
          this.$router.push({ path: "/personalInfo" });
        })
        .catch(e => {});
    },
    getMedications() {
      this.$store
        .dispatch("patientManagement/getMedications")
        .then(data => {
          this.medications = this.$store.getters.getmedications.medications;
        })
        .catch(e => {});
    },
    getMyInfo() {
      this.$store
        .dispatch("patientManagement/getMyInfo")
        .then(data => {
          this.user = this.$store.getters.getmyinfo.user;
          if (this.user.medications) {
            this.result = this.user.medications;
            for (var i = 0; i < this.user.medications.length; i++) {
              this.$set(this.length, i, this.getBLen(this.user.medications[i]));
            }
          }
          if (this.user.createdAt == this.user.updatedAt) {
            this.isFirstEnter = true;
            this.isSelectmedical = true;
          } else {
            this.isFirstEnter = false;
            this.isSelectmedical = false;
          }
          this.init();
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    }
  },
  watch: {
    checkedmediEnd: function(val) {
      if (val) {
        this.$refs.checkboxGroup.toggleAll(false);
        this.result = [];
        this.result.push(this.medications[this.medications.length - 1].name);
      } else {
        if (this.result.length > 0) {
          for (var i = 0; i < this.result.length; i++) {
            if (
              this.result[i] ==
              this.medications[this.medications.length - 1].name
            ) {
              this.result.splice(i, 1);
            }
          }
        }
      }
    },
    result: function(val, oldVal) {
      if (
        oldVal.length > 0 &&
        oldVal[0] == this.medications[this.medications.length - 1].name &&
        val.length > 0
      ) {
        this.checkedmediEnd = false;
      }
    }
  },
  components: { VanAreas, VanTimePicker, VanSexPicker, VanDiseasePicker }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.color3 {
  @{aaa}.van-field__label {
    width: 2.6rem;
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: initial;
  }
}
.color9 {
  @{aaa}.van-field__label {
    width: 2.6rem;
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: #999999;
    line-height: initial;
  }
}
.editpersonalInfo {
  padding-bottom: 0.34rem;
}
// @{aaa}.van-cell:not(:last-child)::after {
//   border: 0.02rem solid rgba(229, 229, 229, 1);
// }
@{aaa}.van-cell {
  padding: 0.4rem 0.32rem 0.2rem 0.32rem;
}
@{aaa}.van-cell::after {
  left: 0.32rem !important;
  border: 0.02rem solid rgba(229, 229, 229, 1) !important;
}
@{aaa}.van-field__control {
  color: #999999;
  font-size: 0.28rem;
  // font-family: "PingFangSC-Medium";
}
.sliderbox {
  margin-top: 0.2rem;
  // padding-bottom: 0.34rem;
  border-bottom: none !important;
  .header {
    display: flex;
    justify-content: space-between;
    color: #333333;
    font-size: 0.28rem;
    width: 6.8rem;
    margin: 0.12rem 0.32rem 0.32rem 0.32rem;
  }
}
.van-slider {
  position: relative;
  cursor: pointer;
  margin: 0 0.32rem 0.16rem 0.32rem;
  width: 6.8rem;
  height: 0.16rem;
  background: #cdcdcd;
  box-shadow: 0px 0.04rem 0.08rem 0px rgba(103, 103, 103, 0.5);
  border: 0.02rem solid rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-radius: 0.4rem;
}
@{aaa}.van-slider__bar {
  background: linear-gradient(
    90deg,
    rgba(0, 153, 102, 1) 0%,
    rgba(242, 169, 0, 1) 52%,
    rgba(255, 63, 15, 1) 100%
  ) !important;
  &.backgroundColor50 {
    background: linear-gradient(
      90deg,
      rgba(0, 153, 102, 1) 0%,
      rgba(242, 169, 0, 1) 100%
    ) !important;
  }
  &.backgroundColor100 {
    background: linear-gradient(
      90deg,
      rgba(0, 153, 102, 1) 0%,
      rgba(242, 169, 0, 1) 52%,
      rgba(255, 63, 15, 1) 100%
    ) !important;
  }
}
@{aaa}.van-slider__button {
  width: 0.44rem;
  height: 0.44rem;
  border: 0.04rem solid #ffffff;
  background: linear-gradient(
    180deg,
    rgba(0, 201, 159, 1) 0%,
    rgba(0, 153, 102, 1) 100%
  );
  box-shadow: 0px 0.04rem 0.08rem 0px rgba(58, 170, 133, 1);
  right: -0.22rem;
}
@{aaa}.van-slider__button-wrapper {
  right: -0.22rem;
}
.baseinfo {
  font-size: 0.32rem;
  font-family: "PingFangSC-Medium";
  padding: 0.4rem 0.32rem 0.16rem 0;
  border-bottom: 0.02rem solid rgba(229, 229, 229, 1) !important;
  font-weight: 500;
  color: rgba(36, 36, 36, 1);
  line-height: initial;
  margin-left: 0.32rem;
  padding-bottom: 0.16rem;
  &.margin52 {
    padding: 0.52rem 0.32rem 0.16rem 0;
  }
}
.selecthistory {
  border-top: 0.02rem solid rgba(243, 243, 243, 1);
  border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
  margin-top: 0.4rem;
  padding-bottom: 0.28rem;
  .history {
    box-sizing: border-box;
    border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
    height: 0.78rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 0.3rem;
      font-family: "PingFangSC-Medium";

      font-weight: 500;
      color: rgba(36, 36, 36, 1);
      line-height: initial;
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 0.28rem;
      font-family: "PingFangSC-Regular";

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: initial;
      img {
        transform: rotate(90deg);
        width: 0.28rem;
        height: 0.28rem;
        margin-left: 0.12rem;
      }
    }
  }
  .medicinallist {
    overflow: hidden;
    padding-top: 0.24rem;
    .medicinalitem {
      width: 3.2rem;
      height: 0.56rem;
      background: rgba(247, 247, 247, 1);
      border-radius: 0.28rem;
      font-size: 0.28rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      line-height: 0.56rem;
      text-align: center;
      float: left;
      margin: 0 0.14rem 0.12rem 0.32rem;
      &.islong {
        width: 6.9rem;
      }
    }
  }
  .selecthistoryinner {
    padding: 0.28rem 0.32rem 0rem 0.32rem;
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
}
.saveEdit {
  text-align: center;
  width: 6.4rem;
  height: 0.8rem;
  background: rgba(0, 153, 101, 1);
  border-radius: 0.4rem;
  font-size: 0.3rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8rem;
  text-align: center;
  margin: 0.6rem auto 0.36rem;
}
</style>
