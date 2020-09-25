<template>
  <div class="radiowapper">
    <div class="swipediv">{{ dataitem.title }}</div>
    <div class="setswipeItem">
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio
          class="radioItem"
          :name="item.Option"
          v-for="(item, index) in dataitem.options"
          :key="item.Option"
          @click="toggle(dataitem, index)">
          {{ item.Option }}
          <input ref="s4Input" 
          v-model="officialAccount"
          @input="onInput" 
          maxlength="30" v-if="dataitem.style == 's4' && index == 4" type="text" 
          style="border: 0;
            width: 85%;
            margin-right: .7rem;
            border-bottom: 0.02rem solid #333333;
            background-color: #ffffff;
            font-size: 0.28rem;
            border-radius: 0;
            box-shadow: 0;
            text-index: 0;
            height: 0.25rem;
            padding-left: 0;"
            />
          <template #icon="props">
            <div :class="{ defaultCheck: true, activeCheck: props.checked }">
              <div class="inner"></div>
            </div>
          </template>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataitem: {
      type: Object,
      default: function () {
        return {};
      },
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      radio: "",
      officialAccount: '',
      itemIndex: 0
    };
  },
  methods: {
    toggle(dataitem, index) {
      this.itemIndex = index;
      if (dataitem.style == 's4' && index == 4) {
        this.$refs.s4Input[0].focus();
      } else if (dataitem.style == 's4' && index != 4){
        this.officialAccount = '';
      }
      this.$emit(
        "radiobox",
        dataitem,
        dataitem.options[index].Option,
        this.index,
        this.officialAccount
      );
    },
    onInput() {
      this.$emit(
        "radiobox",
        this.dataitem,
        this.dataitem.options[this.itemIndex].Option,
        this.index,
        this.officialAccount
      );
    }
  },
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.radiowapper {
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
  }
  @{aaa}.van-radio__label {
    font-size: 0.28rem;
    margin-left: 0.16rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding: 0.1rem 0;
  }
  @{aaa}.van-radio--horizontal {
    // margin-right: 0.6rem;
  }
  @{aaa}.van-radio__icon{
    width: 0.4rem;
    height: 0.4rem;
    // line-height: 0;
  }
  .detail {
    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    text-align: left;
    margin-top: 0.14rem;
    > b {
      color: rgba(255, 117, 90, 1);
      font-weight: 400;
    }
  }
  .setswipeItem {
    // width: 88%;
    margin: 0.28rem auto 0;
    line-height: initial;
    .radioItem {
      width: 100%;
      min-height: .8rem;
      padding-left: 0.24rem;
      border-radius: 0.04rem;
      border: .02rem solid #E5E5E5;
      margin-bottom: 0.16rem;
    }
  }
  .defaultCheck {
    background-color: #cdcdcd;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    line-height: 0;
    text-align: center;
    &.activeCheck {
      background-color: #009966;
    }
    .inner {
      border-radius: 50%;
      line-height: 0;
      width: 0.14rem;
      height: 0.14rem;
      background-color: #ffffff;
      display: inline-block;
      margin-top: .13rem;
    }
  }
}
</style>
