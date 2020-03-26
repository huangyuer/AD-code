<template>
  <div>
    <!-- <van-sticky> -->
    <div style="background:#ffffff;padding-top:.12rem">
      <search-input
        class="searchinput"
        :value="searchinputvalue"
        :placeholder="placeholder"
        @onSearch="onSearch"
        @onClear="onClear"
      ></search-input>
      <div class="dropdownwapper">
        <tabs-list @change="change" @tocurrentTag="tocurrentTag" @currentFuc="currentFuc"></tabs-list>
      </div>
    </div>
    <!-- </van-sticky> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <instructions-item v-if="acticalList" :articles="acticalList" @likeBtn="likeBtn"></instructions-item>
    </van-list>
  </div>
</template>
<script>
import SearchInput from "@/components/SearchInput";
import TabsList from "@/components/TabsList";
import InstructionsItem from "./components/instructionsitem";
export default {
  data() {
    return {
      placeholder: "搜索关键字",
      searchinputvalue: "",
      loading: false,
      finished: false,
      acticalList: [],
      form: {
        menu: this.$route.meta.title,
        childMenu: String,
        tag: String,
        title: String,
        page: 1,
        limit: 15
      },
      total: 0,
      current: []
    };
  },
  mounted() {},
  methods: {
    likeBtn(value) {
      value.isStar = !value.isStar;
    },
    onSearch(value) {
      this.form.title = value;
      this.acticalList = null;
      this.form.page = 1;
      this.finished = false;
    },
    onClear() {
      this.form.title = "";
      this.acticalList = null;
      this.form.page = 1;
      this.finished = false;
    },
    change(name, title) {
      this.acticalList = null;
      this.finished = false;
      this.form.childMenu = title;
      this.form.tag = this.current[name];
      this.form.page = 1;
    },
    tocurrentTag(item) {
      this.acticalList = null;
      this.finished = false;
      this.form.tag = item;
      this.form.page = 1;
    },
    currentFuc(length, item, key) {
      this.current.length = length;
      if (item) this.$set(this.current, key, item);
    },
    getArticles() {
      this.$store
        .dispatch("common/getArticles", this.form)
        .then(data => {
          if (this.acticalList != null) {
            this.acticalList = this.acticalList.concat(
              this.$store.getters.articlesList.articles
            );
          } else {
            this.acticalList = this.$store.getters.articlesList.articles;
          }
          this.total = this.$store.getters.articlesList.total;
          this.loading = false;
          if (this.acticalList.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.form.page = this.form.page + 1;
          }
        })
        .catch(e => {
          Toast(e);
        });
    },
    onLoad() {
      this.getArticles();
    }
  },
  components: { SearchInput, TabsList, InstructionsItem }
};
</script>
<style scoped lang="less">
.searchinput {
  margin: 0.28rem 0;
}
.dropdownwapper {
  overflow: hidden;
  padding: 0 0.32rem;
}
</style>
