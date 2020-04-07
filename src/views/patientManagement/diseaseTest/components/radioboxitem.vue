<template>
  <div class="radiowapper">
    <div class="swipediv">{{index+1+ '.' +dataitem.title}}</div>
    <div class="detail" v-if="dataitem.remark">
      <b>*</b>亲属包括：父母/子女/亲兄弟姐妹、叔/伯/姑/舅/姨/祖父母/外祖父母、表/堂兄妹/叔侄/伯侄/姑侄/舅甥/姨甥等。
    </div>
    <div class="setswipeItem">
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio
          :name="index"
          v-for="(item,index) in dataitem.options"
          :key="index"
          @click="toggle(dataitem,index)"
        >
          {{item.option}}
          <template #icon="props">
            <div :class="{defaultCheck:true,activeCheck:props.checked}">
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
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      radio: 1
    };
  },
  methods: {
    toggle(dataitem, index) {
      this.radio = index;
      console.log("dataitem.options[index]",dataitem.options[index]);
      this.$emit("radiobox", dataitem, dataitem.options[index].option,this.index);
    }
  }
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
  }
  @{aaa}.van-radio--horizontal {
    margin-right: 0.6rem;
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
  }
  .defaultCheck {
    background: #cdcdcd;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    position: relative;
    border-radius: 50%;
    line-height: 0;
    &.activeCheck {
      background: #009966;
    }
    .inner {
      position: absolute;
      border-radius: 50%;
      line-height: 0;
      top: calc(50% - 0.07rem);
      left: calc(50% - 0.07rem);
      width: 0.14rem;
      height: 0.14rem;
      background: #ffffff;
    }
  }
}
</style>