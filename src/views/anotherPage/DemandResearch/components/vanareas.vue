<template>
  <div class="areacomponent">
    <div class="swipediv">{{ dataitem.title }}</div>
    <van-field
      :class="{ color3: !isFirstEnter, color9: isFirstEnter }"
      readonly
      clickable
      name="area"
      :value="value"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="IsshowArea(true)"
    ></van-field>
    <img class="areacomponent-img" :src="require('../../../../assets/up.png')" />
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :columns-num="columnsnum"
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="IsshowArea(false)"
      />
    </van-popup>
  </div>
</template>
<script>
// import a from "@/components/area";
import areaList from "../../../../components/area";
export default {
  props: {
    dataitem: {
      type: Object,
      default: function () {
        return {};
      },
    },
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
    columnsnum: {
      type: Number,
      default: 2
    },
    isFirstEnter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      areaList: areaList, // 数据格式见 Area 组件文档,
      showArea: false,
      value: ""
    };
  },
  mounted() {
    this.value = this.formvalue;
  },
  methods: {
    IsshowArea(bool) {
      this.showArea = bool;
    },
    onConfirm(values) {
      this.value = values.map(item => item.name).join("");
      this.showArea = false;
      this.$emit("onConfirm", values);
    }
  },
  watch: {
    formvalue(newVal, val) {
      this.value = newVal;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@import "../../../../components/picker.less";
.areacomponent {
    width: 88%;
    margin: 0 auto;
    padding-bottom: 0.48rem;
    .swipediv {
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.42rem;
        text-align: left;
        margin: 0 auto 0.28rem;
    }
    @{aaa}.van-cell {
        padding: 0.19rem 0.32rem 0.19rem 0.32rem;
        border: .02rem solid #E5E5E5;
    }
    .areacomponent-img {
        transform: rotate(180deg);
    }
  @{aaa}.van-field__control--right {
    font-size: 0.28rem;
    color: #333333;
    // font-family: "PingFangSC-Medium";
    font-weight: 500;
    line-height: initial;
  }
}
</style>
