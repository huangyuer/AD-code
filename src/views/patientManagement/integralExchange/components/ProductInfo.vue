<template>
  <div class="productinfowapper" style="color:#000000" v-if="Object.keys(item).length!=0">
    <div class="imageheader">
      <van-image
        width="3rem"
        height="3rem"
        fit="cover"
        :src="
          item.goodsImg
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
      score: {},
      form: {
        goods: String,
        address: String
      },
      item: {}
    };
  },
  created() {
    this.score = this.$route.query.score;
    this.getGoodsDetail();
  },
  methods: {
    getGoodsDetail() {
      this.$store
        .dispatch("patientManagement/getGoodsDetail", this.$route.query.id)
        .then(response => {
          this.item = response.data.goods;
        })
        .catch(e => {
          Toast(e);
        });
    },
    changeItemBtn(id) {
      if (this.score.nowScore < this.item.score) {
        Toast("积分不足");
        return;
      }
      if (
        !this.item.isVirtual &&
        !this.$store.getters.IssaveAddress.IsSubmitExchange
      ) {
        this.$router.push({ path: "/editaddressInfo" });
      } else if (
        !this.item.isVirtual &&
        this.$store.getters.IssaveAddress.IsSubmitExchange
      ) {
        this.form.goods = id;
        this.getMyAddress();
      } else {
        this.form.goods = id;
        this.exchangeGoods();
      }
    },
    exchangeGoods() {
      this.$store
        .dispatch("patientManagement/exchangeGoods", this.form)
        .then(response => {
          Toast(response.data.msg);
          this.$router.push({ path: "/myexchange" });
        })
        .catch(e => {
          Toast(e);
        });
    },
    getMyAddress() {
      this.$store
        .dispatch("patientManagement/getMyAddress")
        .then(response => {
          this.address = this.$store.getters.getmyaddress.address;
          var place =
            this.address.province +
            this.address.city +
            this.address.area +
            this.address.detail;
          this.$set(this.form, "address", place);
          this.exchangeGoods();
        })
        .catch(e => {
          Toast(e);
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
