<template>
  <div class="diseaseDetail">
    <detail-info></detail-info>
    <like-and-forward :like="true" :forward="true" @likeBtn="likeBtn" @forwardBtn="forwardBtn"></like-and-forward>
  </div>
</template>
<script>
import DetailInfo from "@/components/DetailInfo";
import LikeAndForward from "@/components/LikeAndForward";
export default {
  name: "DiseaseDetail",
  components: { DetailInfo,LikeAndForward },
  data() {
    return {};
  },
  methods:{
      likeBtn(){
          console.log("-----d")
      },
      forwardBtn(){
          console.log("-----dss")
      }
  }
};
</script>
<style lang="less" scoped></style>
