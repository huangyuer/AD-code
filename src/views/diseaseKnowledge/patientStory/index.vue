<template>
  <div class="patient-content">
    <search-input
      :placeholder="'搜索关键字'"
      @onChange="onChange"
      class="patient-search"
      @onSearch="onSearch"
      @onClear="onClear"
    ></search-input>
    <div class="patient-like">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in diseaseInfo" :key="item.id">
          <like-info :info="item" @likeBtn="likeBtn" @likeItem="likeItem"></like-info>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import LikeInfo from "@/components/LikeInfo";
import SearchInput from "@/components/SearchInput";
import { Toast } from "vant";

export default {
  name: "PatientStory",
  components: { LikeInfo, SearchInput },
  data() {
    return {
      loading: false,
      finished: false,
      total: 0,
      params: {
        menu: this.$route.meta.title,
        page: 1,
        limit: 10
      },
      category: ["特应性皮炎", "银屑病"],
      diseaseInfo: []
      // diseaseInfo: [
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   },
      //   {
      //     title: "中毒性表皮坏死松解型药疹",
      //     time: "2020-02-26",
      //     isHeart: true
      //   }
      // ]
    };
  },
  watch: {
    diseaseInfo: function(val) {
      console.log("val", val);
      this.diseaseInfo = val;
    }
  },
  methods: {
    onLoad() {
      this.getArticles();
      // this.changeTab(null,this.itemTabcontent[0].type)
    },
    onSearch(value) {
      this.params.title = value;
      this.diseaseInfo = [];
      this.params.page = 1;
      this.finished = false;
      // this.getArticles();
    },
    onClear() {
      this.params.title = "";
      this.diseaseInfo = [];
      this.params.page = 1;
      this.finished = false;
    },
    onChange(val) {},
    getArticles() {
      this.$store
        .dispatch("common/getArticles", this.params)
        .then(() => {
          this.diseaseInfo = this.diseaseInfo.concat(
            this.$store.getters.articlesList.articles
          );

          this.total = this.$store.getters.articlesList.total;
          this.loading = false;
          if (this.diseaseInfo.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.params.page = this.params.page + 1;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    likeBtn(val) {
      // this.changeTab(this.curTab)
      val.isStar = !val.isStar;
      // this.$set(this.diseaseInfo,'isStar',!this.diseaseInfo.isStar)
      // this.diseaseInfo.isStar=!this.diseaseInfo.isStar
    },
    likeItem(info) {
      console.log("======", info);
      this.$router.push({
        path: "/patientDetail",
        name: "PatientDetail",
        query: {
          id: info._id,
          title: info.title,
          like: true,
          forward: true,
          isStar: info.isStar
        },
        meta: {
          title: "患者故事",
          index: 3
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.patient-content {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.patient-search {
  padding-top: 0.4rem;
  padding-bottom: 0.32rem;
}
.patient-like {
  // position: fixed;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
</style>
