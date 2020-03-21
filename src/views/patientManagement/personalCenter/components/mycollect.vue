<template>
  <div class="disease-content">
    <div class="disease-search">
      <div class="category-box">
        <dropdown-menu
          v-if="getstarmenus.length!=0"
          :value="value"
          :option="getstarmenus"
          @DropdownchangeValue="DropdownchangeValue"
        ></dropdown-menu>
        <sort-attribute :name="'收藏时间'" @sortway="sortway"></sort-attribute>
      </div>
    </div>
    <div class="patient-like">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in diseaseInfo" :key="item.id">
          <like-info :info="item" @likeBtn="likeBtn"></like-info>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import LikeInfo from "@/components/LikeInfo";
import SortAttribute from "@/components/SortAttribute";
import DropdownMenu from "@/components/DropdownMenu";
import { Toast } from "vant";

export default {
  name: "DiseaseKnowledge",
  components: { LikeInfo, DropdownMenu, SortAttribute },
  data() {
    return {
      value: "",
      category: ["特应性皮炎", "银屑病"],
      diseaseInfo: [
        {
          id: 1,
          title: "中毒性表皮坏死松解型药疹1",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 2,
          title: "中毒性表皮坏死松解型药疹2",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 3,
          title: "中毒性表皮坏死松解型药疹3",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 5,
          title: "中毒性表皮坏死松解型药疹5",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 4,
          title: "中毒性表皮坏死松解型药疹4",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 6,
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 7,
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 8,
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 9,
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          id: 10,
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        }
      ],
      getstarmenus: [],
      getmystars: [],
      keylist: {
        menu: String,
        page: 1,
        limit: 10,
        desc: Boolean
      },
      total: 0,
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.getStarMenus();
  },
  methods: {
    onChange(val) {},
    DropdownchangeValue(val) {
      this.$set(this.keylist, "menu", this.getstarmenus[val].text);
      this.$set(this.keylist, "page", 1);
      this.finished = false;
    },
    sortway(val) {
      console.log("------------val", val);
      if (val == "asc") {
        this.$set(this.keylist, "desc", false);
        this.$set(this.keylist, "page", 1);
        this.finished = false;
      } else {
        this.$set(this.keylist, "desc", true);
        this.$set(this.keylist, "page", 1);
        this.finished = false;
      }
    },
    likeBtn(val) {
      if (!val.isHeart) {
        Toast({
          message: "收藏成功",
          icon: "like-o"
        });
      } else {
        Toast({
          message: "取消收藏",
          icon: "like-o"
        });
      }
      val.isHeart = !val.isHeart;
    },
    getStarMenus() {
      this.$store
        .dispatch("patientManagement/getStarMenus")
        .then(data => {
          let menus = this.$store.getters.getstarmenus.menus;
          for (var i = 0; i < menus.length; i++) {
            let obj = {};
            obj["text"] = menus[i];
            obj["value"] = i.toString();
            this.getstarmenus.push(obj);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getMyStars() {
      this.$store
        .dispatch("patientManagement/getMyStars", this.keylist)
        .then(data => {
          this.getmystars = this.$store.getters.getmystars.stars;
          if (this.getmystars != null) {
            this.getmystars = this.getmystars.concat(
              this.$store.getters.getmystars.stars
            );
          } else {
            this.getmystars = this.$store.getters.getmystars.stars;
          }
          this.total = this.$store.getters.getmystars.total;
          this.loading = false;
          if (this.getmystars.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.keylist.page = this.keylist.page + 1;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    onLoad() {
      this.getMyStars();
    }
  }
};
</script>
<style lang="less" scoped>
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
  display: flex;
  align-items: center;
  padding-bottom: 0.32rem;
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