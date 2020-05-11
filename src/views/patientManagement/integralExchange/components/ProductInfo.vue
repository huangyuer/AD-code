<template>
  <div class="productinfowapper" style="color:#000000" v-if="Object.keys(item).length != 0">
    <div class="imageheader">
      <van-swipe :loop="true" :show-indicator="false" :initial-swipe="0">
        <van-swipe-item v-for="(index, key) in item.goodsImg" :key="key">
          <van-image
            width="3rem"
            height="3rem"
            fit="cover"
            class="vangoodsimg"
            :src="index.httpUrl"
          />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ item.goodsImg.length }}</div>
        </template>
      </van-swipe>
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
      item: {},
      current: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/editaddressInfo" && vm.$store.getters.IssaveAddress) {
        console.log("from", from, vm);
        vm.$store.commit("patientManagement/SET_ISSUBMITEXCHANGE", true);
      }
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm); //当前组件的实例
    });
  },
  created() {
    this.score = this.$route.query.score;
    this.getGoodsDetail();
    this.upGoodsCkNum();
  },
  methods: {
    upGoodsCkNum() {
      this.$store
        .dispatch("patientManagement/upGoodsCkNum", this.$route.query.id)
        .then(response => {
          console.log("response");
        })
        .catch(e => {});
    },
    getGoodsDetail() {
      this.$store
        .dispatch("patientManagement/getGoodsDetail", this.$route.query.id)
        .then(response => {
          this.item = response.data.goods;
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    },
    changeItemBtn(id) {
      if (this.score.nowScore < this.item.score) {
        Toast("积分不足");
        return;
      }
      console.log(
        "this.$store.getters.IssaveAddress.IsSubmitExchange",
        this.$store.getters.IsSubmitExchange
      );
      if (!this.item.isVirtual && !this.$store.getters.IsSubmitExchange) {
        this.$router.push({ path: "/editaddressInfo" });
      } else if (!this.item.isVirtual && this.$store.getters.IsSubmitExchange) {
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
          Toast(response.msg);
          setTimeout(() => {
            this.$router.push({ path: "/myexchange" });
          }, 500);
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
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
          // if(e){
          //   Toast(e);
          // }
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
    > div {
      width: 100%;
      height: 3.2rem;
      .vangoodsimg {
        margin: 0 auto;
        display: block;
      }
    }
  }
  .contentheader {
    border-bottom: 0.02rem solid rgba(229, 229, 229, 1);
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
  .custom-indicator {
    position: absolute;
    right: 0.32rem;
    bottom: 0;
    background: #999999;
    font-size: 0.24rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    border-radius: 0.2rem;
    width: 0.72rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
  }
}
</style>
