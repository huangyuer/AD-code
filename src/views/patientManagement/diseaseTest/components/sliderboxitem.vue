<template>
  <div class="sliderwapper">
    <div class="swipediv">{{ index + "." + dataitem.title }}</div>
    <div class="header">
      <span v-for="item in dataitem.options" :key="item.option">
        {{
        item.option
        }}
      </span>
    </div>
    <van-slider
      v-model="value"
      :step="step"
      bar-height=".16rem"
      active-color="linear-gradient(90deg,rgba(0,153,102,1) 0%,rgba(242,169,0,1) 52%,rgba(255,63,15,1) 100%)"
      @change="onChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    dataitem: {
      type: Object,
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    },
    istruefirst: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: 0,
      step: 0
    };
  },
  created() {
    this.step = 100 / (this.dataitem.options.length - 1);
  },
  methods: {
    changeStep(index, value) {
      if (index == 1) {
        if (value == 25) {
          this.value = 20;
        } else if (value == 50) {
          this.value = 42;
        } else if (value == 75) {
          this.value = 65;
        }
      } else if (index == 2) {
        if (value == 25) {
          this.value = 33;
        } else if (value == 50) {
          this.value = 53;
        } else if (value == 75) {
          this.value = 75;
        }
      } else if (index == 3 || index == 5 || index == 6) {
        if (value == 25) {
          this.value = 35;
        } else if (value == 50) {
          this.value = 56;
        }
      }
    },
    onChange(value) {
      var step = 100 / (this.dataitem.options.length - 1);
      var index = value / step;
      this.$emit(
        "sliderbox",
        this.dataitem,
        this.dataitem.options[index].option,
        this.index
      );
      if (this.istruefirst) {
        var botton = document.getElementsByClassName(
          "van-slider__button-wrapper"
        )[this.index - 1];
        this.changeStep(this.index - 1, value);
      } else {
        var botton = document.getElementsByClassName(
          "van-slider__button-wrapper"
        )[this.index - 4];
        this.changeStep(this.index - 4, value);
      }
      if (value == 100) {
        botton.style.right = "0.22rem";
      } else if (value == 0) {
        botton.style.right = "-0.22rem";
      } else {
        botton.style.right = "0";
      }
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.sliderwapper {
  width: 88%;
  margin: 0 auto;
  .header {
    display: flex;
    justify-content: space-between;
    color: #333333;
    font-size: 0.28rem;
    width: 100%;
    margin: 0.28rem auto;
  }
  .swipediv {
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.42rem;
    text-align: left;
    // padding-top: 0.48rem;
  }
}
.van-slider {
  position: relative;
  margin: 0 auto 0.62rem;
  width: 100%;
  height: 0.16rem;
  background: #cdcdcd;
  box-shadow: 0 0.04rem 0.08rem 0 rgba(103, 103, 103, 0.5);
  border: 0.02rem solid rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-radius: 0.4rem;
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
  box-shadow: 0 0.04rem 0.08rem 0 #505050;
}
@{aaa}.van-slider__bar {
  height: 0.16rem;
}
@{aaa}.van-slider__button-wrapper {
  right: -0.22rem;
}
</style>
