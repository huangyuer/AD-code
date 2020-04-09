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
      @likeBtn="likeBtn"
      @forwardBtn="forwardBtn"
    ></like-and-forward>
  </div>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
import { Toast } from "vant";
export default {
  name: "DiseaseDetail",
  components: { LikeAndForward },
  data() {
    return {
      id: "",
      article: "",
    };
  },
  beforeRouteLeave(to, form, next) {
    next();
    this.addOutPageLog();
  },
  created() {
    this.$store
      .dispatch("common/getArticle", this.$route.params.id)
      .then(data => {
        this.article = this.$store.getters.articleDetail.article;
      })
      .catch(e => {
        console.log(e);
      });
  },
  mounted() {},
  methods: {
    addOutPageLog() {
      this.$store
        .dispatch("common/addOutPageLog", this.$route.meta.title)
        .then(response => {
          console.log("response===========", response);
        })
        .catch(e => {
          if(e){
            Toast(e);
          }
        });
    },
    likeBtn() {
      this.de;
      console.log("-----d");
    },
    forwardBtn() {
      console.log("-----dsssdfsdfadsadf");
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
    // height: 1.12rem;
    padding:.4rem 0 .18rem 0;
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
