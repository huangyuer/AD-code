<template>
  <div
    data-v-0c38f854
    data-v-6f539d17
    class="van-popup van-popup--bottom"
    style="z-index: 1;"
    v-if="isShow"
    ref="vanpopup"
  >
    <div
      class="hospitalDetailWapper"
      @touchstart="touchstart"
      @touchmove="touchmove"
    >
      <!-- <div class="whiteskr"></div> -->
      <div class="exceptwhite">
        <div class="headerTol">
          <div class="tip" @click="clicktip()"></div>
        </div>
        <div class="hospitalContent">
          <div class="hospitalContentname">医院详情</div>
          <div class="todaohangItem">
            <div class="right">
              <div class="hp-address">
                <svg-icon iconClass="zu-2" class="zu-2"></svg-icon>
                <span>{{ hispitalItem.name }}</span>
              </div>
              <div class="hp-phone">{{ hispitalItem.address }}</div>
              <div class="hp-distance">
                <svg-icon iconClass="tuoyuan" class="tuoyuan"></svg-icon>
                <span>距离您{{ hispitalItem.distance }}</span>
              </div>
            </div>
            <div class="hp-btn" @click="goNav()">
              <svg-icon iconClass="daohang" class="daohang"></svg-icon>导航
            </div>
          </div>
          <div class="canSign">
            <div class="canSign__btn" :class="{'disabled': !hospitalSignCheck.canSign}" @click="hospitalSign()">立即签到</div>
            <div class="canSign__text">{{hospitalSignCheck.msg}}</div>
          </div>
          <div class="canSign-uploadImg" v-if="parseInt(hispitalItem.distanceM) <= 500 && hospitalSignCheck.canSign">
            <span class="canSign-uploadImg-title">请上传该医院皮肤科当日挂号单和就诊结果完成签到</span>
            <div style="display:flex;flex-wrap: wrap;padding-top: 0.24rem">
              <div class="van-uploader__preview" v-for="(item, index) in images.imgSrc" :key="index">
                <van-image
                  width="2.72rem"
                  height="2rem"
                  style="line-height:0;border-radius:.2rem;overflow:hidden"
                  fit="cover"
                  :src="item"
                  @click="openImagePreview(index)"
                />
                <i
                  class="van-icon van-icon-clear van-uploader__preview-delete"
                  @click="deletedataImage(index)"
                ></i>
              </div>

              <div class="van-uploader" v-if="images.imgSrc.length < 5">
                <div class="van-uploader__upload">
                  <i class="van-icon van-icon-photograph van-uploader__upload-icon"></i>
                  <div class="van-uploader__input" @click="setChooseImage()"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="canSign-line"></div>
          <div class="tips">
            <b class="colorred">*</b>就诊时，携带
            <b class="colorred">药盒</b>并展示
            <b class="colorred">自评报告</b>，有助于医生评估病情。
          </div>
          <div class="hospitalContentname">医院介绍</div>
          <div class="hospitalIntro">
            <div class="text" v-html="hospitalItemIntro.contentHtml">
              {{ hospitalItemIntro.contentHtml }}
              <div class="hideIntro"></div>
            </div>
            <div class="clicktoageIntro" @click="toIntro()" v-if="hospitalItemIntro.contentHtml">查看更多详情 ></div>
            <div class="clicktoageIntro" v-else>暂无医院介绍</div>
          </div>
          <div class="hospitalContentname">医生列表</div>
          <div class="doctorList" v-if="doctoritem.length>0">
            <div
              class="doctorItem"
              v-for="(item, key) in doctoritem"
              :key="key"
            >
              <div class="doc-top">
                <svg-icon iconClass="doctor" class="doctor"></svg-icon>
                <div class="doc-detail">
                  <div class="doc-name">
                    {{ item.name }}
                    <span class="split">|</span>
                    <b>{{ item.sex }}</b>
                  </div>
                  <div class="doc-work">
                    {{ item.department }}
                    <span class="split">|</span>
                    {{ item.position }}
                  </div>
                </div>
              </div>
              <div class="doc-major">
                <b>擅长领域：</b>
                {{ item.skill }}
              </div>
            </div>
          </div>
          <div class="hospitalIntro clicktoageIntro" v-else>暂无医生介绍</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, ImagePreview } from 'vant';
import { touchstart, touchmove } from "./touch";
import qs from "qs";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    doctors: {
      type: Array,
      default: []
    },
    hispitalDetail: {
      type: Object,
      default: function() {
        return {};
      }
    },
    hospitalIntro: {
      type: Object,
      default: function() {
        return {};
      }
    },
    hospitalSignInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: false,
      doctoritem: [],
      hispitalItem: {},
      hospitalItemIntro: {},
      hospitalSignCheck: null,
      images: {
        localId: [],
        imgId: [],
        imgSrc: []
      },
    };
  },
  created() {
    var equipmentType = "";
    var agent = navigator.userAgent.toLowerCase();
    var android = agent.indexOf("android");
    var iphone = agent.indexOf("iphone");
    var ipad = agent.indexOf("ipad");
    if (android != -1) {
      // equipmentType = "android";
      // alert("111111")
      this.getSignature(window.location.href);
    }
    if (iphone != -1 || ipad != -1) {
      // equipmentType = "ios";
      //  alert("2222")
      const herf = window.sessionStorage.getItem("firstUrl");
      console.log("------herf", herf);
      this.getSignature(herf);
    }
  },
  mounted() {
    this.isShow = this.show;
  },
  watch: {
    show: function(val) {
      this.isShow = val;
    },
    doctors: function(val) {
      this.doctoritem = val;
    },
    hispitalDetail: function(val) {
      this.hispitalItem = val;
    },
    hospitalIntro: function(val) {
      this.hospitalItemIntro = val.hospital;
    },
    hospitalSignInfo: function(val) {
      this.hospitalSignCheck = val;
    }
  },
  methods: {
    goNav() {
      this.$emit("goNav", false, this.hispitalItem);
    },
    clicktip() {
      var vanpopup = document.getElementsByClassName("van-popup")[0];
      let scrollTop = vanpopup.scrollTop;
      var bottom = document.getElementsByClassName("van-popup--bottom")[0];
      this.isShow = false;
      this.$emit("closedetailNav");
    },
    toIntro() {
      this.$router.push({
        path: "/hospitalIntro",
        name: "HospitalIntro",
        query: { id: this.hospitalItemIntro.id }
      });
    },
    hospitalSign() {
      let fileId = [];
      for (const key in this.images.imgId) {
        if (this.images.imgId.hasOwnProperty(key)) {
          fileId.push(this.images.imgId[key]);
        }
      }
      let params = {
        hospital: this.hospitalItemIntro.id,
        files: fileId,
      };
      this.$store
        .dispatch("medicationGuidance/hospitalSign", params)
        .then(res => {
          this.$set(hospitalSignCheck,'canSign', false);
          Toast({
            message: '签到成功',
          });
        })
        .catch(error => {
          Toast({
            message: error,
          });
        });
    },
    getSignature(url) {
      this.$store
        .dispatch("common/getSignature", url)
        .then(response => {
          console.log("data", response);
          wx.config({
            debug: false,
            appId: "wx8ef854b5878d3b8d",
            timestamp: response.data.timestamp,
            nonceStr: response.data.nonce_str,
            signature: response.data.signature,
            jsApiList: ["checkJsApi", "chooseImage", "getLocalImgData"]
          });
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: ["getLocalImgData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                console.log("getsuccess");
              },
              fail() {
                console.log("getfail");
              }
            });
          });
          wx.error(function(res) {
            console.log("error", res);
          });
          wx.success(function(res) {
            console.log("success", res);
          });
        })
        .catch(e => {});
    },
    setChooseImage() {
      let _this = this;
      var count = 5 - this.images.imgSrc.length;
      if (count == 0) {
        Toast("最多可传5张图片");
        return;
      }
      wx.chooseImage({
        count: count, // 默认5
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          _this.images.localId = res.localIds;
          if (_this.images.localId.length == 0) {
            Toast("请先选择图片");
            return;
          }
          var length = _this.images.localId.length;
          for (var i = 0; i < length; i++) {
            wx.getLocalImgData({
              localId: _this.images.localId[i],
              success: function(res) {
                var localData = res.localData;
                let imageBase64 = "";
                if (localData.indexOf("data:image") == 0) {
                  //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                  imageBase64 = localData;
                } else {
                  //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                  //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                  imageBase64 = "data:image/jpeg;base64," + localData;
                }
                imageBase64 = imageBase64
                  .replace(/\r|\n/g, "")
                  .replace("data:image/jgp", "data:image/jpeg");
                console.log("uploadBase64File", imageBase64);
                _this.$store
                  .dispatch("diseaseKnowledge/uploadBase64File", imageBase64)
                  .then(data => {
                    console.log("uploadBase64File=>data", data);
                    _this.images.imgSrc.push(imageBase64);
                    _this.images.imgId.push(data.id);
                  })
                  .catch(e => {});
              }
            });
          }
        },
        fail() {
          alert("获取失败");
        }
      });
    },
    openImagePreview(index) {
      ImagePreview({
        images: this.images.imgSrc,
        startPosition: index,
        onClose() {
        }
      });
    },
    deletedataImage(index) {
      this.images.imgSrc.splice(index, 1);
      this.images.imgId.splice(index, 1);
    },
    touchstart(e) {
      // touchstart(e);
    },
    touchmove(e) {
      // touchmove(e);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.doctor {
  width: 0.74rem !important;
  height: 0.78rem !important;
}
.tuoyuan {
  width: 0.2rem !important;
  height: 0.23rem !important;
}
.zu-2 {
  width: 0.35rem !important;
  height: 0.36rem !important;
}
.hospitalDetailWapper {
  position: relative;
  .whiteskr {
    width: 100%;
    height: 50vh;
    background: transparent;
  }
  .exceptwhite {
    background: #ffffff;
    padding: 0 0.32rem;
    .headerTol {
      position: fixed;
      width: calc(100% - 0.64rem);
      background: #ffffff;
      z-index: 2;
      .tip {
        width: 100%;
        height: 0.56rem;
        background: #ffffff;
        position: fixed;
        width: calc(100% - 0.64rem);
        background: #ffffff;
        z-index: 2;
        &:after {
          content: "";
          position: absolute;
          left: calc(50% - 0.4rem);
          bottom: 0.24rem;
          width: 0.8rem;
          height: 0.1rem;

          background: rgba(216, 216, 216, 1);
          border-radius: 0.11rem;
        }
      }
    }
    .hospitalContent {
      padding-top: 0.56rem;
      .hospitalContentname {
        font-size: 0.3rem;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: initial;
        padding-bottom: 0.16rem;
        border-bottom: 0.02rem solid #e5e5e5;
      }
      .hospitalIntro {
        font-size: 0.28rem;
        padding: 0.2rem 0;
        color: #666666;
        line-height: 0.4rem;
        overflow: hidden;
        box-sizing: border-box;
        .text {
          max-height: 1.6rem;
          overflow: hidden;
          position: relative;
        }
      }
      .hideIntro {
        position: absolute;
        width: 100%;
        background-image: -webkit-linear-gradient(
          90deg,
          #ffffff 0,
          rgba(241, 241, 241, 0.5) 100%
        );
        // border-radius: 0.4rem;
        height: 60%;
        bottom: -0.1rem;
      }
      .clicktoageIntro {
        text-align: center;
        color: #999999;
        font-size: 0.24rem;
        margin-top: 0.1rem;
      }
      .todaohangItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0 0.4rem 0;
        .right {
          // padding-left: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          .hp-address {
            font-size: 0.28rem;
            font-family: "PingFangSC-Medium";
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: initial;
            display: flex;
            align-items: center;
            span {
              margin-left: 0.14rem;
            }
          }
          .hp-phone {
            font-size: 0.28rem;
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: rgba(84, 84, 84, 1);
            line-height: initial;
            margin: 0.08rem .05rem 0.08rem 0;
          }
          .hp-distance {
            font-size: 0.28rem;
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: rgba(84, 84, 84, 1);
            line-height: initial;
            display: flex;
            align-items: center;
            span {
              margin-left: 0.1rem;
            }
          }
        }
        .hp-btn {
          width: 1.4rem;
          min-width: 1.4rem;
          height: 0.44rem;
          border-radius: 0.4rem;
          border: 0.02rem solid rgba(0, 153, 102, 1);
          font-size: 0.24rem;
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.2rem;
          background: #009d75;
          .daohang {
            margin-right: 0.12rem;
            width: 0.24rem;
            height: 0.24rem;
            fill: #ffffff !important;
          }
        }
      }
      .canSign {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.28rem 0 0 0;
        border-top: 0.01rem solid #e5e5e5;
        &__btn {
          width: 1.6rem;
          height: 0.6rem;
          background: #F2A900;
          border-radius: 0.4rem;
          color: #ffffff;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.6rem;
          &.disabled {
            background: #C8C8C8;
          }
        }
        &__text {
          color: #666666;
          font-size: 0.29rem;
          padding-left: 0.24rem;
        }
      }
      .canSign-uploadImg {
        width: 100%;
        min-height: 3.2rem;
        border-radius: .04rem;
        border: .02rem solid #E5E5E5;
        box-sizing: border-box;
        padding: 0.32rem 0.32rem 0.28rem 0.32rem;
        margin-top: 0.32rem;
        .canSign-uploadImg-title {
          font-size: .28rem;
          font-weight: 400;
          color: #333333;
        }
      }
      .canSign-line {
        width: 100%;
        border-bottom: 0.02rem solid #e5e5e5;
        padding-top: 0.32rem;
      }
      .tips {
        font-size: 0.24rem;
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #666666;
        padding-top: 0.2rem;
        padding-bottom: 0.6rem;
        border-top: 0.02rem solid #e5e5e5;
        > .colorred {
          color: #ff755a;
          font-weight: 500;
        }
      }
      .doctorList {
        .doctorItem {
          padding: 0.2rem 0;
          border-bottom: 0.02rem solid #e5e5e5;
          .doc-top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .doc-detail {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              flex-direction: column;
              padding-left: 0.2rem;
              .doc-name {
                color: #333333;
                // font-family: "PingFangSC-Medium";
                font-size: 0.28rem;
                line-height: initial;
                font-weight: 600;
                > .split {
                  font-weight: 400;
                  color: #e5e5e5;
                }
                > b {
                  font-weight: 400;
                }
                .topicon {
                  width: 0.86rem;
                  height: 0.32rem;
                  margin-left: 0.12rem;
                }
              }
              .doc-work {
                color: #666666;
                font-family: "PingFangSC-Regular";
                font-size: 0.28rem;
                line-height: initial;
                font-weight: 400;
                > .split {
                  font-weight: 400;
                  color: #e5e5e5;
                }
              }
            }
          }
          .doc-major {
            font-size: 0.28rem;
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: #333333;
            line-height: initial;
            margin-top: 0.12rem;
            > b {
              color: #666666;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
.ss.van-action-sheet {
  max-height: 100%;
  height: 100vh;
}
.van-popup--bottom {
  top: 0;
}
@{aaa} .van-uploader__upload {
  width: 1.32rem;
  height: 1.32rem;
  border: 0;
  background-image: url("../../../../assets/upload.png");
  background-size: 100%;
  margin: 0;
  border-radius: 0;
  background-color: transparent;
  margin-top: 0.11rem;
  margin-left: 0.11rem;
}
@{aaa} .van-uploader__upload-icon {
  &::before {
    content: "";
  }
}
@{aaa} .van-uploader {
  margin: 0;
}
@{aaa} .van-uploader__preview {
  margin: 0.11rem;
}
@{aaa} .van-uploader__preview-image {
  width: 2.72rem;
  height: 2rem;
}
@{aaa} .van-image__img {
  // height: auto;
  // object-fit: initial !important;
}
@{aaa}.van-uploader__preview-delete {
  color: #cccccc;
  font-size: 0.32rem;
  background-color: #fff;
}
</style>
