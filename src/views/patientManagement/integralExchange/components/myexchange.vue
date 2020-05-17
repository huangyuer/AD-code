<template>
  <div class="myexchangeWapper">
    <van-list v-model="loading" :finished="finished" finished-text="您还未进行兑换" @load="onLoad">
      <div class="excahngeItem" v-for="(item, index) in logs" :key="index">
        <div class="vanimge">
          <svg-icon v-if="item.icon=='电子券'" iconClass="quan" class="quan"></svg-icon>
          <svg-icon v-else-if="item.icon=='专家视频'" iconClass="kechengxiaoshou" class="quan"></svg-icon>
          <svg-icon v-else-if="item.icon=='电子书'" iconClass="zixun" class="quan"></svg-icon>
        </div>
        <div class="center">
          <div class="title">{{ item.name }}</div>
          <div class="card">
            <span>{{ item.score }}积分</span>
            <span class="cardtime">| {{ item.date }}</span>
          </div>
        </div>
        <div class="rightBtn" @click="checkcode(item._id)">{{item.icon=='入场券'?'立即使用':'查看详情'}}</div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      logs: [],
      total: 0,
      loading: false,
      finished: false,
      logsform: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    checkcode(id) {
      this.$router.push({ path: "/exchangeInfo?id=" + id });
    },
    getExchangeLogs() {
      this.$store
        .dispatch("patientManagement/getExchangeLogs", this.logsform)
        .then(response => {
          this.logs = this.logs.concat(response.data.logs);
          this.total = response.data.total;
          this.loading = false;
          if (this.logs.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.logsform.page = this.logsform.page + 1;
          }
        })
        .catch(e => {});
    },
    onLoad() {
      this.getExchangeLogs();
    }
  }
};
</script>
<style lang="less" scoped>
.quan {
  width: 0.74rem !important;
  height: 0.78rem !important;
}
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
    border-bottom: 0.02rem solid rgba(229, 229, 229, 1);
    .vanimge {
      line-height: 0;
      // width: 0.72rem !important;
      // height: 0.72rem !important;
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
