<template>
  <div class="leave-message">
    <div class="message-edit">
      <van-field
        v-model="message"
        rows="2"
        :autosize="{ minHeight: 84 }"
        type="textarea"
        maxlength="300"
        placeholder="详述病症，既往史等信息…"
        :border="false"
        show-word-limit
      />
      <van-uploader
        v-model="fileList"
        multiple
        max-count="4"
        :after-read="afterRead"
        @delete="uploadDel"
      />
      <div class="van-field__word-limit picture-limit">
        <span class="van-field__word-num">{{ fileList.length }}</span>/4
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
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="sexColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field v-model="age" type="digit" placeholder="请输入你的年龄" />
      </div>
      <div class="box_2">
        <van-field
          readonly
          clickable
          name="picker"
          :value="typeValue"
          placeholder="疾病种类"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="typeColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="levelValue"
          placeholder="疾病程度"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="levelColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
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

export default {
  name: "LeaveMessage",
  components: { Dialog },
  data() {
    return {
      age: "",
      message: "",
      fileList: [],

      show: false,
      showPicker: false,
      sexValue: "",
      typeValue: "",
      levelValue: "",
      sexColumns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      typeColumns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      levelColumns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  },
  methods: {
    onConfirm(value) {
      this.sexValue = value;
      this.showPicker = false;
    },
    afterRead(file, name) {
      console.log("----", file.file);
      this.$store
        .dispatch("diseaseKnowledge/uploadFile", file.file)
        .then(data => {
          console.log("-----s1", data, this.fileList);
          file.images = data.fileId;
        });
    },
    uploadDel(file, name) {
      console.log("-----s2");

      console.log("-----s2", file, this.fileList);
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
      this.show = true;
    },
    closeBtn() {
      this.show = false;
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
@{aaa}.van-uploader__preview-delete {
  color: #cccccc;
  font-size: 0.32rem;
  background-color: #fff;
}
</style>
