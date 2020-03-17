<template>
  <div class>
    <div class="baseinfo">基础信息</div>
    <van-field v-model="form.name" label="姓名" placeholder="输入框内容右对齐" input-align="right" />
    <van-field v-model="form.tel" label="手机号" placeholder="输入框内容右对齐" input-align="right" readonly />
    <van-field v-model="form.sex" label="性别" placeholder="输入框内容右对齐" input-align="right" />
    <van-field v-model="form.birth" label="出生年月" placeholder="输入框内容右对齐" input-align="right" />
    <van-areas
      :formvalue="form.place"
      :formlabel="'所在地区（省，市）'"
      :formplaceholder="'点击选择省市区'"
      :forminputalign="'right'"
      @IsshowArea="IsshowArea"
    ></van-areas>
    <!-- <van-field
      readonly
      clickable
      name="area"
      :value="form.place"
      label="所在地区（省，市）"
      placeholder="点击选择省市区"
      @click="form.showArea = true"
      input-align="right"
    >
    <van-popup v-model="form.showArea" position="bottom">
      <van-area :area-list="areaList" @confirm="onConfirm" @cancel="form.showArea = false" />
    </van-popup>-->
    <div class="baseinfo margin52">疾病信息</div>
    <van-field v-model="form.time" label="首次诊断时间" placeholder="输入框内容右对齐" input-align="right" />
    <div class="selecthistory">
      <div v-if="!isSelectmedical">
        <div class="baseinfo history">
          <div class="left">用药历史</div>
          <div class="right" @click="editmedicinalhistory()">
            编辑
            <img :src="require('../../../../assets/up.png')" />
          </div>
        </div>
        <div class="medicinallist">
          <div class="medicinalitem">炉甘石洗剂</div>
          <div class="medicinalitem">炉甘石洗剂</div>
          <div class="medicinalitem">炉甘石洗剂</div>
          <div class="medicinalitem">炉甘石洗剂</div>
        </div>
      </div>
      <div class="selecthistoryinner" v-else>
        <div class="title">1.您是否有使用以下几种药物？</div>
        <van-checkbox-group v-model="result" direction="horizontal">
          <van-checkbox name="a">炉甘石洗剂</van-checkbox>
          <van-checkbox name="b">糠酸莫米松乳膏</van-checkbox>
          <van-checkbox name="c">糖皮质激素</van-checkbox>
          <van-checkbox name="d">薄荷酚液</van-checkbox>
        </van-checkbox-group>
      </div>
    </div>
    <div class="baseinfo">疾病严重程度</div>
    <div class="sliderbox">
      <div class="header">
        <span>无</span>
        <span>轻度</span>
        <span>中度</span>
        <span>重度</span>
      </div>
      <van-slider
        :step="33"
        v-model="form.level"
        bar-height="4px"
        active-color="linear-gradient(90deg,rgba(0, 153, 102, 1) 0%,rgba(242, 169, 0, 1) 52%,rgba(255, 63, 15, 1) 100%);"
        @change="onChange"
      />
    </div>
    <div class="saveEdit" @click="saveEdit()">保存修改</div>
  </div>
</template>
<script>
import VanAreas from "@/components/vanareas.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        tel: "123455667",
        sex: "",
        birth: "",
        place: "",
        showArea: false,
        time: "",
        level: 0
      },
      result: [],
      isSelectmedical: false
    };
  },
  methods: {
    // onConfirm(values) {
    //   this.form.place = values.map(item => item.name).join("/");
    //   this.form.showArea = false;
    // },
    IsshowArea(value) {
      this.$set(this.form, "showArea", value);
    },
    onChange(value) {
      // Toast('当前值：' + value);
    },
    editmedicinalhistory() {
      this.isSelectmedical = true;
    },
    saveEdit() {
      this.isSelectmedical = false;
    }
  },
  components: { VanAreas }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@{aaa}.van-field__label {
  width: 2.6rem;
  font-size: 0.28rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: initial;
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
.sliderbox {
  margin-top: 0.2rem;
  padding-bottom: 0.34rem;
  border-bottom: 0.02rem solid rgba(229, 229, 229, 1) !important;
  .header {
    display: flex;
    justify-content: space-between;
    color: #333333;
    font-size: 0.28rem;
    width: 6.8rem;
    margin: 0.12rem auto;
  }
}
.van-slider {
  position: relative;
  // width: 82%;
  background-color: #ebedf0;
  border-radius: 999px;
  cursor: pointer;
  margin: 0 auto;
  width: 6.8rem;
  height: 0.12rem;
  background: linear-gradient(
    90deg,
    rgba(0, 153, 102, 1) 0%,
    rgba(242, 169, 0, 1) 52%,
    rgba(255, 63, 15, 1) 100%
  );
  box-shadow: 0px 4px 8px 0px rgba(103, 103, 103, 0.5);
  border-radius: 0.4rem;
}
@{aaa}.van-slider__bar {
  background: transparent;
}
@{aaa}.van-slider__button {
  width: 0.28rem;
  height: 0.28rem;
  background: linear-gradient(
    180deg,
    rgba(0, 201, 159, 1) 0%,
    rgba(0, 153, 102, 1) 100%
  );
  box-shadow: 0px 4px 8px 0px rgba(58, 170, 133, 1);
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
  border-top: 2px solid rgba(243, 243, 243, 1);
  border-bottom: 2px solid rgba(243, 243, 243, 1);
  margin-top: 0.4rem;
  padding-bottom: 0.28rem;
  .history {
    box-sizing: border-box;
    border-bottom: 0.02px solid rgba(243, 243, 243, 1);
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
    }
  }
  .selecthistoryinner {
    padding: 0.28rem 0.32rem 0rem 0.32rem;
    box-sizing: border-box;
    .title {
      font-size: 0.3rem;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: initial;
    }
  }
}
@{aaa}.van-checkbox {
  margin-top: 0.12rem;
  margin-bottom: 0.12rem;
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