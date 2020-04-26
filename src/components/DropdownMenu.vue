<template>
  <van-dropdown-menu active-color="#009966">
    <van-dropdown-item
      :title="title"
      v-model="valueinner"
      :options="option"
      @change="changeValue"
    />
    <!-- <van-dropdown-item v-if="option2!=[]" v-model="value2inner" @change="changeValue2" :options="option2" /> -->
  </van-dropdown-menu>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    option: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      valueinner: this.$props.value
    };
  },
  mounted() {},
  methods: {
    changeValue(value) {
      this.$emit("DropdownchangeValue", value);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";

.van-dropdown-menu {
  float: left;
  height: auto;
  &:after {
    border: 0;
  }
}
@{aaa} .van-dropdown-menu__item {
  padding-right: 0.56rem;
  font-family: "PingFangSC-Medium";
}
@{aaa} .van-dropdown-menu__title {
  font-size: 0.28rem;
  padding: 0 0.32rem;
  line-height: initial;
  &:after {
    // content:none;
    width: 0.28rem;
    height: 0.28rem;
    border: 0;
    background-image: url("../assets/up.png");
    background-size: 100% 100%;
    transform: rotate(180deg);
    top: calc(50% - 0.05rem);
    right: -0.1rem;
  }
  &.van-dropdown-menu__title--down::after {
    margin-top: -0.01rem;
    transform: rotate(0);
    top: calc(50% - 0.15rem);
    background-image: url("../assets/upgreen.png");
    background-size: 100% 100%;
  }
}
@{aaa}.van-dropdown-menu__item {
  &:before {
    content: "";
    border: 0;
  }
}
@{aaa}.van-overlay {
  top: 0.03rem;
}
@{aaa} .van-cell:not(:last-child)::after {
  border: 0;
}
@{aaa} .van-cell {
  font-size: 0.28rem;
  padding: 0.16rem 0.32rem;
  font-family: "PingFangSC-Regular";
  line-height: initial;
}
@{aaa}.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
}
@{aaa}.van-dropdown-item__content {
  padding-top: 0.22rem;
  padding-bottom: 0.36rem;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>
