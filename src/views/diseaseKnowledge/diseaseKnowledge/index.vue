<template>
  <div class="disease-content">
    <div class="disease-search">
      <search-input :placeholder="'搜索关键字'" @onSearch="onSearch" @onClear="onClear"></search-input>

      <!-- <div class="category-box">

        <dropdown-menu
          :option="option"
          :value="value"
          @DropdownchangeValue="DropdownchangeValue"
        ></dropdown-menu>
        <div v-for="item in category" :key="item.id" class="category-li">
          {{ item }}
        </div>
      </div>-->
    </div>
    <div class="category-box">
      <van-tabs sticky @click="changeTab" title-active-color="#009966" line-width="1.4rem" :ellipsis="false">
        <van-tab v-for="item in itemTabcontent" :title="item.type" :key="item.id"></van-tab>
        <div class="patient-like">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="item in diseaseInfo" :key="item.id">
              <like-info :info="item" @likeBtn="likeBtn" @likeItem="likeItem"></like-info>
            </div>
          </van-list>
        </div>
      </van-tabs>
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
      loading: false,
      finished: false,
      total: 0,
      params: {
        menu: this.$route.meta.title,
        childMenu: String,
        title: String,
        page: 1,
        limit: 10
      },
      value: "0",
      itemTabcontent: [],
      curTab: "",
      category: ["特应性皮炎", "银屑病"],
      diseaseInfo: [],
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
      //   }
      // ],
      option: [
        { text: "全部商品", value: "0" },
        { text: "新款商品", value: "1" },
        { text: "活动商品", value: "2" }
      ]
    };
  },
  created() {
    this.$store
      .dispatch("common/getMenuSelect", this.$route.meta.title)
      .then(() => {
        this.itemTabcontent = this.$store.getters.menuList.selects;
        this.$set(
          this.params,
          "childMenu",
          this.$store.getters.menuList.selects[0].type
        );
        // this.changeTab(null,this.itemTabcontent[0].type)
        this.onLoad();
      })
      .catch(e => {
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
        query: { id: info._id, like: true, forward: true, isStar: info.isStar }
      });
    },
    changeTab(name, title) {
      this.diseaseInfo = [];
      this.$set(this.params, "childMenu", title);
      this.$set(this.params, "page", 1);
      this.finished = false;
      this.getArticles();
    },
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
    onLoad() {
      this.getArticles();
      // this.changeTab(null,this.itemTabcontent[0].type)
    },
    likeBtn(val) {
      // this.changeTab(this.curTab)
      val.isStar = !val.isStar;
      // this.$set(this.diseaseInfo,'isStar',!this.diseaseInfo.isStar)
      // this.diseaseInfo.isStar=!this.diseaseInfo.isStar
    }
  },
  watch: {
    diseaseInfo: function(val) {
      console.log("val", val);
      this.diseaseInfo = val;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.disease-content {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.disease-search {
  padding-top: 0.4rem;
}
.patient-like {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
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
    margin-top: 0.1rem;
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
