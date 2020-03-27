<template>
  <div class="productinfowapper" style="color:#000000" v-if="Object.keys(exchangeitem).length!=0">
    <div class="imageheader" v-if="exchangeitem.type!='视频' && exchangeitem.goodsImg">
      <van-image width="3rem" height="3rem" fit="cover" :src="exchangeitem.goodsImg[0].httpUrl" />
    </div>
    <div class="videoheader" v-if="exchangeitem.type=='视频' && exchangeitem.video">
      <div ref="container" class="container"></div>
      <video
        ref="videoPlay"
        preload
        autoplay
        width="6.86rem"
        height="3.2rem"
        id="videoPlay"
        controls="controls"
        style
      >
        <source :src="exchangeitem.video[0].httpUrl" />您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="contentheader">
      <div class="credit">{{exchangeitem.score}}积分</div>
      <div class="title">{{exchangeitem.name}}</div>
    </div>
    <div class="contentlist">{{exchangeitem.introduction}}</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "ExchangeInfo",
  data() {
    return {
      id: "",
      exchangeitem: {},
      coverUrl: "",
      type: ""
    };
  },
  created() {
    this.getExchangeDetail();
  },
  mounted() {},
  methods: {
    getExchangeDetail() {
      this.id = this.$route.query.id;
      console.log("this.$route.query.id", this.$route.query.id);
      this.$store
        .dispatch("patientManagement/getExchangeDetail", this.$route.query.id)
        .then(response => {
          this.exchangeitem = response.data.log;
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
  .videoheader {
    width: 6.86rem;
    height: 3.2rem;
    margin: 0.4rem auto 0.6rem;
    > video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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