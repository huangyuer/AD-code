<template>
  <div class="disease-content">
    <div class="category-box">
      <van-sticky>
        <div class="disease-search">
          <search-input :placeholder="'搜索关键字'" @onSearch="onSearch" @onClear="onClear"></search-input>
        </div>
        <van-tabs
          @click="changeTab"
          title-active-color="#009966"
          line-width="1.4rem"
          :ellipsis="false"
          v-model="activeTabName"
        >
          <van-tab
            v-for="item in itemTabcontent"
            :name="item.type"
            :title="item.type"
            :key="item.id"
          ></van-tab>
        </van-tabs>
      </van-sticky>
      <div class="patient-like">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="item in diseaseInfo" :key="item.id">
            <like-info :info="item" @likeBtn="likeBtn" @likeItem="likeItem"></like-info>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import LikeInfo from "@/components/LikeInfo";
import SearchInput from "@/components/SearchInput";
import DropdownMenu from "@/components/DropdownMenu";

import { Toast } from "vant";

export default {
  name: "DiseaseKnowledge",
  components: { LikeInfo, SearchInput, DropdownMenu },
  data() {
    return {
      flag: false,
      loading: false,
      finished: false,
      total: 0,
      activeTabName: "",
      params: {
        menu: this.$route.meta.title,
        childMenu: String,
        title: String,
        page: 1,
        limit: 10,
      },
      value: "0",
      itemTabcontent: [],
      curTab: "",
      category: ["特应性皮炎", "银屑病"],
      diseaseInfo: [],
      option: [
        { text: "全部商品", value: "0" },
        { text: "新款商品", value: "1" },
        { text: "活动商品", value: "2" },
      ],
      onloadIs: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path != "/diseaseDetail") {
        // localStorage.removeItem("tabNum");
      } else {
        // self.getArticles()
        vm.flag = !vm.flag;
        console.log("--====", vm);
      }
    });
  },
  created() {
    this.$store
      .dispatch("common/getMenuSelect", this.$route.meta.title)
      .then(() => {
        this.itemTabcontent = this.$store.getters.menuList.selects;
        // if (localStorage.getItem("tabNum")) {
        //   this.$set(this.params, "childMenu", localStorage.getItem("tabNum"));
        //   this.activeTabName = localStorage.getItem("tabNum");
        // } else {
        this.$set(
          this.params,
          "childMenu",
          this.$store.getters.menuList.selects[0].type
        );
        this.activeTabName = this.$store.getters.menuList.selects[0].type;
        this.getArticles();
        // }
        // this.onLoad();
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("------ss", this.$route.meta.title);
  },
  methods: {
    onSearch(value) {
      this.params.title = value;
      this.diseaseInfo = [];
      this.params.page = 1;
      this.finished = false;
      this.getArticles();
    },
    onClear() {
      this.params.title = "";
      this.diseaseInfo = [];
      this.params.page = 1;
      this.finished = false;
    },
    likeItem(info) {
      console.log("======", info);
      this.$router.push({
        path: "/diseaseDetail",
        name: "DiseaseDetail",
        query: {
          id: info._id,
          title: info.title,
          menu: this.$route.meta.title,
          like: true,
          forward: true,
          isStar: info.isStar,
        },
      });
    },
    changeTab(name, title) {
      this.diseaseInfo = [];
      this.$set(this.params, "childMenu", title);
      this.$set(this.params, "page", 1);
      // localStorage.setItem("tabNum", title);
      this.finished = false;
      this.onloadIs = false;
      this.getArticles();
    },
    getArticles() {
      this.loading = true;

      this.$store
        .dispatch("common/getArticles", this.params)
        .then(() => {
          this.onloadIs = true;
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
        .catch((e) => {
          console.log(e);
        });
    },
    onLoad() {
      if (this.onloadIs) {
        this.getArticles();
      }
      // this.changeTab(null,this.itemTabcontent[0].type)
    },
    likeBtn(val) {
      // this.changeTab(this.curTab)
      val.isStar = !val.isStar;
      console.log("-----------ere--");
      // this.$set(this.diseaseInfo,'isStar',!this.diseaseInfo.isStar)
      // this.diseaseInfo.isStar=!this.diseaseInfo.isStar
    },
  },
  watch: {
    diseaseInfo: function (val) {
      console.log("val", val);
      this.diseaseInfo = val;
    },
    flag: function (val, oldval) {
      console.log("--====22121");
      this.diseaseInfo = [];
      this.params.page = 1;
      this.getArticles();
    },
  },
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@{aaa}.category-box .van-sticky {
  background: #ffffff;
}
.disease-content {
  // overflow: hidden;
  // height: 100vh;
  display: flex;
  flex-direction: column;
}
.disease-search {
  padding-top: 0.4rem;
  @{aaa}.seach-input {
    margin: 0;
  }
}
.patient-like {
  display: flex;
  flex-direction: column;
  // flex: 1;
  // overflow: auto;
}
.category-box {
  @{aaa} .van-sticky {
    overflow: hidden;
    padding: 0 0.32rem;
  }
  @{aaa}.van-tab {
    text-align: center;
    min-width: 1.4rem;
    float: left;
    flex: none;
    font-size: 0.3rem;
    padding: 0;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    &:nth-child(2) {
      margin: 0 0.68rem;
    }
  }
  @{aaa}.van-tabs__line {
    background-color: #009966;
    height: 0.06rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 0.03rem;
  }
  @{aaa}.van-tab__text {
    // font-family: "PingFangSC-Medium";
    font-weight: 500;
    font-size: 0.3rem;
  }
  @{aaa}.van-tabs__wrap {
    &:after {
      content: "";
      border-top: 0;
    }
  }
  @{aaa} .van-sticky {
    margin-bottom: 0.4rem;
  }

  @{aaa} .van-hairline--top-bottom {
    &::after {
      border-width: 0px;
      border-bottom: 0.12rem solid rgba(216, 216, 216, 0.34);
      border-radius: 0.03rem;
      // margin: 0 0.32rem;
    }
  }
  @{aaa} .van-tab--active {
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 153, 102, 1);
  }
  // @{aaa} .van-sticky {
  //   margin-top: 0.1rem;
  //   margin-bottom: 0.4rem;
  // }

  // @{aaa} .van-hairline--top-bottom {
  //   &::after {
  //     border-width: 0px;
  //     border-bottom: 6px solid rgba(216, 216, 216, 1);
  //     margin: 0 0.32rem;
  //   }
  // }
  // @{aaa} .van-tab {
  //   font-size: 0.3rem;
  //   font-family: PingFangSC-Medium, PingFang SC;
  //   font-weight: 500;
  //   color: rgba(51, 51, 51, 1);
  // }
  // @{aaa} .van-tab--active {
  //   font-size: 0.3rem;
  //   font-family: PingFangSC-Medium, PingFang SC;
  //   font-weight: 500;
  //   color: rgba(0, 153, 102, 1);
  // }
  // @{aaa} .van-tabs__line {
  //   width: 3.42rem !important;
  //   height: 0.06rem;
  //   background: rgba(0, 153, 102, 1);
  //   border-radius: 0.03rem;
  // }
}
.category-box1 {
  display: flex;
  align-items: center;
  height: 1rem;
  padding-bottom: 0.1rem;
  .category-li {
    width: 2rem;
    height: 0.56rem;
    background: rgba(247, 247, 247, 1);
    border-radius: 0.28rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 0.56rem;
    text-align: center;
    color: rgba(0, 153, 102, 1);
    &:last-child {
      margin-left: 0.4rem;
    }
  }
}
</style>
