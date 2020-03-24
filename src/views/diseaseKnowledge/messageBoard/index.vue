<template>
  <div class="meesage-board">
    <message-tip
      v-if="ckNum>0||failNum>0"
      class="message-tip-box"
      :ckNum="ckNum"
      :failNum="failNum"
    ></message-tip>
    <message-info v-for="item in lvMsgList" :item="item" :key="item.id" @delLeaveMsg="delLeaveMsg"></message-info>
    <div class="leave-message" @click="leaveMessage">写留言</div>
  </div>
</template>
<script>
import MessageTip from "./components/messageTip";
import MessageInfo from "./components/messageInfo";
export default {
  name: "MessageBoard",
  components: { MessageTip, MessageInfo },
  data() {
    return {
      page: 1,
      limit: 10,
      ckNum: 0,
      failNum: 0,
      lvMsgList: []
    };
  },
  created() {
    this.getLeaveMsgList();
  },
  methods: {
    getLeaveMsgList() {
      let params = {
        page: this.page,
        limit: this.limit
      };
      this.$store
        .dispatch("diseaseKnowledge/getLeaveMsgList", params)
        .then(data => {
          this.lvMsgList = data.lvMsgList;
          this.ckNum = data.ckNum;
          this.failNum = data.failNum;
          console.log("------ss", data);
        });
    },
    leaveMessage() {
      this.$router.push({
        path: "/messageBoard/leaveMessage"
      });
    },
    delLeaveMsg(id) {
      this.$store
        .dispatch("diseaseKnowledge/delLeaveMsg", { id: id })
        .then(data => {
          this.getLeaveMsgList();
          Toast(data);
        })
        .catch(e => {
          Toast(e);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.meesage-board {
  margin-top: 0.4rem;
  .message-tip-box {
    margin-bottom: 0.32rem !important;
  }
  .leave-message {
    width: 6.4rem;
    height: 0.8rem;
    background: #009d75;
    -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 153, 102, 0.5);
    box-shadow: 0px 4px 8px 0px rgba(0, 153, 102, 0.5);
    border-radius: 0.4rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    position: fixed;
    bottom: 0.8rem;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, 0);
  }
}
</style>
