<template>
  <div class="sliderbox">
    <div class="header">
      <span v-for="item in list" :key="item">{{item}}</span>
      <!-- <span>无瘙痒问题</span>
      <span>瘙痒难忍</span>-->
    </div>
    <van-slider
      v-model="value"
      :step="50"
      bar-height="4px"
      active-color="linear-gradient(90deg,rgba(0,153,102,1) 0%,rgba(242,169,0,1) 100%)"
      @change="onChange"
    />
    <!-- <div class="groupnext" @click="groupNextBtn()">下一题</div> -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: 0
    },
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      value: 0
    };
  },
  methods: {
    onChange(value) {
      //   Toast("当前值：" + value);
      console.log("value", value);
      var val = "";
      if (value == 0) {
        val = "轻度";
      } else if (value == 50) {
        val = "中度";
      } else {
        val = "重度";
      }
      this.$emit("nextToPageslider", val, this.title, this.type);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.sliderbox {
  margin-top: 0.62rem;
  .header {
    display: flex;
    justify-content: space-between;
    color: #333333;
    font-size: 0.28rem;
    width: 6rem;
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
  width: 6rem;
  height: 0.12rem;
  background: linear-gradient(
    90deg,
    rgba(0, 153, 102, 1) 0%,
    rgba(242, 169, 0, 1) 100%
  );
  box-shadow: 0px 4px 8px 0px rgba(103, 103, 103, 0.5);
  border-radius: 0.4rem;
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
</style>