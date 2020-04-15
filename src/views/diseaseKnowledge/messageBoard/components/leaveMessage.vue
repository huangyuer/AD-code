<template>
  <div class="leave-message">
    <div class="message-edit">
      <van-field
        v-model="description"
        rows="2"
        :autosize="{ minHeight: 84 }"
        type="textarea"
        maxlength="300"
        placeholder="详述病症，既往史等信息…"
        :border="false"
        show-word-limit
      />
      <div style="display:flex;flex-wrap: wrap;">
        <div style="display:flex;flex-wrap: wrap;" v-if="images.imgSrc.length>0">
          <div class="van-uploader__preview" v-for="(item,index) in images.imgSrc" :key="index">
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
        </div>

        <div class="van-uploader">
          <div class="van-uploader__upload">
            <i class="van-icon van-icon-photograph van-uploader__upload-icon"></i>
            <div class="van-uploader__input" @click="openChooseImage()"></div>
          </div>
        </div>
      </div>
      <!-- <van-uploader v-model="fileList" multiple max-count="4" :after-read="afterRead" /> -->
      <div class="van-field__word-limit picture-limit">
        <span class="van-field__word-num">{{ images.imgSrc.length }}</span>/4
      </div>
    </div>
    <div class="select-box">
      <div class="box_1">
        <van-field
          readonly
          clickable
          name="picker"
          :value="sexValue"
          placeholder="请选择性别"
          @click="sexPicker = true"
        />
        <van-popup v-model="sexPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="sexColumns"
            @confirm="sexConfirm"
            @cancel="sexPicker = false"
            visible-item-count="4"
          />
        </van-popup>
        <van-field v-model="ageValue" type="digit" placeholder="请输入你的年龄" />
      </div>
      <div class="box_2">
        <van-field
          readonly
          clickable
          name="picker"
          :value="typeValue"
          placeholder="疾病种类"
          @click="typePicker = true"
        />
        <van-popup v-model="typePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="typeColumns"
            @confirm="typeConfirm"
            @cancel="typePicker = false"
            visible-item-count="4"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="levelValue"
          placeholder="疾病程度"
          @click="levelPicker = true"
        />
        <van-popup v-model="levelPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="levelColumns"
            @confirm="levelConfirm"
            @cancel="levelPicker = false"
            visible-item-count="4"
          />
        </van-popup>
      </div>
    </div>
    <div class="commit-btn" @click="commitBtn">提交</div>
    <div class="tips">*请勿包含医生，药品等敏感词语</div>
    <Dialog
      :show="show"
      :title="'留言审核提示'"
      :content="
        '尊敬的用户，您的留言已提交，我们将在24小时内审核完成，内容合格后发布。'
      "
      @closeBtn="closeBtn"
    ></Dialog>
  </div>
</template>
<script>
// import DropdownMenu from "@/components/DropdownMenu";
import Dialog from "@/components/Dialog";
import { Toast, ImagePreview } from "vant";
import qs from "qs";

export default {
  name: "LeaveMessage",
  components: { Dialog },
  data() {
    return {
      ageValue: "",
      description: "",
      ImgDatasSrc: [
        "https://b.yzcdn.cn/vant/icon-demo-1126.png",
        "https://b.yzcdn.cn/vant/icon-demo-1126.png"
      ],
      images: {
        localId: [],
        imgId: [],
        imgSrc: []
      },
      fileList: [],
      show: false,
      sexPicker: false,
      typePicker: false,
      levelPicker: false,
      sexValue: "",
      typeValue: "",
      levelValue: "",
      sexColumns: ["男", "女"],
      typeColumns: [],
      levelColumns: []
    };
  },
  created() {
      this.$store
        .dispatch("diseaseKnowledge/getLvMsgUrl")
        .then(response => {
          console.log("data",window.location.href,);
          console.log("data22",response.url);

          var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
              this.getSignature(response.url);
            } else {
                this.getSignature( windows.location.href);
            }
         

        })
    
    this.$store.dispatch("diseaseKnowledge/getLvMsgSelect").then(data => {
      this.typeColumns = data.type;
      this.levelColumns = data.level;
      console.log("------ss", data);
    });
  },
  methods: {
    sexConfirm(value) {
      this.sexValue = value;
      this.sexPicker = false;
    },
    typeConfirm(value) {
      this.typeValue = value;
      this.typePicker = false;
    },
    levelConfirm(value) {
      this.levelValue = value;
      this.levelPicker = false;
    },
    openChooseImage() {
      if (this.images.imgSrc.length == 4) {
        Toast("最多可传4张图片");
        return;
      }
      // this.demo();
      this.setChooseImage();
      console.log("image====>choose");
    },
    deletedataImage(index) {
      this.images.imgSrc.splice(index, 1);
      this.images.imgId.splice(index, 1);
      console.log("this.images.", this.images);
    },
    openImagePreview(index) {
      ImagePreview({
        images: this.ImgDatasSrc,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    },
    afterRead(file, name) {
      if (file.length > 0) {
        for (const key in file) {
          if (file.hasOwnProperty(key)) {
            const el = file[key];
            this.$store
              .dispatch("diseaseKnowledge/uploadFile", el.file)
              .then(data => {
                el.images = data.fileId;
              });
          }
        }
      } else {
        this.$store
          .dispatch("diseaseKnowledge/uploadFile", file.file)
          .then(data => {
            file.images = data.fileId;
          });
      }
    },
    asyncBeforeRead(file) {
      console.log("-----s");
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg") {
          Toast("请上传 jpg 格式图片");
          reject();
        } else {
          resolve();
        }
      });
    },
    DropdownchangeValue() {},
    commitBtn() {
      let images = [];
      for (const key in this.images.imgId) {
        if (this.images.imgId.hasOwnProperty(key)) {
          images.push(this.images.imgId[key]);
        }
      }
      let params = {
        sex: this.sexValue,
        age: this.ageValue,
        description: this.description,
        tag: this.typeValue,
        level: this.levelValue,
        images: images
      };
      this.$store
        .dispatch("diseaseKnowledge/addLeaveMsg", params)
        .then(data => {
          this.show = true;
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    },
    closeBtn() {
      this.show = false;
      this.ageValue = "";
      this.sexValue = "";
      this.typeValue = "";
      this.levelValue = "";
      this.description = "";
      this.fileList = [];
      this.$router.push({
        path: "/messageBoard"
      });

      // show: false,
      // sexPicker: false,
      // typePicker: false,
      // levelPicker: false,

      // sexColumns: ["男", "女"],
      // typeColumns: [],
      // levelColumns: []
    },
    getSignature(url) {
      this.$store
        .dispatch("common/getSignature", url)
        .then(response => {
          console.log("data", response);
          wx.config({
            debug: false,
            appId: "wx91701d2b2f9ed162",
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
      let _this=this;
      var count = 4 - this.images.imgSrc.length;
      if (count == 0) {
        Toast("最多可传4张图片");
        return;
      }
      wx.chooseImage({
        count: count, // 默认9
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
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.leave-message {
  padding-top: 0.4rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  padding-bottom: 0.54rem;
}
.tips {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 117, 90, 1);
  margin-top: 2.22rem;
  display: flex;
  justify-content: center;
}
.message-edit {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.04rem 0.04rem 0 0;
  border: 0.02rem solid rgba(229, 229, 229, 1);
  @{aaa} .van-cell {
    padding: 0.28rem 0.28rem;
  }
}
.picture-limit {
  margin-right: 0.28rem;
  margin-bottom: 0.24rem;
}
.select-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  @{aaa} .van-picker__toolbar {
    &::after {
      border: none;
    }
  }
  @{aaa} .van-picker {
    height: 4.16rem;
  }
  @{aaa} .van-picker__frame {
    &::after {
      border: none;
    }
  }
  @{aaa} .van-picker__cancel,
  @{aaa}.van-picker__confirm {
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 153, 102, 1);
  }
  .box_1 {
    display: flex;
    flex-direction: row;
    flex: 1;
    border-right: 0.02rem solid rgba(229, 229, 229, 1);
    border-left: 0.02rem solid rgba(229, 229, 229, 1);
    @{aaa} .van-cell {
      &:first-child {
        border-right: 0.02rem solid rgba(229, 229, 229, 1);
      }
    }
  }
  .box_2 {
    display: flex;
    flex-direction: row;
    flex: 1;
    @{aaa} .van-cell {
      background: rgba(247, 247, 247, 1);
      &:first-child {
        border-right: 0.02rem solid rgba(229, 229, 229, 1);
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
    }
  }
  @{aaa} .van-cell {
    padding: 0;
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.24rem;
    position: relative;
    width: 100%;
    &::after {
      border: none;
      background-image: url("../../../../assets/downGrey.png");
      background-size: 100%;
      height: 0.16rem;
      width: 0.26rem;
      background-repeat: no-repeat;
      position: absolute;
      right: 0.38rem;
      top: 0.4rem;
      left: unset;
      transform: none;
    }
  }
}
.commit-btn {
  width: 6.4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background: rgba(0, 157, 117, 1);
  border-radius: 0.4rem;
  font-size: 0.3rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
}
@{aaa} .van-field__word-limit {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
@{aaa} .van-field__word-num {
  color: rgba(0, 153, 102, 1);
}
@{aaa} textarea {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(85, 85, 85, 1);
  &::-webkit-input-placeholder {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
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
  margin: 0 0.17rem;
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
