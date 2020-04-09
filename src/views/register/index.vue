<template>
  <div class="register">
    <div class="register-box">
      <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <div slot="button" class="sms-btn" v-show="show" @click="getSms">
          获取验证码
        </div>
        <div slot="button" class="sms-btn" v-show="!show">{{ count }}</div>
      </van-field>
      <van-field v-model="invite" placeholder="请输入邀请码（选填）" />
      <div class="register-agree">
        <div @click="agreeBtn">
          <svg-icon
            iconClass="gouxuan"
            class="icon"
            :class="{ active: flag }"
          ></svg-icon>
        </div>
        <div class="agree-tip">
          我已阅读并同意<span @click="termsBtn">用户知情同意书</span>
        </div>
      </div>
      <div class="register-btn" @click="registerBtn">注册</div>
    </div>
  </div>
</template>
<script>
import {
  getToken,
  getOpenId,
  setOpenId,
  setToken,
  removeToken
} from "@/utils/auth";
import Dialog from "@/components/Dialog";
export default {
  name: "Register",
  components: { Dialog },
  data() {
    return {
      tel: "",
      sms: "",
      invite: "",
      flag: false || this.$route.params.userTerm,
      timer: null,
      count: "",
      show: true
    };
  },
  methods: {
    termsBtn() {
      this.$router.push({
        path: "/userTerms"
      });
    },
    getOpenId() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    agreeBtn() {
      this.flag = !this.flag;
    },
    getSms() {
      this.$store
        .dispatch("register/sendValidateCode", this.tel)
        .then(data => {
          this.getOpenId();
        })
        .catch(e => {
          if(e){
            this.$toast(e);
          }
          
        });
    },
    registerBtn() {
      if (!this.flag) {
        this.$toast("注册需勾选用户知情同意书");
        return;
      }
      let params = {
        phone: this.tel,
        validateCode: parseInt(this.sms),
        openId: this.$store.getters.openId,
        invCode: this.invite
      };
      this.$store
        .dispatch("register/register", params)
        .then(data => {
          this.$router.push({
            name: "personalCenter",
            path: "/personalCenter",
            params: {
              diaLogShow: true
            }
          });
        })
        .catch(e => {
          console.log("----s1", e);
          if(e){
            this.$toast(e);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.register {
  display: flex;
  align-items: center;
  flex-direction: column;
  .register-box {
    width: 6.4rem;
    .register-agree {
      display: flex;
      margin-top: 0.28rem;
      align-items: center;
      .icon {
        width: 0.32rem;
        height: 0.32rem;
        fill: #cccccc !important;
        margin-right: 0.12rem;
        &.active {
          fill: #009966 !important;
        }
      }
      .agree-tip {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        span {
          color: #009966;
        }
      }
    }
    .register-btn {
      width: 6.4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      background: rgba(0, 157, 117, 1);
      border-radius: 0.4rem;
      font-size: 0.3rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin-top: 0.8rem;
    }
  }
}
@{aaa} .van-cell {
  /* width: 6.4rem; */
  height: 0.8rem;
  background: rgba(247, 247, 247, 1);
  border-radius: 40px;
  margin-top: 0.4rem;
  /* margin: 0 .54rem; */
  padding: 0.2rem 0.4rem;
}
@{aaa} input {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(85, 85, 85, 1);
  &::-webkit-input-placeholder {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.sms-btn {
  font-size: 0.24rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 153, 102, 1);
}
</style>
