<template>
  <div
    :class="{
      areacomponent: true,
      tipe: !isFirstEnter,
      isyear: formtype == 'year',
    }"
  >
    <van-field
      :class="{ color3: !isFirstEnter, color9: isFirstEnter }"
      readonly
      clickable
      :value="value"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="clickSelect()"
    />
    <img v-if="isFirstEnter" src="../assets/up.png" />
    <van-popup v-model="showdate" position="bottom">
      <van-datetime-picker
        :class="{ year: formtype == 'year' }"
        v-model="currentDate"
        @cancel="showdate = false"
        @confirm="onConfirm"
        :type="formtype"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  props: {
    formvalue: {
      type: String,
      default: ""
    },
    formlabel: {
      type: String,
      default: ""
    },
    formplaceholder: {
      type: String,
      default: ""
    },
    forminputalign: {
      type: String,
      default: ""
    },
    formshowArea: {
      type: Boolean,
      default: false
    },
    formtype: {
      type: String,
      default: ""
    },
    isFirstEnter: {
      type: Boolean,
      default: true
    },
    noTouch:{
      type: Boolean,
      default: false,
    },
    noselectFirst:{
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nowdate: new Date(),
      showdate: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      value: "",
    };
  },
  watch:{
    formvalue(val){
      this.value=val;
    },
  },
  mounted() {
    var year = this.nowdate.getFullYear();
    var month = this.nowdate.getMonth();
    var date = this.nowdate.getDate();
    this.maxDate = new Date(year, month, date);
    this.value = this.formvalue;
  },
  methods: {
    clickSelect(){
      if(this.isFirstEnter && !this.noTouch){
        this.showdate = true;
      }else{
        this.showdate = false;
      }
      if(this.noselectFirst){
        Toast('请您先选择确诊疾病');
      }
    },
    onConfirm(value) {
      var d = new Date(value);
      if (this.formtype == "date") {
        var datetime =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1 < 10
            ? "0" + (d.getMonth() + 1)
            : d.getMonth() + 1) +
          "-" +
          (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
      } else {
        // var datetime =
        //   d.getFullYear() +
        //   "-" +
        //   (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1);
        var datetime = d.getFullYear().toString();
      }
      this.showdate = false;
      this.value = datetime;
      this.$emit("IsshowTime", datetime);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@import "./picker.less";
.year {
  @{aaa}.van-picker-column:not(:first-child) {
    display: none;
  }
}
.areacomponent {
  position: relative;
  &.tipe {
    @{aaa}.van-field__control {
      padding-right: 0;
    }
  }
  &.isyear {
    @{aaa}.van-cell {
      padding: 0.7rem 0.32rem 0.2rem 0.32rem;
      display: flex;
      align-items: center;
    }
    @{aaa}img {
      top: calc(50% + 0.1rem);
    }
  }
}
</style>
