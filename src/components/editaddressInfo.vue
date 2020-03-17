<template>
  <div>
    <van-field v-model="form.name" placeholder="收货人" input-align="left" />
    <van-field v-model="form.phone" placeholder="手机号码" input-align="left" />
    <van-areas
      :formvalue="form.place"
      :formplaceholder="'所在地区'"
      :forminputalign="'left'"
      @IsshowArea="IsshowArea"
    ></van-areas>
    <van-field v-model="form.address" input-align="left" placeholder="详细地址：如道路、门牌号、小区、楼洞号，单元" />
    <div class="saveEdit" @click="saveEdit()">保存</div>
  </div>
</template>
<script>
import VanAreas from "@/components/vanareas.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        place: "",
        address: ""
      }
    };
  },
  methods: {
    IsshowArea(value) {
      console.log(value);
    }
  },
  components: { VanAreas }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
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
  // width: calc(100% -0.32rem);
  // margin-left: 0.32rem;
  // border-bottom: 0.02rem solid rgba(229, 229, 229, 1) !important;
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
@{aaa}.van-hairline--top-bottom::after {
  border: 0;
}
@{aaa}.van-field__control {
  color: #333333;
}
.saveEdit {
  text-align: center;
  width: 6.4rem;
  height: 0.8rem;
  background: rgba(0, 153, 101, 1);
  border-radius: 0.4rem;
  font-size: 0.3rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8rem;
  text-align: center;
  margin: 0.6rem auto 0.36rem;
}
</style>