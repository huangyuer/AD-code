<template>
  <div class="personalCenter">
    <Dialog
      :show="diaLogShow"
      :title="'恭喜！您已完成注册！'"
      :content="'【关爱自己，从疾病评估开始。】是否进一步了解您的皮肤状况？'"
      :isClose="false"
    >
      <div slot="confirmButton" class="dialog-confirm" @click="confirmBtn">前往疾病评估</div>
      <div slot="closeButton" @click="closeBtn">
        <svg-icon iconClass="register-close" class="close-icon"></svg-icon>
      </div>
    </Dialog>

    <div class="header">
      <div class="top">
        <div class="left">
          <van-image round fit="cover" width="1.32rem" height="1.32rem" :src="user.headImg" />
          <div class="nameitem">
            <div class="name">
              {{ user.name != "" ? user.name : user.nickName }}
              <span
                class="pagetoinfo"
                @click="toPagepersonalInfo()"
              >个人信息</span>
            </div>
            <div class="phone">{{ user.phone }}</div>
          </div>
        </div>
        <div class="right">
          <span>最近评估：</span>
          <div v-if="Object.keys(answerLogs).length > 0" style="display:flex;align-item:center;">
            <span class="deg">{{ answerLogs.score }}</span>
            <svg-icon
              iconClass="jiantoushangseng"
              v-if="parseInt(answerLogs.addScore) > 0"
              class="iconjiantou"
            ></svg-icon>
            <svg-icon
              iconClass="jiantouchiping"
              v-else-if="
                answerLogs.addScore == '' || parseInt(answerLogs.addScore) == 0
              "
              class="iconjiantou"
            ></svg-icon>
            <svg-icon
              iconClass="jiantouxiajiang"
              v-else-if="parseInt(answerLogs.addScore) < 0"
              class="iconjiantou"
            ></svg-icon>
          </div>
          <span class="deg" v-else>无</span>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-top">
          <div class="scalenumber">积分：{{ score.nowScore }}</div>
          <div class="title">完成更多任务赚取积分</div>
          <div class="pos-btn" @click="toPageintefralExchange()">积分兑换</div>
        </div>
        <van-image
          fit="cover"
          width="100%"
          height=".18rem"
          style="position: absolute; bottom: -0.1rem; z-index: -1;opacity:.8"
          :src="require('@/assets/tuoyuanxing.png')"
        />
      </div>
    </div>
    <div class="tipList">
      <!-- 任务列表 -->
      <div class="tipitem task" ref="taskitemlist">
        <div class="tipitem-header">
          <span>
            <svg-icon iconClass="tuoyuan" class="tuoyuan"></svg-icon>任务列表
          </span>
          <span ref="text" @click="isshoeAll()">显示全部</span>
        </div>
        <div class="itemlist">
          <div v-if="tasks.length > 0">
            <div class="iteminner" v-for="(item, index) in tasks" :key="index">
              <div
                :class="{
                  color9: item.status == '已完成',
                  color3: item.status == '未完成'  || item.status == '去完成',
                  'font-size28': true
                }"
              >{{ item.name }}（{{ item.num }}/{{ item.limit }}）</div>
              <div
                :class="{
                  btnpage: true,
                  whitenone: true,
                  color7: item.status == '未完成',
                  colorgreen:item.status == '去完成'
                }"
                @click="topageTask(item)"
              >{{ item.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tipList">
      <!-- 我的收藏 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>
            <svg-icon iconClass="tuoyuan" class="tuoyuan"></svg-icon>我的收藏
          </span>
          <span @click="toPagemycollect()">
            更多
            <img :src="require('@/assets/up.png')" />
          </span>
        </div>
        <div class="itemlist">
          <div v-if="stars.length > 0">
            <div v-for="(item, index) in stars" :key="index">
              <div class="iteminner fmregular" v-if="index < 3">
                <div class="color52 font-size28 overflowhidden">
                  {{
                  item.title
                  }}
                </div>
                <div class="coloracadaf font-size28">{{ item.date }}</div>
              </div>
            </div>
          </div>
          <div style="font-size:.28rem" v-else>您还没有进行收藏</div>
        </div>
      </div>
    </div>
    <div class="tipList">
      <!-- 疾病评估 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>
            <svg-icon iconClass="tuoyuan" class="tuoyuan"></svg-icon>疾病评估
          </span>
          <span @click="todiseaseTest()">
            去评估
            <img :src="require('@/assets/up.png')" />
          </span>
        </div>
        <div class="itemlist">
          <div class="iteminner" v-if="Object.keys(answerLogs).length > 0">
            <div class="color52 font-size28">
              <div
                class="color3 font-size30 fmmedium"
              >{{ user.name != "" ? user.name : user.nickName }}</div>
              <div class="color3 font-size28 fmregular">
                您最近一次评估程度为
                <b class="color009966 fmmedium">{{ answerLogs.score }}分</b>
              </div>
            </div>
            <div class="btnpage" @click="toPagetesthistory()">查看报告</div>
          </div>
          <div style="font-size:.28rem" v-else>您还没有进行评估</div>
        </div>
      </div>
    </div>
    <div class="tipList">
      <!-- 我的留言板 -->
      <div class="tipitem">
        <div class="tipitem-header">
          <span>
            <svg-icon iconClass="tuoyuan" class="tuoyuan"></svg-icon>我的留言板
          </span>
          <span @click="toPageleavemessage()">
            去留言
            <img :src="require('@/assets/up.png')" />
          </span>
        </div>
        <div class="itemlist">
          <div class="iteminner" v-if="Object.keys(msglist).length > 0">
            <div class="color52 font-size28">
              <div class="color3 font-size30 fmmedium">
                {{ msglist.sex }}
                <span
                  style="margin-left: 0.16rem;"
                  class="color6 font-size28 fmregular"
                >{{ msglist.age }}岁</span>
              </div>
              <div class="color3 font-size28 fmregular">
                您最近一次留言时间为
                <b class="color009966 fmmedium">{{ msglist.before }}</b>
              </div>
            </div>
            <div class="btnpage" @click="toPagelookmessage()">查看留言</div>
          </div>
          <div style="font-size:.28rem" v-else>您没有更多已发布的留言</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Dialog from "@/components/Dialog";
import { Toast } from "vant";
export default {
  components: { Dialog },
  data() {
    return {
      diaLogShow: this.$route.params.diaLogShow,
      tasks: [],
      stars: [],
      answerLogs: {},
      msglist: {},
      user: {},
      score: {}
    };
  },
  created() {
    this.getMyInfo();
    this.getMyScore();
    this.getLeaveMsgList();
    this.getTasks();
    this.getMyStars();
    this.getAnswerLogs();
  },
  mounted() {},
  methods: {
    isshoeAll() {
      if (this.$refs.taskitemlist.classList.contains("heightauto")) {
        this.$refs.taskitemlist.classList.remove("heightauto");
        this.$refs.text.innerText = "显示全部";
      } else {
        this.$refs.taskitemlist.classList.add("heightauto");
        this.$refs.text.innerText = "收起";
      }
    },
    closeBtn() {
      this.diaLogShow = false;
    },
    confirmBtn() {
      this.diaLogShow = false;
      this.$router.push({
        path: "/diseaseTest"
      });
    },
    topageTask(item) {
      if (item.limit > item.num) {
        switch (item.name) {
          case "首次完成疾病评估":
            this.$router.push({ path: "/diseaseTest" });
            break;
          case "疾病评估":
            this.$router.push({ path: "/diseaseTest" });
            break;
          case "完善个人信息":
            this.$router.push({ path: "/personalInfo" });
            break;
          case "查看推文/视频":
            this.$router.push({ path: "/scienceVideo" });
            break;
          case "查找专业医院":
            this.$router.push({ path: "/hospitalMap" });
            break;
          case "留言板":
            this.$router.push({ path: "/messageBoard/leaveMessage" });
            break;
          case "邀请AD好友":
            this.$router.push({ path: "/personalInfo" });
          default:
            "";
        }
      }
    },
    toPagepersonalInfo() {
      this.$router.push({ path: "/personalInfo" });
    },
    toPageintefralExchange() {
      this.$router.push({ path: "/integralExchange" });
    },
    toPagemycollect() {
      this.$router.push({ path: "/myCollect" });
    },
    todiseaseTest() {
      this.$router.push({ path: "/diseaseTest" });
    },
    toPagetesthistory() {
      this.$router.push({
        path: "/assesshistory/assessDetail?id=" + this.answerLogs._id
      });
    },
    toPageleavemessage() {
      this.$router.push({ path: "/messageBoard/leaveMessage" });
    },
    toPagelookmessage() {
      this.$router.push({
        path: "/MessageDetail",
        name: "MessageDetail",
        params: { msgItem: this.msglist }
      });
    },
    getTasks() {
      this.$store
        .dispatch("patientManagement/getTasks")
        .then(response => {
          this.tasks = response.data.tasks;
        })
        .catch(e => {
          //   if(e){
          //   Toast(e);
          // }
        });
    },
    getMyStars() {
      var form = {
        menu: String,
        desc: true,
        page: 1,
        limit: 10
      };
      this.$store
        .dispatch("patientManagement/getMyStars", form)
        .then(response => {
          this.stars = this.$store.getters.getmystars.stars;
          // this.tasks = response.data.tasks;
          // this.goods = response.data.goods;
        })
        .catch(e => {});
    },
    getAnswerLogs() {
      var form = {
        page: 1,
        limit: 10,
        startDate: String,
        endDate: String,
        isChart: false
      };
      this.$store
        .dispatch("patientManagement/getAnswerLogs", form)
        .then(response => {
          if (response.data.answerLogs.length > 0) {
            this.answerLogs = response.data.answerLogs[0];
          }
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    },
    getMyInfo() {
      this.$store
        .dispatch("patientManagement/getMyInfo")
        .then(data => {
          this.user = this.$store.getters.getmyinfo.user;
        })
        .catch(e => {
          //   if(e){
          //   Toast(e);
          // }
        });
    },
    getMyScore() {
      this.$store
        .dispatch("patientManagement/getMyScore")
        .then(response => {
          this.score = response.data.score;
        })
        .catch(e => {
          // if(e){
          //   Toast(e);
          // }
        });
    },
    getLeaveMsgList() {
      var form = {
        page: 1,
        limit: 10
      };
      this.$store
        .dispatch("diseaseKnowledge/getLeaveMsgList", form)
        .then(response => {
          if (response.lvMsgList.length > 0) {
            this.msglist = response.lvMsgList[0];
          }
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
@aaa: ~">>>";
.tuoyuan {
  width: 0.2rem !important;
  height: 0.2rem !important;
  margin-right: 0.12rem;
}
@{aaa} .dialog {
  padding: 0.4rem 0.3rem 0.6rem 0.3rem !important;
}
.close-icon {
  position: fixed;
  z-index: 99999;
  top: 62.5%;
  left: calc(50% - 0.2rem);
  width: 0.4rem !important;
  height: 0.4rem !important;
}
.dialog-confirm {
  width: 3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background: rgba(0, 153, 102, 1);
  border-radius: 0.3rem;
  font-size: 0.28rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin: 0.32rem auto 0 auto;
}
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
        .iconjiantou {
          width: 0.4rem;
          height: 0.44rem;
        }
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
      position: relative;
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
          font-family: "PingFangTC-Semibold";
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
          display: flex;
          align-items: center;
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
            &.color7 {
              color: #ff755a;
              border: 0.02rem solid #ff755a;
            }
            &.colorgreen {
              color: #009966;
              border: 0.02rem solid #009966;
            }
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
          .overflowhidden {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 5rem;
          }
        }
      }
      &.task {
        max-height: 2.8rem;
        overflow: hidden;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari 和 Chrome */
        -o-transition: all 0.5s; /* Opera */
        &.heightauto {
          max-height: 11rem;
        }
      }
    }
  }
}
</style>
