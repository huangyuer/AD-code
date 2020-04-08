<template>
  <div class="wapperItemInfo">
    <div class="header">
      <div class="title">{{ this.article.title }}</div>
      <div class="time">{{ this.article.date }}</div>
    </div>
    <div class="content" v-html="this.article.contentHtml">
      <!-- <van-image  /> -->
      {{ this.article.contentHtml }}
    </div>
    <like-and-forward
      :like="this.$route.params.like"
      :forward="this.$route.params.forward"
      :starId="this.$route.params.id"
      :isStar="this.$route.params.isStar"
      :path="this.$route.path"
      @likeBtn="likeBtn"
      @forwardBtn="forwardBtn"
    ></like-and-forward>
    <van-over-lay :show="showoverlay"></van-over-lay>
  </div>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
import VanOverLay from "@/components/overlay";
export default {
  name: "DiseaseDetail",
  components: { LikeAndForward, VanOverLay },
  beforeRouteLeave(to, form, next) {
    next();
    this.addOutPageLog();
  },
  data() {
    return {
      id: "",
      article: "",
      showoverlay: false
    };
  },
  created() {
    this.$store
      .dispatch("common/getArticle", this.$route.params.id)
      .then(data => {
        this.article = this.$store.getters.articleDetail.article;
      })
      .catch(e => {
        Toast(e);
      });
  },
  mounted() {},
  methods: {
    addOutPageLog() {
      this.$store
        .dispatch("common/addOutPageLog", this.$route.meta.title)
        .then(response => {})
        .catch(e => {
          Toast(e);
        });
    },
    likeBtn() {
      console.log("-----d");
    },
    forwardBtn() {
      console.log("-----dss");
      this.showoverlay = true;
    }
  }
};
</script>
<style lang="less" scoped>
.wapperItemInfo {
  width: 100%;
  .header {
    color: #333333;
    font-size: 0.3rem;
    text-align: center;
    font-family: "PingFangSC-Medium";
    height: 1.12rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-bottom: 2px solid #e5e5e5;
    .time {
      color: #acadaf;
      font-family: "PingFangSC-Regular";
      line-height: 0.4rem;
    }
  }
  .content {
    font-family: "PingFangSC-Regular";
    font-size: 0.28rem;
    padding: 0 0.32rem;
  }
}
</style>
