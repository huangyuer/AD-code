<template>
  <div class="videoWapper">
    <search-input
      class="searchinput"
      :value="searchinputvalue"
      :placeholder="placeholder"
      @onSearch="onSearch"
      @onClear="onClear"
    ></search-input>
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
    <div style="margin-top:.4rem">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <science-item :itemlist="videoList" @likeBtn="likeBtn" @toPageVideodetail="toPageVideodetail"></science-item>
     </van-list>
    </div>
  </div>
</template>
<script>
import SearchInput from "@/components/SearchInput";
import DropdownMenu from "@/components/DropdownMenu";
import SortAttribute from "@/components/SortAttribute";
import ScienceItem from "./scienceitem";
import { Toast } from "vant";
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
        title: String,
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
    this.getMenuSelect();
  },
  methods: {
    onSearch(value) {
      this.form.title = value;
      this.videoList = [];
      this.form.page = 1;
      this.onLoad();
    },
    onClear() {
      this.form.title = "";
      this.videoList = [];
      this.form.page = 1;
      this.onLoad();
    },
    DropdownchangeValue(val) {
      console.log("----d", val);
      this.$set(this.form, "tag", this.option[val].text);
      this.videoList = [];
      this.$set(this.form, "page", 1);
      this.onLoad();
    },
    sortway(val, name) {
      this.videoList = [];
      if (val == "asc") {
        if (name == "发布时间") {
          this.$set(this.form, "sort", "时间");
          this.$set(this.form, "desc", false);
          this.$set(this.form, "page", 1);
          this.onLoad();
        } else if (name == "点击次数") {
          this.$set(this.form, "sort", "点击");
          this.$set(this.form, "desc", false);
          this.$set(this.form, "page", 1);
          this.onLoad();
        }
      } else {
        if (name == "发布时间") {
          this.$set(this.form, "sort", "时间");
          this.$set(this.form, "desc", true);
          this.$set(this.form, "page", 1);
          this.onLoad();
        } else if (name == "点击次数") {
          this.$set(this.form, "sort", "点击");
          this.$set(this.form, "desc", true);
          this.$set(this.form, "page", 1);
          this.onLoad();
        }
      }
    },
    getMenuSelect() {
      this.$store
        .dispatch("common/getMenuSelect", this.$route.meta.title)
        .then(data => {
          let menus = this.$store.getters.menuList.selects[0].tags;
          for (var i = 0; i < menus.length; i++) {
            let obj = {};
            obj["text"] = menus[i];
            obj["value"] = i.toString();
            this.option.push(obj);
          }
        })
    },
    onLoad() {
      this.$store
        .dispatch("diseaseKnowledge/getVideos", this.form)
        .then(data => {
          this.videoList = this.videoList.concat(
            this.$store.getters.videoList.videos
          );
          this.total = this.$store.getters.videoList.total;
          this.loading = false;
          if (this.videoList.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.form.page = this.form.page + 1;
            this.finished = false;
          }
        })
    },
    likeBtn(val) {
      val.isStar = !val.isStar;
    },
    toPageVideodetail(item) {
      this.$store
        .dispatch("diseaseKnowledge/upVideoClickNum", item._id)
        .then(data => {
          this.$router.push({
            path: "/scienceVideo/videoList/videoDetail",
            name: "videoDetail",
            query: {
              id: item._id,
              title: item.title,
              menu: this.$route.meta.title,
              like: true,
              forward: true,
              isStar: item.isStar
            }
          });
        })
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.videoWapper{
  @{aaa} .van-dropdown-menu__bar {
    height: auto;
  }
}
.searchinput {
  margin: 0.4rem 0 0.28rem;
}
.dropdownwapper {
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  line-height: 0;
}
</style>
