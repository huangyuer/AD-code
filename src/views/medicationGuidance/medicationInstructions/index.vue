<template>
  <div>
    <van-sticky>
      <div style="background: #ffffff; padding-top: 0.12rem;">
        <search-input
          class="searchinput"
          :value="searchinputvalue"
          :placeholder="placeholder"
          @onSearch="onSearch"
          @onClear="onClear"
        ></search-input>
        <div class="dropdownwapper">
          <tabs-list
            :itemTabcontent="itemTabcontent"
            :activeTabName="activeTabName"
            @change="change"
            @tocurrentTag="tocurrentTag"
            @currentFuc="currentFuc"
          ></tabs-list>
        </div>
      </div>
    </van-sticky>
    <div class="listmedication">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <instructions-item v-if="acticalList" :articles="acticalList" @likeBtn="likeBtn"></instructions-item>
      </van-list>
    </div>
  </div>
</template>
<script>
import SearchInput from "@/components/SearchInput";
import TabsList from "@/components/TabsList";
import InstructionsItem from "./components/instructionsitem";
import { Toast } from "vant";
export default {
  data() {
    return {
      flag: false,
      placeholder: "搜索关键字",
      searchinputvalue: "",
      loading: false,
      finished: false,
      acticalList: [],
      itemTabcontent: [],
      activeTabName: "",
      activeTabChild: "",
      form: {
        menu: this.$route.meta.title,
        childMenu: String,
        tag: String,
        title: String,
        page: 1,
        limit: 10
      },
      total: 0,
      current: [],
      onloadIs: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path != "/DetailInfo") {
        // localStorage.removeItem("tabNum");
        // localStorage.removeItem("tabChild");
      }else {
        vm.flag = !vm.flag;
      }
    });
  },
  created() {
    // this.finished = true;
    this.getMenuSelect();
  },
    watch: {

    flag: function(val, oldval) {
      console.log('--====22121');
      this.acticalList = [];
      this.form.page = 1;
      this.getArticles();
    }
  },
  mounted() {
    // this.onloadIs = true;
  },
  methods: {
    likeBtn(value) {
      value.isStar = !value.isStar;
    },
    onSearch(value) {
      this.form.title = value;
      this.acticalList = [];
      this.form.page = 1;
      this.finished = false;
    },
    onClear() {
      this.form.title = "";
      this.acticalList = [];
      this.form.page = 1;
      this.finished = false;
    },
    change(name, title) {
      this.acticalList = [];
      this.form.childMenu = title;
      // this.form.tag = this.current[name];
      this.onloadIs = true;
      // localStorage.setItem("tabNum", title);
      this.form.tag = "";
      this.form.page = 1;
      this.finished = false;
    },
    tocurrentTag(item) {
      this.acticalList = [];
      this.form.tag = item;
      // localStorage.setItem("tabChild", item);
      this.form.page = 1;
      this.finished = false;
    },
    currentFuc(length, item, key) {
      this.current.length = length;
      this.$set(this.current, key, item);
    },
    getArticles() {
      this.$store
        .dispatch("common/getArticles", this.form)
        .then(data => {
          this.onloadIs = true;
          this.acticalList = this.acticalList.concat(
            this.$store.getters.articlesList.articles
          );
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
        .catch(e => {});
    },
    getMenuSelect() {
      this.$store
        .dispatch("common/getMenuSelect", this.$route.meta.title)
        .then(data => {
          this.itemTabcontent = this.$store.getters.menuList.selects;
          // if (localStorage.getItem("tabNum")) {
          //   this.$set(this.form, "childMenu", localStorage.getItem("tabNum"));
          //   this.activeTabName = localStorage.getItem("tabNum");
          // } else {
            this.$set(
              this.form,
              "childMenu",
              this.$store.getters.menuList.selects[0].type
            );
            this.activeTabName = this.$store.getters.menuList.selects[0].type;
          // }
          // if (localStorage.getItem("tabChild")) {
          //   this.$set(this.form, "tag", localStorage.getItem("tabChild"));
          //   this.activeTabChild = localStorage.getItem("tabChild");
          // }
          this.getArticles();
        })
        .catch(e => {});
    },
    onLoad() {
      if (this.onloadIs) {
        this.getArticles();
      }
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
.listmedication {
  padding-top: 0.36rem;
}
</style>
