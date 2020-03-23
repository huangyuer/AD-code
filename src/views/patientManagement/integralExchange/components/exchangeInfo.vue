<template>
  <div class="productinfowapper" style="color:#000000">
    <!-- <div class="imageheader">
      <van-image width="3rem" height="3rem" fit="cover" :src="item.goodsImg[0].httpUrl" />
    </div>
    <div class="contentheader">
      <div class="credit">{{item.score}}积分</div>
      <div class="title">{{item.name}}</div>
    </div>
    <div class="contentlist">{{item.introduction}}</div>-->
    <div class="changeBtn" @click="changeItemBtn()">立即兑换</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "ExchangeInfo",
  data() {
    return {
      id: "",
      exchangeitem: {}
    };
  },
  created() {},
  mounted() {
    this.getExchangeDetail();
  },
  methods: {
    getExchangeDetail() {
      this.id = this.$route.params.id;
      console.log("this.$route.params.id", this.$route.params.id);
      this.$store
        .dispatch("patientManagement/getExchangeDetail", this.$route.params.id)
        .then(response => {
          console.log("response", response);
          // this.goods = response.data.goods;
        })
        .catch(e => {
          console.log(e);
        });
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