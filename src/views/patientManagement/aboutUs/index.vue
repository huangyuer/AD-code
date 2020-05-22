<template>
  <div class="about-us">
    <div class="about-us-header">中国AD之家介绍</div>
    <div class="about-us-content">
      <p>
        –中国特应性皮炎之家（简称“中国AD之家”）是中国康复学会皮肤专委会旗下的AD患者关爱社区，是中国第一个专门为AD患者成立的非营利性平台，以“公益、服务、义务、自愿”为原则，提倡“自立、自强、互爱、互助”的精神。
      </p>
      <p>
        –“中国AD之家”秉承“服务AD患者，迎接美好新生”的宗旨，致力于普及疾病专业知识、提倡正规治疗方案、提高患者生活质量、保持患者身心健康、实现疾病自我管理和疾病全面康复。
      </p>
      <p>
        –“中国AD之家”由中国康复医学会皮肤专委会AD学组运营，秉承专业学术和客观的态度，不定期发布专业资讯，并创造交流机会，造福AD患者。
      </p>
      <p>
        –“中国AD之家”是AD患者之间的沟通桥梁，促进患者间互爱互助、信息共享、情感交流。
      </p>
      <p>
        –“中国AD之家”希望与广大患者共同努力，倡导社会公众对AD疾病负担的正确认知，提升社会各界对AD患者的关爱和支持，扩大国内和国际交流互动。
      </p>
    </div>

    <!-- <svg-icon iconClass="logo1" class="logo1"></svg-icon> -->
    <svg-icon iconClass="user-term" class="user-term"></svg-icon>
  </div>
</template>
<script>
export default {
  name: "AboutUs",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.logo1 {
  width: 1.4rem !important;
  height: 0.96rem !important;
  // margin: 0rem auto 0.6rem;
  position: absolute;
  bottom: 1.8rem;
  left: calc(50% - 0.8rem);
}
.user-term {
  width: 100vw !important;
  height: 0.6rem !important;
  position: absolute;
  bottom: 0;
  left: 0;
}
// @media screen and (min-width: 390px) and (max-width: 650px) {
//   .logo1 {
//     bottom: 1.2rem;
//   }
// }
.about-us {
  height: 100vh;
  position: relative;
  .about-us-header {
    width: 100%;
    height: 1.2rem;
    background-image: url("../../../assets/user-term.png");
    background-size: 100% 100%;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    padding-left: 0.32rem;
    box-sizing: border-box;
  }

  .about-us-content {
    padding: 0.32rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    p {
      margin: 0;
      padding: 0;
      line-height: 1.8;
      text-indent: 2em;
    }
  }
}
</style>
