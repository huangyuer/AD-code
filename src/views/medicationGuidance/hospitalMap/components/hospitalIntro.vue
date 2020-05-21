<template>
  <div>
    <div class="wapperItemInfo" v-if="!vloading">
      <div class="header">
        <div class="title">{{ this.article.name }}</div>
        <div class="time">{{ this.article.address }}</div>
      </div>
      <div class="content">
        <!-- <van-image  /> -->
        <div class="ql-editor" v-html="this.article.contentHtml">
          {{ this.article.contentHtml }}
        </div>
      </div>
    </div>
    <vant-loading v-else></vant-loading>
  </div>
</template>
<script>
import VantLoading from "@/components//loading";
import { Toast } from "vant";
export default {
  name: "HospitalIntro",
  components: { VantLoading },
  data() {
    return {
      id: "",
      article: "",
      vloading: true
    };
  },
  created() {
    console.log("created");
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("medicationGuidance/getHospital", this.$route.query.id)
        .then(res => {
          this.vloading = false;
          this.article = res.data.hospital;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
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
