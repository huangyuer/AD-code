<template>
  <div>
    <search-input
      class="searchinput"
      :value="searchinputvalue"
      :placeholder="placeholder"
    ></search-input>
    <div class="dropdownwapper">
      <dropdown-menu
        :option="option"
        :value="value"
        @DropdownchangeValue="DropdownchangeValue"
      ></dropdown-menu>
      <sort-attribute :name="'发布时间'" @sortway="sortway"></sort-attribute>
      <sort-attribute :name="'点击次数'" @sortway="sortway"></sort-attribute>
    </div>
    <science-item
      :itemlist="itemlist"
      @iconcolorchange="iconcolorchange"
      @toPageVideodetail="toPageVideodetail"
    ></science-item>
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
      option: [
        { text: "视频分类", value: "" },
        { text: "我的故事", value: "0" },
        { text: "医学大咖", value: "1" },
        { text: "家园活动", value: "2" }
      ],
      itemlist: [
        {
          id: 1,
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        },
        {
          id: 2,
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        },
        {
          id: 3,
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          like: false,
          time: 3
        },
        {
          id: 4,
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        },
        {
          id: 5,
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        }
      ]
    };
  },
  methods: {
    DropdownchangeValue(val) {
      console.log("----d", val);
    },
    sortway(val) {
      console.log("------------val", val);
      if (val == "asc") {
        this.diseaseInfo.sort(function(a, b) {
          return a.id - b.id;
        });
      } else {
        this.diseaseInfo.sort(function(a, b) {
          return b.id - a.id;
        });
      }
    },
    iconcolorchange(val, bool) {
      this.$set(this.itemlist[val], "like", bool);
    },
    toPageVideodetail(id) {
      this.$router.push({
        path: "/scienceVideo/videoList/videoDetail?id=" + id
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
