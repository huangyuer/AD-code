<template>
  <div class="patient-content">
    <search-input
      :placeholder="'搜索关键字'"
      @onChange="onChange"
      class="patient-search"
    ></search-input>
    <div class="patient-like">
      <div v-for="item in diseaseInfo" :key="item.id">
        <like-info :info="item" @likeBtn="likeBtn"></like-info>
      </div>
    </div>
  </div>
</template>
<script>
import LikeInfo from "@/components/LikeInfo";
import SearchInput from "@/components/SearchInput";
import { Toast } from "vant";

export default {
  name: "PatientStory",
  components: { LikeInfo, SearchInput},
  data() {
    return {
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
      ]
    };
  },
  methods: {
    onChange(val) {},
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
.patient-content {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.patient-search {
  padding-top: 0.4rem;
  padding-bottom: 0.32rem;
}
.patient-like {
  // position: fixed;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
</style>
