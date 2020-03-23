<template>
  <div class="areacomponent">
    <van-field
      clickable
      name="area"
      :value="value"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="IsshowArea(true)"
    ></van-field>
    <img src="../assets/up.png" />
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
import areaList from "../components/area";
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
    columnsnum: {
      type: Number,
      default: 2
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
      this.$emit("IsshowArea", bool);
    },
    onConfirm(values) {
      this.value = values.map(item => item.name).join("");
      console.log(values);
      this.showArea = false;
      this.$emit("onConfirm", values);
      this.$emit("IsshowArea", false);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./picker.less";
</style>