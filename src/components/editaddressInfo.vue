<template>
  <div>
    <van-field v-model="form.recipient" placeholder="收货人" input-align="left" />
    <van-field v-model="form.phone" placeholder="手机号码" input-align="left" />
    <van-areas
      :formvalue="place"
      :formplaceholder="'所在地区'"
      :forminputalign="'left'"
      :columnsnum="3"
      @IsshowArea="IsshowArea"
      @onConfirm="onConfirm"
    ></van-areas>
    <van-field v-model="form.detail" input-align="left" placeholder="详细地址：如道路、门牌号、小区、楼洞号，单元" />
    <div class="saveEdit" @click="BtnupMyAddress()">保存</div>
  </div>
</template>
<script>
import VanAreas from "@/components/vanareas.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        recipient: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        detail: ""
      },
      place: "",
      address: {}
    };
  },
  created() {
    this.getMyAddress();
  },
  mounted() {},
  methods: {
    IsshowArea(value) {
      console.log(value);
    },
    onConfirm(value) {
      this.form.province = value[0].name;
      this.form.city = value[1].name;
      this.form.area = value[2].name;
      console.log("form", this.form);
    },
    getMyAddress() {
      this.$store
        .dispatch("patientManagement/getMyAddress")
        .then(data => {
          this.address = this.$store.getters.getmyaddress.address;
          if (this.address.recipient == "") {
            this.$route.meta.title = "添加收货地址";
          } else {
            this.$route.meta.title = "编辑收货地址";
          }
          this.form.recipient = this.address.recipient;
          this.form.phone = this.address.phone;
          this.form.province = this.address.province;
          this.form.city = this.address.city;
          this.form.area = this.address.area;
          this.place = this.form.province + this.form.city + this.form.area;
          this.form.detail = this.address.detail;
        })
        .catch(e => {
          // console.log(e);
          if(e){
            Toast(e);
          }
        });
    },
    BtnupMyAddress() {
      if (this.form.recipient == "") {
        Toast("请填写收货人");
        return;
      }
      if (this.form.phone == "") {
        Toast("请填写手机号");
        return;
      }
      this.$store
        .dispatch("patientManagement/upMyAddress", this.form)
        .then(data => {
          Toast("保存成功");
          if (this.$store.getters.produceinfoToeditaddress) {
            this.$store.commit("patientManagement/SET_SAVEADDRESS", true);
          }
          // this.$router.push({ path: "/personalInfo" });
          this.$router.go(-1);
        })
        .catch(e => {
          console.log(e);
          if(e){
            Toast(e);
          }
        });
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
