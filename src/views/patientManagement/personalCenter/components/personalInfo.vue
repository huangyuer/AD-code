<template>
  <div class="personalWapper">
    <div class="header">
      <div class="header-bg">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="require('../../../../assets/myinfobg.png')"
        />
      </div>
      <div class="headercontent">
        <div class="vanhead">
          <van-image
            width="1.32rem"
            height="1.32rem"
            fit="cover"
            :src="
              getmyinfo.headImg != ''
                ? getmyinfo.headImg
                : require('../../../../assets/change.png')
            "
          />
        </div>
        <div class="name">{{ getmyinfo.name }}</div>
        <div class="tel">{{ getmyinfo.phone }}</div>
        <div class="invitcode">
          邀请码：
          <b>{{getmyinfo.invCode}}</b>
        </div>
      </div>
      <div class="cancelaccount">注销账号</div>
    </div>
    <div class="infolist">
      <div class="myinfolist">
        <div class="header">
          <div class="left">fsdffsad</div>
          <div class="right" @click="myinfopageEdit()">
            编辑
            <img :src="require('../../../../assets/up.png')" />
          </div>
        </div>
        <div class="infoitem">
          <div class="margin6">
            <span class="colordeep">liuyuming</span>
            <span class="colormiddle">12344556</span>
          </div>
          <div>
            <span class="colordeep font28">性别：</span>
            <span class="colorshallow">未填写</span>
            <span class="colordeep font28">出生年月：</span>
            <span class="colorshallow">未填写</span>
          </div>
        </div>
      </div>
      <div class="addresslist">
        <div class="header">
          <div class="left">fsdffsad</div>
          <div class="right" @click="addressinfoEdit()">
            编辑
            <img :src="require('../../../../assets/up.png')" />
          </div>
        </div>
        <div class="address">
          <div class="margin6">
            <span class="colordeep">liuyuming</span>
            <span class="colormiddle">12344556</span>
          </div>
          <div class="colorshallow">上海市长宁区武夷路196号</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getmyinfo: {}
    };
  },
  mounted() {
    this.getMyInfo();
  },
  methods: {
    getMyInfo() {
      this.$store
        .dispatch("patientManagement/getMyInfo")
        .then(data => {
          this.getmyinfo = this.$store.getters.getmyinfo.user;
        })
        .catch(e => {
          console.log(e);
        });
    },
    myinfopageEdit() {
      this.$router.push({ path: "/editpersonalInfo" });
    },
    addressinfoEdit() {
      this.$router.push({ path: "/editaddressInfo" });
    }
  }
};
</script>
<style lang="less" scoped>
.personalWapper {
  .header {
    width: 100%;
    height: 3.84rem;
    position: relative;
    .header-bg {
      width: 100%;
      height: 100%;
      line-height: 0;
    }
    .headercontent {
      position: absolute;
      width: 100%;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .vanhead {
        margin: 0.38rem 0 0.15rem 0;
      }
      .name {
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: initial;
      }
      .tel {
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: initial;
        margin: 0.05rem 0;
      }
      .invitcode {
        width: 2.48rem;
        height: 0.48rem;
        background: rgba(1, 125, 84, 1);
        border-radius: 0.24rem;
        border: 2px solid rgba(230, 230, 230, 1);
        font-size: 0.28rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(225, 225, 225, 1);
        line-height: 0.48rem;
        text-align: center;
        b {
          font-weight: normal;
          color: rgba(242, 169, 0, 1);
        }
      }
    }
    .cancelaccount {
      width: 1.2rem;
      height: 0.4rem;
      border-radius: 0.3rem;
      border: 0.02rem solid rgba(216, 216, 216, 1);
      font-size: 0.24rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(238, 238, 238, 1);
      line-height: 0.4rem;
      position: absolute;
      bottom: 0.28rem;
      right: 0.32rem;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .infolist {
    width: 100%;
    .myinfolist,
    .addresslist {
      border-bottom: 0.02px solid rgba(243, 243, 243, 1);
      height: 2.18rem;
      box-sizing: border-box;
      padding: 0 0.32rem;

      .header {
        box-sizing: border-box;
        border-bottom: 0.02px solid rgba(243, 243, 243, 1);
        height: 0.78rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          font-size: 0.3rem;
          font-family: "PingFangSC-Medium";

          font-weight: 500;
          color: rgba(36, 36, 36, 1);
          line-height: initial;
        }
        .right {
          display: flex;
          align-items: center;
          font-size: 0.28rem;
          font-family: "PingFangSC-Regular";

          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: initial;
          img {
            transform: rotate(90deg);
            width: 0.28rem;
            height: 0.28rem;
            margin-left: 0.12rem;
          }
        }
      }

      .colordeep {
        font-size: 0.3rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
        &.font28 {
          font-size: 0.28rem;
        }
      }
      .colormiddle {
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: initial;
      }
      .colorshallow {
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: initial;
      }
      .margin6 {
        margin-bottom: 0.06rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
