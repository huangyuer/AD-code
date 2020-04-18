<template>
  <div class="meesage-board">
    <message-tip
      v-if="ckNum > 0 || failNum > 0"
      class="message-tip-box"
      :ckNum="ckNum"
      :failNum="failNum"
    ></message-tip>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <message-info
        v-for="item in lvMsgList"
        :item="item"
        :key="item.id"
        @delLeaveMsg="delLeaveMsg"
      ></message-info>
    </van-list>
    <div class="leave-message" @click="leaveMessage">写留言</div>
  </div>
</template>
<script>
import MessageTip from "./components/messageTip";
import MessageInfo from "./components/messageInfo";
import { Toast } from "vant";
export default {
  name: "MessageBoard",
  components: { MessageTip, MessageInfo },
  data() {
    return {
      loading: false,
      finished: false,
      total: 0,
      params: {
        page: 1,
        limit: 10
      },
      ckNum: 0,
      failNum: 0,
      lvMsgList: []
    };
  },
  // created() {
  //   this.getLeaveMsgList();
  // },
  watch: {
    lvMsgList: function(val) {
      console.log("val", val);
      this.lvMsgList = val;
    }
  },
  methods: {
    onLoad() {
      this.getLeaveMsgList();
    },
    getLeaveMsgList() {
      this.$store
        .dispatch("diseaseKnowledge/getLeaveMsgList", this.params)
        .then(data => {
          this.lvMsgList = this.lvMsgList.concat(data.lvMsgList);
          this.total = data.total;
          this.loading = false;
          // this.lvMsgList = data.lvMsgList;
          this.ckNum = data.ckNum;
          this.failNum = data.failNum;
          if (this.lvMsgList.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.params.page = this.params.page + 1;
          }
          console.log("------ss", data);
        })
        .catch(e => {
          console.log(e);
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
          this.lvMsgList=[]
          this.getLeaveMsgList();
          Toast(data);
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.meesage-board {
  padding-top: 0.4rem;
  height: 100%;
  box-sizing: border-box;
  .message-tip-box {
    margin-bottom: 0.32rem !important;
  }
  .leave-message {
    width: 6.4rem;
    height: 0.8rem;
    background: #009d75;
    -webkit-box-shadow: 0px 0.04rem 0.08rem 0px rgba(0, 153, 102, 0.5);
    box-shadow: 0px 0.04rem 0.08rem 0px rgba(0, 153, 102, 0.5);
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
