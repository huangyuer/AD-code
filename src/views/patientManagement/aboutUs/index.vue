<template>
  <div class="about-us">
    <div class="about-us-header">AD之家介绍</div>
    <div class="about-us-content">
      <p>
        《AD之家》是为特应性皮炎患者创建的非赢利性平台，以“公益、服务、义务、自愿”的原则，提倡“自立、自强、互爱、互助”的精神。
      </p>
      <p>
        《AD之家》本着为广大患者提供更多治疗与信息服务的宗旨，致力于普及和推广特应性皮炎治疗与控制的医学知识，促进更多的交流与沟通的目标，为患者减轻精神痛苦，增强其在疾患状态下的生活工作能力，增强其互助友爱精神和培养乐观向上的生活态度，使之适应社会工作和日常生活的要求并提高生活质量。
      </p>
      <p>
        我们更希望通过我们的努力，提高全社会对特应性皮炎的认知，改善患者的生活工作的环境，从而造福广大患者，造福全社会！
      </p>
    </div>

    <svg-icon iconClass="logo" class="logo"></svg-icon>
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
.logo {
  width: 1.6rem !important;
  height: 1.32rem !important;
  margin: 0rem auto 0.6rem;
  position: absolute;
  bottom: 1.84rem;
  left: calc(50% - 0.8rem);
}
.user-term {
  width: 100vw !important;
  height: 0.6rem !important;
  position: absolute;
  bottom: 0;
  left: 0;
}
@media screen and (min-width: 390px) and (max-width: 650px) {
  .logo {
    bottom: 1.2rem;
  }
}
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
