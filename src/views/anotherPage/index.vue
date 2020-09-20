<template>
  <div class="another-page">
    <div class="self-img" @click="jumpSelf">
      <img src="@/assets/diseaseBg.png" alt />
      <div class="self-title-one">AD自我评估</div>
      <div class="self-title-two">官方标准 | 建议检测</div>
    </div>
    <div class="another-img">
      <div class="another-img__poem" @click="jumpPoem">
        <div class="another-img__content">
          <p class="title">POEM</p>
          <p>患者湿疹自我</p>
          <p>检查评分量表</p>
        </div>
        <div>
          <svg-icon iconClass="jiancha" class="icon"></svg-icon>
        </div>
      </div>
      <div class="another-img__dlqi" @click="jumpDlqi">
        <div class="another-img__content">
          <p class="title">DLQI</p>
          <p>AD患者生活</p>
          <p>质量评估</p>
        </div>
        <div>
          <svg-icon iconClass="pinggu" class="icon"></svg-icon>
        </div>
      </div>
    </div>
    <div class="another-content">
      <div class="another-content__title">自测说明</div>
      <div class="another-content__list">
        <div
          class="another-content__list__tips"
        >正确合理地评估疾病的严重程度，对于特应性皮炎患者病情的把握、后续治疗方案的选择以及疗效的判断都十分重要。《中国AD之家》依据用户需求，为用户带来实践中应用最为广泛的疾病严重程度量表，用户可根据自身需求来评估：</div>
        <div class="another-content__list__type">ADCT:</div>
        <div class="another-content__list__item">
          中国特应性皮炎（AD）的评估标准
          <span>（推荐自测）</span>
        </div>
        <div class="another-content__list__type">POEM:</div>
        <div class="another-content__list__item">针对过去一周内瘙痒、睡眠影响、出血、渗出、皲裂、皮肤剥脱及干燥出现的频率进行评分。</div>
        <div class="another-content__list__type">DLQI:</div>
        <div class="another-content__list__item">针对AD患者的生活质量评估。</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "anotherPage",
  data() {
    return {};
  },
  methods: {
    jumpSelf() {
      this.$router.push({
        path: "/diseaseTest"
      });
    },
    jumpPoem() {
      this.$router.push({
        path: "/diseaseTestPoem"
      });
    },
    jumpDlqi() {
      this.$router.push({
        path: "/diseaseTestDlqi"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.another-page {
  width: 100%;
  .self-img {
    width: calc(100% - 0.64rem);

    margin: 0.4rem 0.32rem 0.36rem 0.32rem;
    text-align: center;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .self-title-one {
      position: absolute;
      left: 0.52rem;
      top: 1.2rem;
      font-size: 0.42rem;
      font-weight: 500;
      color: #ffffff;
    }
    .self-title-two {
      position: absolute;
      left: 0.52rem;
      top: 1.86rem;
      font-size: 0.28rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .another-img {
    width: calc(100% - 0.64rem);
    padding-bottom: 0.66rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0.32rem;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
    &__content {
      .title {
        font-size: 0.36rem;
        margin-bottom: 0.05rem;
      }
      p {
        margin: 0;
        color: #ffffff;
      }
    }
    &__poem,
    &__dlqi {
      flex: 1;
      height: 1.6rem;
      background: #009966;
      border-radius: 0.08rem;
      margin-right: 0.15rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.24rem;
      padding-right: 0.2rem;
    }
    &__dlqi {
      margin: 0;
      margin-left: 0.15rem;

      background: #f2a900;
    }
  }
  .another-content {
    width: calc(100% - 0.64rem);
    border-radius: 0.08rem;
    border: 0.02rem dashed #c9c9c9;
    position: relative;
    margin: 0 auto;
    text-align: center;
    &__title {
      display: inline-block;
      text-align: center;
      height: 0.44rem;
      padding: 0 0.56rem;
      font-size: 0.32rem;
      font-weight: 500;
      color: #009966;
      line-height: 0.44rem;
      transform: translateY(-0.22rem);
      background: #ffffff;
    }
    &__list {
      padding: 0 0.24rem 0.24rem 0.24rem;
      text-align: left;
      &__tips {
        font-size: 0.28rem;
        font-weight: 400;
        color: #555555;
        line-height: 0.4rem;
      }
      &__type {
        color: #009966;
        font-size: 0.28rem;
        padding-top: 0.24rem;
      }
      &__item {
        font-size: 0.28rem;
        font-weight: 500;
        color: #333333;
        span {
          color: #ff755a;
        }
      }
    }
  }
}
</style>
