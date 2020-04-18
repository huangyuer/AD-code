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
          <van-image width="1.32rem" height="1.32rem" round fit="cover" :src="getmyinfo.headImg" />
        </div>
        <div class="name">{{ getmyinfo.name == "" ? getmyinfo.nickName : getmyinfo.name }}</div>
        <div class="tel">{{ getmyinfo.phone }}</div>
        <div id="myInvCode" class="invitcode" @click="clipbroad()">
          邀请码：
          <b ref="myInvCode">{{ getmyinfo.myInvCode }}</b>
        </div>
      </div>
      <div class="cancelaccount" @click="showoverlay = true">注销账号</div>
    </div>
    <div class="infolist">
      <div class="myinfolist">
        <div class="header">
          <div class="left">我的信息</div>
          <div class="right" @click="myinfopageEdit()">
            编辑
            <img :src="require('../../../../assets/up.png')" />
          </div>
        </div>
        <div class="infoitem">
          <div class="margin6">
            <span class="colordeep">
              {{
              getmyinfo.name == "" ? getmyinfo.nickName : getmyinfo.name
              }}
            </span>
            <span class="colormiddle">{{ getmyinfo.phone }}</span>
          </div>
          <div>
            <span class="colordeep font28">性别:</span>
            <span class="colorshallow">
              {{
              getmyinfo.sex == "" ? "未填写" : getmyinfo.sex
              }}
            </span>
            <span class="colordeep font28" style="margin-left: 0.24rem;">出生年月:</span>
            <span class="colorshallow">
              {{
              getmyinfo.birthday == "" ? "未填写" : getmyinfo.birthday
              }}
            </span>
          </div>
        </div>
      </div>
      <div class="addresslist">
        <div class="header">
          <div class="left">我的地址</div>
          <div class="right" @click="addressinfoEdit()">
            编辑
            <img :src="require('../../../../assets/up.png')" />
          </div>
        </div>
        <div class="address">
          <div
            class="colordeep margin6"
            style="font-size:.28rem"
            v-if="address.recipient == '' "
          >你还未添加收货地址</div>
          <div v-else>
            <div class="margin6">
              <span class="colordeep">
                {{
                address.recipient != "" ? address.recipient : "收货人未填写"
                }}
              </span>
              <span class="colormiddle">
                {{
                address.phone != "" ? address.phone : "电话未填写"
                }}
              </span>
            </div>
            <div class="colorshallow">
              {{
              address.province == "" && address.detail == ""
              ? "你还未添加收货地址"
              : address.province != ""
              ? address.province +
              address.city +
              address.area +
              address.detail
              : "" + address.detail
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="showoverlay" @click="showoverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="title">注销后会清除您所有资料，是否继续？</div>
          <div class="btnlist">
            <div class="btnfalse" @click="showoverlay=false">取消</div>
            <div class="btntrue" @click="delMyInfo()">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { removeToken } from "@/utils/auth";
import { Toast } from "vant";
export default {
  data() {
    return {
      getmyinfo: {},
      address: {},
      showoverlay: false
    };
  },
  mounted() {
    this.getMyInfo();
    this.getMyAddress();
  },
  methods: {
    getMyInfo() {
      this.$store
        .dispatch("patientManagement/getMyInfo")
        .then(data => {
          this.getmyinfo = this.$store.getters.getmyinfo.user;
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
        .then(data => {
          this.address = this.$store.getters.getmyaddress.address;
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    },
    delMyInfo() {
      this.$store
        .dispatch("patientManagement/delMyInfo")
        .then(data => {
          this.showoverlay = false;
          removeToken();
          this.$router.push({
            path: "/register"
          });
        })
        .catch(e => {});
    },
    myinfopageEdit() {
      this.$router.push({ path: "/editpersonalInfo" });
    },
    addressinfoEdit() {
      this.$router.push({ path: "/editaddressInfo" });
    },
    clipbroad() {
      var _this = this;
      var clipboard = new Clipboard("#myInvCode", {
        text: function() {
          return _this.getmyinfo.myInvCode;
        }
      });
      clipboard.on("success", e => {
        Toast("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast("复制失败");
        // 释放内存
        clipboard.destroy();
      });
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
        // margin: 0.38rem 0 0.15rem 0;
        margin: 0.38rem 0 0 0;
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
        border: 0.02rem solid rgba(230, 230, 230, 1);
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
      border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
      height: 2.18rem;
      box-sizing: border-box;
      padding: 0 0.32rem;

      .header {
        box-sizing: border-box;
        border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
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
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 5rem;
      height: 3rem;
      background-color: #fff;
      border-radius: 0.2rem;
      padding: 0.4rem 0.6rem 0;
      box-sizing: border-box;
      .title {
        text-align: center;
        font-size: 0.28rem;
        color: #333333;
      }
      .btnlist {
        display: flex;
        justify-content: space-between;
        margin-top: 0.8rem;
        .btntrue,
        .btnfalse {
          width: 1.5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          font-size: 0.26rem;
          border-radius: 0.2rem;
          color: #ffffff;
          background: #009966;
        }
        .btnfalse {
          color: #ffffff;
          background: #999999;
        }
      }
    }
  }
}
</style>
