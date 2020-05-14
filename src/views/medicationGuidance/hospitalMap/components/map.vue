<template>
  <div class="wapperItemInfo"></div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  created() {
    window.location =
      "https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=我的位置&fromcoord=" +
      this.$route.query.y +
      "," +
      this.$route.query.x +
      "&to=" +
      this.$route.query.hispitalDetail.name +
      "&tocoord=" +
      this.$route.query.hispitalDetail.y +
      "," +
      this.$route.query.hispitalDetail.x +
      "&policy=1&referer=adcode";
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.wapperItemInfo {
  width: 100%;
  height: 80vh;
}
</style>
