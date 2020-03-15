<template>
  <div class="disease-content">
    <div class="disease-search">
      <search-input
        :placeholder="'搜索关键字'"
        @onChange="onChange"
      ></search-input>
      <div class="category-box">
        <dropdown-menu
          :option="option"
          :value="value"
          @DropdownchangeValue="DropdownchangeValue"
        ></dropdown-menu>
        <div v-for="item in category" :key="item.id" class="category-li">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="patient-like">
      <div v-for="item in diseaseInfo" :key="item.id">
        <like-item :info="item" @likeBtn="likeBtn"></like-item>
      </div>
    </div>
  </div>
</template>
<script>
import LikeItem from "@/components/LikeItem";
import SearchInput from "@/components/SearchInput";
import DropdownMenu from "@/components/DropdownMenu";
import { Toast } from "vant";

export default {
  name: "DiseaseKnowledge",
  components: { LikeItem, SearchInput, DropdownMenu },
  data() {
    return {
      value: "0",
      category: ["特应性皮炎", "银屑病"],
      diseaseInfo: [
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
          title: "中毒性表皮坏死松解型药疹",
          time: "2020-02-26",
          isHeart: true
        },
        {
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
    likeBtn(val) {
      console.log("--ss--d", val);
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
