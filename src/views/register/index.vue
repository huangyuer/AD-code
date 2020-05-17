<template>
  <div class="register">
    <div class="register-box" v-if="showRe">
      <svg-icon iconClass="logo" class="logo"></svg-icon>
      <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <div slot="button" class="sms-btn" v-show="show" @click="getSms">获取验证码</div>
        <div slot="button" class="sms-btn" v-show="!show">{{ count }}</div>
      </van-field>
      <van-field v-model="invite" placeholder="请输入邀请码（选填）" />
      <div class="register-agree">
        <div @click="agreeBtn">
          <svg-icon iconClass="gouxuan" class="icon" :class="{ active: flag }"></svg-icon>
        </div>
        <div class="agree-tip">
          我已阅读并同意
          <span @click="termsBtn">用户知情同意书</span>
        </div>
      </div>
      <div class="register-btn" @click="registerBtn">注册</div>
    </div>
    <div class="user-terms" v-else>
      <div class="user-terms-header">中国AD康复之家用户知情同意书</div>
      <div class="user-terms-body">
        <p class="title">一、我们如何收集和使用您的个人信息</p>
        <p>我们会遵循正当，合法，必要的原则，出于本政策所述的以下目的，收集和使用您在使用我们服务过程中主动提供或因使用我们产品和/或服务而产生的个人信息。如果我们要将您的信息用于本政策未载明的其他用途，或基于特定目的将收集来的信息用于其他目的，我们将以合理的方式向您告知，并在使用前再次征得您的同意。</p>
        <p class="title term-margin">1.账号注册</p>
        <p>当您注册时，我们将收集您的手机号,邀请码等信息，以便为您提供快捷的登录服务。同时为帮您完成注册功能，我们还将为您提供用户知情同意书，以便您加以了解，并为您提供AD之家的初始服务。</p>
        <p class="title term-margin">2.向您提供产品和/或服务</p>
        <p>
          <span class="title">2.1</span> 向您提供信息浏览，发布和收藏及分享功能。
        </p>
        <p>
          <span class="title">2.2</span>
          为了向您提供我们最核心的信息展示服务并向您推荐可能感兴趣的相关文章，我们会收集您的浏览记录（如您的收藏，浏览）和点击操作（如收藏，提交，浏览，筛选，分享）其中您的浏览记录和点击操作记录属于个人敏感信息，但属于AD之家提供信息展示及信息发布服务所必须信息。
        </p>
      </div>
      <div class="user-terms-btn" @click="termsBtnAgree">我以阅读并同意</div>
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
      flag: false,
      timer: null,
      count: "",
      show: true,
      showRe: true
    };
  },
  methods: {
    termsBtn() {
      // this.$router.push({
      //   path: "/userTerms"
      // });
      this.showRe = false;
    },
    termsBtnAgree() {
      //     this.$router.push({
      //   name: "Register",
      //   path: "/register",
      //   params: {
      //     userTerm: true
      //   }
      // });
      this.flag = true;
      this.showRe = true;
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
          // if(e){
          //   this.$toast(e);
          // }
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
          // if(e){
          //   this.$toast(e);
          // }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.logo {
  width: 1.6rem !important;
  height: 1.32rem !important;
  margin: 0.4rem auto 0.2rem;
  display: block;
}
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
  border-radius: 0.4rem;
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

.user-terms {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.user-terms-header {
  width: 100%;
  height: 1.2rem;
  background-image: url("../../assets/user-term.png");
  background-size: 100%;
  font-size: 0.4rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  padding-left: 0.32rem;
  box-sizing: border-box;
}
.user-terms-body {
  padding: 0.32rem;
  p {
    margin: 0;
    padding: 0;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: #555555;
    .title {
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333333;
    }
    &.title {
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333333;
    }
    &.term-margin {
      padding-top: 0.4rem;
    }
  }
}
.user-terms-btn {
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
  margin-top: 0.32rem;
}
</style>
