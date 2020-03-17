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
      <van-uploader v-model="fileList" multiple max-count="4" />
      <div class="van-field__word-limit picture-limit">
        <span class="van-field__word-num">{{ fileList.length }}</span
        >/4
      </div>
    </div>
    <div class="select-box">
      <dropdown-menu
        :option="option"
        :value="value"
        @DropdownchangeValue="DropdownchangeValue"
      ></dropdown-menu>
    </div>
    <div class="commit-btn" @click="commitBtn">提交</div>
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
import DropdownMenu from "@/components/DropdownMenu";
import Dialog from "@/components/Dialog";

export default {
  name: "LeaveMessage",
  components: { DropdownMenu, Dialog },
  data() {
    return {
      message: "",
      fileList: [],
      value: "0",
      show: false,
      option: [
        { text: "请选择性别", value: "0" },
        { text: "男", value: "1" },
        { text: "女", value: "2" }
      ]
    };
  },
  methods: {
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
.message-edit {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.04rem 0.04rem 0 0;
  border: 0.02rem solid rgba(229, 229, 229, 1);
}
.picture-limit {
  margin-right: 0.28rem;
  margin-bottom: 0.24rem;
}
.select-box {
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
@{aaa} .van-cell {
  padding: 0.28rem 0.28rem;
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
