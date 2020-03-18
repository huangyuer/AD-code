<template>
  <div class="personalCenter">
    <div class="header">
      <div class="top">
        <div class="left">
          <van-image
            round
            fit="cover"
            width="1.32rem"
            height="1.32rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="nameitem">
            <div class="name">
              dddd
              <span class="pagetoinfo" @click="toPagepersonalInfo()">查看</span>
            </div>
            <div class="phone">1223455555</div>
          </div>
        </div>
        <div class="right">
          <span>最近评估：</span><span class="deg">中</span>
          <img src="@/assets/jiantou@2x.png" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-top">
          <div class="scalenumber">积分：9</div>
          <div class="title">完成更多任务赚取积分</div>
          <div class="pos-btn" @click="toPageintefralExchange()">积分兑换</div>
        </div>
        <van-image
          fit="cover"
          width="100%"
          height=".18rem"
          style="margin-top:-.1rem"
          :src="require('@/assets/tuoyuanxing.png')"
        />
      </div>
    </div>
    <div class="tipList">
      <!-- 任务列表 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>任务列表</span>
          <span>显示全部</span>
        </div>
        <div class="itemlist">
          <div class="iteminner">
            <div class="color9 font-size28">全国肠内营养年会（3/3）</div>
            <div class="btnpage whitenone">已领取</div>
          </div>
          <div class="iteminner">
            <div class="color3 font-size28">全国肠内营养年会（3/3）</div>
            <div class="btnpage">领取</div>
          </div>
          <div class="iteminner">
            <div class="color3 font-size28">全国肠内营养年会（0/3）</div>
            <div class="btnpage greeTo">去完成</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tipList">
      <!-- 我的收藏 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>我的收藏</span>
          <span @click="toPagemycollect()"
            >更多<img :src="require('@/assets/up.png')"
          /></span>
        </div>
        <div class="itemlist">
          <div class="iteminner fmregular">
            <div class="color52 font-size28">fsadfasfsafa</div>
            <div class="coloracadaf font-size30">2020-02-26</div>
          </div>
          <div class="iteminner fmregular">
            <div class="color52 font-size28">fsadfasfsafa</div>
            <div class="coloracadaf font-size30">2020-02-26</div>
          </div>
          <div class="iteminner fmregular">
            <div class="color52 font-size28">fsadfasfsafa</div>
            <div class="coloracadaf font-size30">2020-02-26</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tipList">
      <!-- 自我评估 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>自我评估</span>
          <span @click="toPagetesthistory()"
            >查看历史<img :src="require('@/assets/up.png')"
          /></span>
        </div>
        <div class="itemlist">
          <div class="iteminner">
            <div class="color52 font-size28">
              <div class="color3 font-size30 fmmedium">liuyuyu</div>
              <div class="color3 font-size28 fmregular">
                ningzuijingfsafd<b class="color009966 fmmedium">zhongdu</b>
              </div>
            </div>
            <div class="btnpage">去评估</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tipList">
      <!-- 我的留言板 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>我的留言板</span>
        </div>
        <div class="itemlist">
          <div class="iteminner">
            <div class="color52 font-size28">
              <div class="color3 font-size30 fmmedium">
                liuyuyu<span
                  style="margin-left:.16rem"
                  class="color6 font-size28 fmregular"
                  >28岁</span
                >
              </div>
              <div class="color3 font-size28 fmregular">
                ningzuijingfsafd<b class="color009966 fmmedium">zhongdu</b>
              </div>
            </div>
            <div class="btnpage" @click="toPageleavemessage()">去留言</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toPagepersonalInfo() {
      this.$router.push({ path: "/personalInfo" });
    },
    toPageintefralExchange() {
      this.$router.push({ path: "/integralExchange" });
    },
    toPagemycollect() {
      this.$router.push({ path: "/myCollect" });
    },
    toPagetesthistory() {},
    toPageleavemessage() {
      this.$router.push({ path: "/messageBoard/leaveMessage" });
    }
  }
};
</script>
<style lang="less" scoped>
.personalCenter {
  padding-top: 0.4rem;
  .header {
    padding: 0 0.32rem;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .nameitem {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          padding-left: 0.2rem;
          .name {
            font-size: 0.3rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: initial;
            .pagetoinfo {
              font-size: 0.3rem;
              font-family: "PingFangSC-Medium";
              font-weight: 500;
              color: rgba(0, 153, 102, 1);
              line-height: initial;
            }
          }
          .phone {
            font-size: 0.28rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: initial;
          }
        }
      }
      .right {
        display: flex;
        align-items: flex-end;
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
        margin: 0.3rem 0 0 0;
        .deg {
          color: #009966;
          font-size: 0.36rem;
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          line-height: initial;
        }
        img {
          width: 0.4rem;
          height: 0.44rem;
        }
      }
    }
    .bottom {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0.32rem 0 0.28rem 0;
      .bottom-top {
        width: 99%;
        height: 1.28rem;
        background: rgba(66, 73, 94, 1);
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        position: relative;
        padding: 0.28rem 0.4rem 0;
        box-sizing: border-box;
        .scalenumber {
          font-size: 0.34rem;
          font-family: "PingFangSC-Semibold";
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: initial;
        }
        .title {
          font-size: 0.26rem;
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: initial;
        }
        .pos-btn {
          position: absolute;
          bottom: 0.2rem;
          right: 0.38rem;
          font-size: 0.24rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(139, 87, 42, 1);
          line-height: 0.48rem;
          width: 1.4rem;
          height: 0.48rem;
          background: linear-gradient(
            270deg,
            rgba(246, 188, 88, 1) 0%,
            rgba(255, 247, 207, 1) 100%
          );
          border-radius: 0.3rem;
          text-align: center;
        }
      }
    }
  }
  .tipList {
    border-top: 0.02rem solid rgba(243, 243, 243, 1);
    border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
    margin-bottom: 0.24rem;
    .tipitem {
      width: 100%;
      padding: 0 0.32rem;
      box-sizing: border-box;
      margin-bottom: 0.24rem;
      .tipitem-header {
        height: 0.78rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
        span:nth-child(1) {
          font-size: 0.3rem;
          line-height: initial;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(36, 36, 36, 1);
        }
        span:nth-child(2) {
          font-size: 0.26rem;
          line-height: initial;
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: flex;
          align-items: center;
          img {
            width: 0.28rem;
            height: 0.28rem;
            transform: rotate(90deg);
            margin-left: 0.05rem;
          }
        }
      }
      .itemlist {
        padding-top: 0.2rem;
        .font-size28 {
          font-size: 0.28rem;
          line-height: initial;
        }
        .font-size30 {
          font-size: 0.3rem;
          line-height: initial;
        }
        .color9 {
          color: #999999;
        }
        .color6 {
          color: #666666;
        }
        .color52 {
          color: #525252;
        }
        .color3 {
          color: #333333;
        }
        .coloracadaf {
          color: #acadaf;
        }
        .color009966 {
          color: #009966;
        }
        .fmregular {
          font-family: "PingFangSC-Regular";
        }
        .fmmedium {
          font-family: "PingFangSC-Medium";
        }
        .btnpage {
          width: 1.2rem;
          height: 0.4rem;
          background: rgba(0, 157, 117, 1);
          border-radius: 0.3rem;
          font-size: 0.24rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 0.4rem;
          text-align: center;
          border: 0.02rem solid rgba(0, 157, 117, 1);

          &.whitenone {
            border: 0.02rem solid rgba(216, 216, 216, 1);
            color: #999999;
            background: #ffffff;
          }
          &.greeTo {
            border: 0.02rem solid #009966;
            color: #009966;
            background: #ffffff;
          }
        }
        .iteminner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
