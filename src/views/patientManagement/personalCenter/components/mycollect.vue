<template>
  <div class="disease-content">
    <div class="disease-search">
      <div class="category-box">
        <dropdown-menu :option="option" :value="value" @DropdownchangeValue="DropdownchangeValue"></dropdown-menu>
        <sort-attribute :name="'收藏时间'" @sortway="sortway"></sort-attribute>
      </div>
    </div>
    <div class="patient-like">
      <div v-for="item in diseaseInfo" :key="item.id">
        <like-info :info="item" @likeBtn="likeBtn"></like-info>
      </div>
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
      value: "0",
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
      option: [
        { text: "全部商品", value: "0" },
        { text: "新款商品", value: "1" },
        { text: "活动商品", value: "2" }
      ]
    };
  },
  methods: {
    onChange(val) {},
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