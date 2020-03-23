<template>
  <div>
    <search-input class="searchinput" :value="searchinputvalue" :placeholder="placeholder"></search-input>
    <div class="dropdownwapper">
      <dropdown-menu
        :option="option"
        :title="'视频分类'"
        :value="value"
        @DropdownchangeValue="DropdownchangeValue"
      ></dropdown-menu>
      <sort-attribute :name="'发布时间'" @sortway="sortway"></sort-attribute>
      <sort-attribute :name="'点击次数'" @sortway="sortway"></sort-attribute>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <science-item
        :itemlist="videoList"
        @iconcolorchange="iconcolorchange"
        @toPageVideodetail="toPageVideodetail"
      ></science-item>
    </van-list>
  </div>
</template>
<script>
import SearchInput from "@/components/SearchInput";
import DropdownMenu from "@/components/DropdownMenu";
import SortAttribute from "@/components/SortAttribute";
import ScienceItem from "./scienceitem";
export default {
  components: { SearchInput, DropdownMenu, SortAttribute, ScienceItem },
  data() {
    return {
      placeholder: "搜索关键字",
      searchinputvalue: "",
      value: "",
      option: [],
      form: {
        tag: String,
        page: 1,
        limit: 10,
        sort: String,
        desc: false
      },
      total: 0,
      loading: false,
      finished: false,
      videoList: []
    };
  },
  mounted() {
    // this.getArticles();
    this.getMenuSelect();
  },
  methods: {
    DropdownchangeValue(val) {
      console.log("----d", val);
      console.log("fsdfdsf", val);
      this.$set(this.form, "tag", this.option[val].text);
      this.videoList = [];
      this.$set(this.form, "page", 1);
      this.finished = false;
    },
    sortway(val, name) {
      console.log("------------val", val);
      this.videoList = [];
      if (val == "asc") {
        if (name == "发布时间") {
          this.$set(this.form, "sort", "时间");
          this.$set(this.form, "desc", false);
          this.$set(this.form, "page", 1);
          this.finished = false;
        } else if (name == "点击次数") {
          this.$set(this.form, "sort", "点击");
          this.$set(this.form, "desc", false);
          this.$set(this.form, "page", 1);
          this.finished = false;
        }
      } else {
        if (name == "发布时间") {
          this.$set(this.form, "sort", "时间");
          this.$set(this.form, "desc", true);
          this.$set(this.form, "page", 1);
          this.finished = false;
        } else if (name == "点击次数") {
          this.$set(this.form, "sort", "点击");
          this.$set(this.form, "desc", true);
          this.$set(this.form, "page", 1);
          this.finished = false;
        }
      }
    },
    getMenuSelect() {
      this.$store
        .dispatch("common/getMenuSelect", this.$route.meta.title)
        .then(data => {
          let menus = this.$store.getters.menuList.selects[0].tags;
          console.log("menu", this.$store.getters.menuList.selects);
          for (var i = 0; i < menus.length; i++) {
            let obj = {};
            obj["text"] = menus[i];
            obj["value"] = i.toString();
            this.option.push(obj);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    onLoad() {
      this.$store
        .dispatch("diseaseKnowledge/getVideos", this.form)
        .then(data => {
          if (this.videoList != null) {
            this.videoList = this.videoList.concat(
              this.$store.getters.videoList.videos
            );
          } else {
            this.videoList = this.$store.getters.videoList.videos;
          }
          this.total = this.$store.getters.videoList.total;
          this.loading = false;
          if (this.videoList.length >= this.total) {
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

          // console.log(e);
        });
    },
    iconcolorchange(val, bool) {
      this.$set(this.videoList[val], "like", bool);
    },
    toPageVideodetail(item, key) {
      this.$router.push({
        path: "/scienceVideo/videoList/videoDetail?id=" + item._id
      });
    }
  }
};
</script>
<style lang="less" scoped>
.searchinput {
  margin: 0.4rem 0 0.28rem;
}
.dropdownwapper {
  overflow: hidden;
}
</style>
