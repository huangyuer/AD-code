<template>
  <div class="addEmailWapper">
    <van-field v-model="form.name" placeholder="收件人" input-align="left" />
    <van-field v-model="form.phone" type="tel" placeholder="手机号码" input-align="left" />
    <van-field v-model="form.email" placeholder="邮箱号码" input-align="left" />
    <div class="saveEdit" @click="BtnupMyAddress()">发送</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        goods: '',
        address: '',
        email: '',
        name: '',
        phone: ''
      }
    };
  },
  mounted() {},
  methods: {
    BtnupMyAddress() {
      this.form.goods = this.$route.query.id;
      if (this.form.name == "") {
        Toast("请填写收货人");
        return;
      }
      if (this.form.phone == "") {
        Toast("请填写手机号");
        return;
      }
      var re = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!re.test(this.form.phone)) {
        Toast("手机号码有误，请重填");
        return;
      }
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if(!reg.test(this.form.email)){
        Toast("邮箱号码有误，请重填");
        return;
      }
      this.$store
        .dispatch("patientManagement/exchangeGoods", this.form)
        .then(response => {
          Toast(response.msg);
          setTimeout(() => {
            this.$router.push({ path: "/myexchange" });
          }, 500);
        })
        .catch(e => {});
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.addEmailWapper {
  padding-top: 0.4rem;
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
@{aaa}.van-hairline--top-bottom::after {
  border: 0;
}
@{aaa}.van-field__control {
  font-size: 0.28rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
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
