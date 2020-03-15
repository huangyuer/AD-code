<template>
    <div class="dropdownmenu">
    <van-dropdown-menu active-color="#009966">
        <van-dropdown-item v-model="valueinner" :options="option" @change="changeValue" />
        <van-dropdown-item v-if="option2!=[]" v-model="value2inner" @change="changeValue2" :options="option2" />
    </van-dropdown-menu>
    </div>
</template>
<script>
export default {
  props:{
    value: {
      type: Number,
      default: 0,
    },
    value2:{
      type: Number,
      default: 0,
    },
    option:{
      type: Array,
      default() {
        return {};
      }
    },
    option2:{
      type: Array,
      default() {
        return {};
      }
    }
  },
  data(){
    return {
      valueinner:this.$props.value,
      value2inner:this.$props.value2,
    }
  },
  methods: {
    changeValue(value){
      this.$emit("DropdownchangeValue", value);
    },
    changeValue2(value){
      this.$emit("DropdownchangeValue2", value);
    }
  }
}
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.dropdownmenu{
  overflow: hidden;
.van-dropdown-menu{
  float: left;
  /deep/.van-dropdown-menu__item{
        padding-right: 0.3rem;
        font-family: 'PingFangSC-Medium'; 
        /deep/.van-dropdown-menu__title{
        font-size: 0.28rem;
        padding: 0 0.32rem;
        &:after{
            // content:none;
            width: .28rem;
            height: .28rem;
            border:0;
            background-image: url("../assets/up.png");
            background-size:100%;
            transform: rotate(0);
            top:calc( 50% - 0.05rem);
            right:-.15rem;
        }
        &.van-dropdown-menu__title--down::after{
            margin-top: -1px;
            transform: rotate(180deg);
            top: calc(50% - 0.15rem);
            background-image: url("../assets/upgreen.png");
        }    
    }
  }
} 
/deep/.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
      border:0;
    }
/deep/.van-cell:not(:last-child)::after{
  border:0;
}
/deep/.van-cell{
  font-size: 0.28rem;
  padding: 0.16rem 0.32rem;
  font-family: 'PingFangSC-Regular';  
  }
}



</style>