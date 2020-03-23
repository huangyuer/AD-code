<template>
  <div class="about-us">
    <div class="about-us-header">AD患者之家介绍</div>
    <div class="about-us-content">
      <p>《AD患者之家》是为特应性皮炎患者创建的非赢利性平台，以“公益、服务、义务、自愿”的原则，提倡“自立、自强、互爱、互助”的精神。</p>
      <p>《AD患者之家》本着为广大特应性皮炎患者提供更多治疗与控制疾患的信息服务的宗旨，致力于普及和推广特应性皮炎治疗与控制的医学知识，促进更多特应性皮炎患者及医患之间的交流与沟通的目标，为特应性皮炎患者减轻精神痛苦，增强特应性皮炎患者在疾患状态下的生活工作能力，增强特应性皮炎患者互助友爱精神和培养特应性皮炎患者乐观向上的生活态度，使之适应社会工作和日常生活的要求并提高生活质量。</p>
      <p>&emsp; 我们更希望通过我们的努力，提高全社会对特应性皮炎的认知，改善特应性皮炎患者的生活工作的环境，从而造福特应性皮炎患者，造福全社会！</p>
    </div>
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
<style lang='less' scoped>
.about-us {
  .about-us-header {
    width: 100%;
    height: 1.2rem;
    background-image: url("../../../assets/user-term.png");
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
  .about-us-content {
    padding: 0.32rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    p {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
