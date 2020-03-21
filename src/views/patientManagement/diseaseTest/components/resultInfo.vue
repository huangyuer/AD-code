<template>
  <div class="resultWapper">
    <div class="degtitle">{{dataresult.level}}</div>
    <star-scale :scale="scale" />
    <div class="time">2020-03-10</div>
    <div
      class="content"
    >根据您的打分结果，发现您的疾病程度存在一定风险，建议您到附近医院就医。您的疾病程度较重，推荐您每周自测一次，以随时监测您的身体情况，如遇问题可及时就医。</div>
    <div class="groupnext">关闭</div>
  </div>
</template>
<script>
import StarScale from "@/components/StarScale";
export default {
  components: { StarScale },
  props: {
    dataresult: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      scale: 0
    };
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.resultWapper {
  .degtitle {
    font-size: 0.44rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(0, 157, 117, 1);
    line-height: 0.6rem;
    padding-top: 0.86rem;
  }
  .time {
    font-size: 0.32rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.44rem;
    padding-bottom: 0.22rem;
  }
  .content {
    width: 6.06rem;
    margin: 0 auto;
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.4rem;
    text-align: left;
  }
}
.groupnext {
  width: 6rem;
  height: 0.8rem;
  background: rgba(242, 169, 0, 1);
  border-radius: 0.4rem;
  margin: 0 auto;
  font-size: 0.3rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8rem;
  margin-top: 3.2rem;
}
</style>
