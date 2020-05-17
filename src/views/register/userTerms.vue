<template>
  <div class="user-terms">
    <div class="user-terms-header">中国AD康复之家用户知情同意书</div>
    <div class="user-terms-body">
      <p class="title">一、我们如何收集和使用您的个人信息</p>
      <p>我们会遵循正当，合法，必要的原则，出于本政策所述的以下目的，收集和使用您在使用我们服务过程中主动提供或因使用我们产品和/或服务而产生的个人信息。如果我们要将您的信息用于本政策未载明的其他用途，或基于特定目的将收集来的信息用于其他目的，我们将以合理的方式向您告知，并在使用前再次征得您的同意。</p>
      <p class="title term-margin">1.账号注册</p>
      <p>当您注册时，我们将收集您的姓名，年龄，手机号等信息，以便为您提供快捷的登录服务，同时未帮您完成注册功能，我们还将收集您的问答信息，以为您提供AD患者之家的初始服务。</p>
      <p class="title term-margin">2.向您提供产品和/或服务</p>
      <p>
        <span class="title">2.1</span> 向您提供信息浏览，发布和收藏及分享功能。
      </p>
      <p>
        <span class="title">2.2</span>
        为了向您提供我们最核心的信息展示服务并向您推荐可能感兴趣的相关文章，我们会收集您的浏览记录（如您的收藏，浏览）和点击操作（如收藏，提交，浏览，筛选，分享）其中您的浏览记录和点击操作记录属于个人敏感信息，但属于AD患者之家提供信息展示及信息发布服务所必须信息。
      </p>
    </div>
    <div class="user-terms-btn" @click="termsBtn">我以阅读并同意</div>
  </div>
</template>
<script>
export default {
  name: "UserTerms",
  data() {
    return {};
  },
  methods: {
    termsBtn() {
      this.$router.push({
        name: "Register",
        path: "/register",
        params: {
          userTerm: true
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
