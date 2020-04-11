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
      v-if="flag"
      :like="this.$route.query.like"
      :forward="this.$route.query.forward"
      :starId="this.$route.query.id"
      :isStar="this.$route.query.isStar"
      :path="this.$route.path"
      @likeBtn="likeBtn"
      @forwardBtn="forwardBtn"
    ></like-and-forward>
    <van-over-lay :show="showoverlay"></van-over-lay>
    <div class="more-btn" v-if="!flag" @click="register">查看更多内容，请点击注册</div>
  </div>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
import VanOverLay from "@/components/overlay";
import { Toast } from "vant";
import { getToken } from "@/utils/auth";
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
      showoverlay: false,
      flag: true
    };
  },
  created() {
    if (getToken()) this.flag = true;
    else this.flag = false;
    this.$store
      .dispatch("common/getArticle", this.$route.query.id)
      .then(data => {
        this.article = this.$store.getters.articleDetail.article;
      })
      .catch(e => {
        console.log("=====ss", e);
        // if (e) {
        //   Toast(e);
        // }
      });
  },
  mounted() {},
  methods: {
    register() {
      this.$router.push({
        path: "/register"
      });
    },
    addOutPageLog() {
      this.$store
        .dispatch("common/addOutPageLog", this.$route.meta.title)
        .then(response => {})
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
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
    border-bottom: 0.02rem solid #e5e5e5;
    .time {
      color: #acadaf;
      font-family: "PingFangSC-Regular";
      line-height: 0.4rem;
      font-size: 0.28rem;
    }
  }
  .content {
    font-family: "PingFangSC-Regular";
    font-size: 0.28rem;
    padding: 0 0.32rem;
  }
  .more-btn {
    width: 6.4rem;
    height: 0.8rem;
    background: rgba(0, 157, 117, 1);
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 153, 102, 0.5);
    border-radius: 0.4rem;
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
    text-align: center;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0.8rem;
  }
}
</style>
