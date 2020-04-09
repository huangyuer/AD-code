<template>
  <div class="integralexchange">
    <div class="headerpageto" @click="headerpageto()">
      <div class="left">
        <van-image
          width=".48rem"
          height=".48rem"
          fit="cover"
          :src="require('@/assets/change.png')"
        />
        <span class="title">我的兑换</span>
      </div>
      <div>
        <img class="upchange" :src="require('@/assets/up.png')" alt />
      </div>
    </div>
    <div class="integrallist">
      <div class="integralItem" v-for="(item,index) in goods" :key="index">
        <van-image width="100%" height="1.8rem" fit="cover" :src="item.coverImg[0].httpUrl" />
        <!-- <van-image
          width="100%"
          height="1.8rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />-->
        <div class="bottom">
          <div class="left">
            <div class="title">{{item.name}}</div>
            <div class="card">{{item.score}}积分</div>
          </div>
          <div
            :class="{btnchange:true,bgc6:item.stockNum==0}"
            @click="item.stockNum>0?changeBtn(item):''"
          >立即兑换</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Image,Toast} from "vant";
export default {
  data() {
    return {
      goods: [],
      score: {}
    };
  },
  mounted() {
    this.getGoods();
    this.getMyScore();
  },
  methods: {
    headerpageto() {
      this.$router.push({ path: "myexchange" });
    },
    changeBtn(item) {
      this.$router.push({
        path: "/ProductInfo",
        query: { id: item._id, score: this.score }
      });
    },
    getGoods() {
      this.$store
        .dispatch("patientManagement/getGoods")
        .then(response => {
          console.log("response", response);
          this.goods = response.data.goods;
        })
        .catch(e => {
        //  if(e){
        //     Toast(e);
        //   }
        });
    },
    getMyScore() {
      this.$store
        .dispatch("patientManagement/getMyScore")
        .then(response => {
          this.score = response.data.score;
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
.integralexchange {
  .headerpageto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.36rem;
    width: 6.86rem;
    height: 0.8rem;
    background: rgba(249, 249, 249, 1);
    border-radius: 0.5rem;
    margin: 0.4rem auto .28rem;
    box-sizing: border-box;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        padding-left: 0.12rem;
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.4rem;
      }
    }
    .upchange {
      width: 0.28rem;
      height: 0.28rem;
      transform: rotate(90deg);
    }
  }
  .integrallist {
    overflow: hidden;
    padding: 0 0.19rem;
    .integralItem {
      width: 3.3rem;
      height: 3.2rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.08rem;
      border: 2px solid rgba(243, 243, 243, 1);
      padding: 0.2rem 0.15rem;
      box-sizing: border-box;
      line-height: 0;
      float: left;
      margin: 0.12rem 0.13rem;
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.24rem;
        .left {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          text-align: left;
          .title {
            font-size: 0.28rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 1.7rem;
            text-align: left;
            line-height: initial;
          }
          .card {
            font-size: 0.26rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(0, 153, 102, 1);
            line-height: 0.36rem;
          }
        }
        .btnchange {
          width: 1.2rem;
          font-size: 0.24rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(139, 87, 42, 1);
          line-height: 0.34rem;
          background: linear-gradient(
            270deg,
            rgba(246, 188, 88, 1) 0%,
            rgba(255, 247, 207, 1) 100%
          );
          border-radius: 30px;
          padding: 0.04rem 0.12rem;
          flex: 1;
          &.bgc6 {
            background: #c6c6c6;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>