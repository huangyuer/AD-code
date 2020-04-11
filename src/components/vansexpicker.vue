<template>
  <div :class="{ areacomponent: true, tipe: !isFirstEnter }">
    <van-field
      :class="{ color3: !isFirstEnter, color9: isFirstEnter }"
      readonly
      clickable
      :value="value"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="isFirstEnter ? (showSex = true) : (showSex = false)"
    />
    <img v-if="isFirstEnter" src="../assets/up.png" />
    <van-popup v-model="showSex" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showSex = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    formvalue: {
      type: String,
      default: "",
    },
    formlabel: {
      type: String,
      default: "",
    },
    formplaceholder: {
      type: String,
      default: "",
    },
    forminputalign: {
      type: String,
      default: "",
    },
    isFirstEnter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      columns: ["女", "男"],
      showSex: false,
      value: "",
    };
  },
  mounted() {
    this.value = this.formvalue;
    console.log("this.formvalue", this.formvalue);
  },
  methods: {
    onConfirm(val) {
      console.log("val", val);
      this.showSex = false;
      this.value = val;
      this.$emit("IsshowSex", val);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./picker.less";
.areacomponent {
  &.tipe {
    @{aaa}.van-field__control {
      padding-right: 0;
    }
  }
}
</style>
