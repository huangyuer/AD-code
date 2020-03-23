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
      <van-uploader
        v-model="fileList"
        multiple
        max-count="4"
        :after-read="afterRead"
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
import { Toast } from 'vant';
import qs from 'qs'

export default {
  name: "LeaveMessage",
  components: { Dialog },
  data() {
    return {
      ageValue: "",
      description: "",
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
    this.$store.dispatch("diseaseKnowledge/getLvMsgSelect").then(data => {
      (this.typeColumns = data.type), (this.levelColumns = data.level);
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
    afterRead(file, name) {
      this.$store
        .dispatch("diseaseKnowledge/uploadFile", file.file)
        .then(data => {
          console.log("-----s1", data, this.fileList);
          file.images = data.fileId;
        });
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
      let images=[]
      for (const key in this.fileList) {
        if (this.fileList.hasOwnProperty(key)) {
          images.push(this.fileList[key].images)
        }
      }
      let params={
        sex:this.sexValue,
        age:this.ageValue,
        description:this.description,
        tag:this.typeValue,
        level:this.levelValue,
        images:images
      }
       this.$store
        .dispatch("diseaseKnowledge/addLeaveMsg",params)
        .then(data => {
          this.show = true;
        }).catch(e=>{
          Toast(e)
        });
      
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
@{aaa}.van-uploader__preview-delete {
  color: #cccccc;
  font-size: 0.32rem;
  background-color: #fff;
}
</style>
