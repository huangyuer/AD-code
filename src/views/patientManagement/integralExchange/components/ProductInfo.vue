<template>
  <div class="productinfowapper" style="color:#000000">
    <div class="imageheader">
      <van-image
        width="3rem"
        height="3rem"
        fit="cover"
        :src="
          item.goodsImg.length != 0
            ? item.goodsImg[0].httpUrl
            : item.coverImg[0].httpUrl
        "
      />
    </div>
    <div class="contentheader">
      <div class="credit">{{ item.score }}积分</div>
      <div class="title">{{ item.name }}</div>
    </div>
    <div class="contentlist">{{ item.introduction }}</div>
    <div class="changeBtn" @click="changeItemBtn(item._id)">立即兑换</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "ProductInfo",
  data() {
    return {
      item: {},
      score: {}
    };
  },
  created() {
    console.log("this.$route.params.item", this.$route.params.item);
    console.log("this.$route.params.id", this.$route.params.score);
    this.item = this.$route.params.item;
    this.score = this.$route.params.score;
    // this.getMyAddress()
  },
  methods: {
    changeItemBtn(id) {
      // if (this.score.nowScore < this.item.score) {
      //   Toast("积分不足");
      //   return;
      // }
      if (this.item.type == "实物") {
        this.$router.push({ path: "/editaddressInfo" });
      } else {
        this.$router.push({
          path: "/exchangeInfo",
          name: "ExchangeInfo",
          params: { id: id }
        });
      }
    },
    exchangeGoods() {
      // this.address = this.address
      this.$store
        .dispatch("patientManagement/exchangeGoods")
        .then(response => {
          console.log("response", response);
          // this.goods = response.data.goods;
        })
        .catch(e => {
          console.log(e);
        });
      // console.log("this.address");
    }
  },
  watch: {
    $route(to, from) {
      console.log("from", from, "to", to);
      // from 对象中要 router 来源信息.
      // do your want
    }
  }
};
</script>
<style lang="less" scoped>
.productinfowapper {
  margin: 0 auto;
  padding: 0 0.32rem;
  box-sizing: border-box;
  overflow-x: hidden;
  .imageheader {
    display: flex;
    justify-content: center;
    margin: 0.4rem 0 0.6rem 0;
    line-height: 0;
  }
  .contentheader {
    border-bottom: 2px solid rgba(229, 229, 229, 1);
    .credit {
      font-size: 0.32rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      line-height: initial;
      margin-bottom: 0.08rem;
    }
    .title {
      font-size: 0.28rem;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(5, 15, 43, 1);
      margin-bottom: 0.2rem;
      line-height: initial;
    }
  }
  .contentlist {
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(85, 85, 85, 1);
    line-height: 0.4rem;
    margin-top: 0.2rem;
  }
  .changeBtn {
    width: 6.4rem;
    height: 0.8rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 0.4rem;
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.8rem;
    text-align: center;
    margin: 0.6rem auto 0;
  }
}
</style>
