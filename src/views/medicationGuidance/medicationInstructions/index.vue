<template>
  <div>
    <!-- <van-sticky> -->
    <div style="background:#ffffff;padding-top:.12rem">
      <search-input
        class="searchinput"
        :value="searchinputvalue"
        :placeholder="placeholder"
      ></search-input>
      <div class="dropdownwapper">
        <tabs-list @change="change"></tabs-list>
      </div>
    </div>
    <!-- </van-sticky> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <instructions-item
        v-if="acticalList"
        :articles="acticalList"
        @isStar="isStar"
      ></instructions-item>
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
        menu: "疾病知识",
        childMenu: String,
        tags: String,
        title: String,
        page: 1,
        limit: 2
      },
      total: 0
    };
  },
  mounted() {
    this.$set(this.form, "page", 1);
    // this.getArticles();
  },
  methods: {
    isStar(value, key) {
      this.$set(this.acticalList.articles[key], "isStar", value);
    },
    change(name, title) {
      this.acticalList = null;
      this.finished = false;
      this.form.childMenu = title;
      this.form.page = 1;
    },
    tocurrentTag(item) {},
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
          this.form.page = this.form.page + 1;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onLoad() {
      if (
        this.total != 0 &&
        this.acticalList != null &&
        this.acticalList.length >= this.total
      ) {
        // 加载状态结束
        this.loading = false;
        this.finished = true;
        return;
      }
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
