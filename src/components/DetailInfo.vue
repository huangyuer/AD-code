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
      :like="true"
      :forward="false"
      @likeBtn="likeBtn"
    ></like-and-forward>
  </div>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
export default {
  components: { LikeAndForward },
  data() {
    return {
      id: "",
      article: ""
    };
  },
  created() {
    this.$store
      .dispatch("common/getArticle", this.$route.query.id)
      .then(data => {
        this.article = this.$store.getters.articleDetail.article;
      })
      .catch(e => {
        console.log(e);
      });
  },
  mounted() {},
  methods: {
    likeBtn() {
      console.log("-----d");
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
