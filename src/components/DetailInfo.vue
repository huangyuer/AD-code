<template>
  <div>
    <div
      class="wapperItemInfo"
      v-if="Object.keys(article).length > 0 || !vloading"
    >
      <div class="header">
        <div class="title">{{ this.article.title }}</div>
        <div class="time">{{ this.article.date }}</div>
      </div>
      <div class="content">
        <!-- <van-image  /> -->
        <div class="ql-editor" v-html="this.article.contentHtml">
          {{ this.article.contentHtml }}
        </div>
      </div>
      <like-and-forward
        :like="this.$route.query.like"
        :forward="this.$route.query.forward"
        :starId="this.$route.query.id"
        :isStar="this.$route.query.isStar"
        :title="this.$route.query.menu"
        @likeBtn="likeBtn"
        @forwardBtn="forwardBtn"
      ></like-and-forward>
    </div>
    <vant-loading v-else></vant-loading>
  </div>
</template>
<script>
import LikeAndForward from "@/components/LikeAndForward";
import VantLoading from "@/components//loading";
import { Toast } from "vant";
export default {
  name: "DiseaseDetail",
  components: { LikeAndForward, VantLoading },
  data() {
    return {
      id: "",
      article: "",
      vloading: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.menu =='关爱行动') {
        window.document.title = to.query.title;
      }
    });
  },
  beforeRouteLeave(to, form, next) {
    next();
    this.addOutPageLog();
  },
  created() {
    this.$store
      .dispatch("common/getArticle", this.$route.query.id)
      .then(data => {
        this.vloading = false;
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
          // if (e) {
          //   Toast(e);
          // }
        });
    },
    likeBtn() {
      this.de;
      console.log("-----d");
    },
    forwardBtn() {
      console.log("-----dsssdfsdfadsadf");
    }
  },
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";

.wapperItemInfo {
  width: 100%;
  .header {
    color: #333333;
    font-size: 0.3rem;
    text-align: center;
    font-family: "PingFangSC-Medium";
    // height: 1.12rem;
    padding: 0.4rem 0 0.18rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-bottom: 0.02rem solid #e5e5e5;
    .title {
      font-size: 0.32rem;
      color: #009966;
      padding:0 0.32rem;
      text-align: left;
      word-break: break-all;
    }
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
    padding: 0.32rem 0.32rem;
    @{aaa}.ql-editor {
      img {
        width: 100% !important;
      }
    }
  }
}
</style>
