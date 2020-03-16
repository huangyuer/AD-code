<template>
  <div class="myexchangeWapper">
    <div class="excahngeItem" v-for="(item,index) in itemlist" :key="index">
      <div class="vanimge">
        <van-image
          width=".72rem"
          height=".72rem"
          fit="cover"
          :src="require('@/assets/change.png')"
        />
      </div>
      <div class="center">
        <div class="title">{{item.title}}</div>
        <div class="card">
          <span>{{item.card}}</span>
          <span class="cardtime">| {{item.cardtime}}</span>
        </div>
      </div>
      <div class="rightBtn" @click="checkcode(item.id)">立即兑换</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemlist: [
        {
          title: "fsfd",
          card: "fsdf",
          cardtime: "2010-08-09",
          id: 1
        }
      ]
    };
  },
  methods: {
    checkcode(id) {
      this.$router.push({ path: "/productInfo?id=" + id });
    }
  }
};
</script>
<style lang="less" scoped>
.myexchangeWapper {
  width: 100%;
  padding: 0 0.32rem;
  margin-top: 0.2rem;
  box-sizing: border-box;
  overflow-x: hidden;
  .excahngeItem {
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
    height: 1.28rem;
    box-sizing: border-box;
    border-bottom: 2px solid rgba(229, 229, 229, 1);
    .vanimge {
      line-height: 0;
    }
    .center {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 0.2rem;
      .title {
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: initial;
        margin-bottom: 0.06rem;
      }
      .card {
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(0, 153, 102, 1);
        line-height: initial;
        .cardtime {
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .rightBtn {
      position: relative;
      margin-right: 0;
      margin-left: auto;
      font-size: 0.24rem;
      font-family: "PingFangSC-Medium";
      border-radius: 0.3rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: initial;
      padding: 0.02rem 0.12rem;
      background: rgba(0, 153, 102, 1);
    }
  }
}
</style>