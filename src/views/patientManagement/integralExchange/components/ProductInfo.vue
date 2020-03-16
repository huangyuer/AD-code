<template>
  <div class="productinfowapper" style="color:#000000">
    <div class="imageheader">
      <van-image width="3rem" height="3rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div class="contentheader">
      <div class="credit">32积分</div>
      <div class="title">皮肤性病诊断图谱</div>
    </div>
    <div
      class="contentlist"
    >该书共分24章，收录了皮肤病、性病及其他系统疾病皮肤表现近400种，每种皮肤病的不同部位、不同病程的各种皮肤病损特征均用色彩准确、清晰的多幅图片展现，共配图近1200幅。可帮助读者按图索骥诊断各种皮肤病、性病及具有皮肤表现的其他系统疾病。该书还提供了各种皮肤病、皮肤特征的术语拼音索引，便于读者根据病名查阅各种病变的皮肤表现。该书收录病种全、图片丰富清晰，可供皮肤病专业医师、其他专业医师、医学生、基层医生参考阅读。</div>
    <div class="changeBtn" @click="changeItemBtn()">立即兑换</div>
  </div>
</template>
<script>
export default {
  name: "ProductInfo"
};
</script>
<style lang="less" scoped>
.productinfowapper {
  margin: 0 auto;
  padding: 0 0.32rem;
  box-sizing: border-box;
  overflow-x: hidden;
  .imageheader {
    display: flex;
    justify-content: center;
    margin: 0.4rem 0 0.6rem 0;
    line-height: 0;
  }
  .contentheader {
    border-bottom: 2px solid rgba(229, 229, 229, 1);
    .credit {
      font-size: 0.32rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      line-height: initial;
      margin-bottom: 0.08rem;
    }
    .title {
      font-size: 0.28rem;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(5, 15, 43, 1);
      margin-bottom: 0.2rem;
      line-height: initial;
    }
  }
  .contentlist {
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(85, 85, 85, 1);
    line-height: 0.4rem;
    margin-top: 0.2rem;
  }
  .changeBtn {
    width: 6.4rem;
    height: 0.8rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 0.4rem;
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
    text-align: center;
    margin: 0.6rem auto 0;
  }
}
</style>