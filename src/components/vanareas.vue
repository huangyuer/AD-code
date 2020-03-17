<template>
  <div class="areacomponent">
    <van-field
      readonly
      clickable
      name="area"
      :value="formvalue"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="IsshowArea(true)"
    ></van-field>
    <img src="../assets/up.png" />
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="areaList" @confirm="onConfirm" @cancel="IsshowArea(false)" />
    </van-popup>
  </div>
</template>
<script>
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
    }
  },
  data() {
    return {
      areaList: {}, // 数据格式见 Area 组件文档,
      showArea: false,
      value: ""
    };
  },
  methods: {
    IsshowArea(bool) {
      this.showArea = bool;
      this.$emit("IsshowArea", bool);
    },
    onConfirm(values) {
      //   this.value =
      //     values.length != 0 ? values.map(item => item.name).join("/") : "";
      this.showArea = false;
      this.$emit("onConfirm", this.value);
      this.$emit("IsshowArea", false);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.areacomponent {
  position: relative;
  img {
    position: absolute;
    right: 0.3rem;
    top: calc(50% - 0.03rem);
    width: 0.28rem;
    height: 0.28rem;
    transform: rotate(90deg);
  }
}
@{aaa}.van-field__label {
  width: 2.6rem;
  font-size: 0.28rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: initial;
}
@{aaa}.van-cell {
  padding: 0.4rem 0.32rem 0.2rem 0.32rem;
}
@{aaa}.van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0.32rem !important;
  border-bottom: 0.02rem solid rgba(229, 229, 229, 1) !important;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>