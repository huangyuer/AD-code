<template>
  <van-swipe-cell>
    <div class="message-info" @click="MessageDetail">
      <div class="message-top">
        <div class="avatar-box">
          <img :src="item.headImg" alt />
          <div class="sex-age">
            <span>{{item.sex}}</span>
            <span>{{item.age}}岁</span>
          </div>
        </div>
        <span>{{item.before}}</span>
      </div>
      <div class="message-body">{{item.description}}</div>
      <div class="message-footer">
        <div>{{item.tag}}</div>
        <div>{{item.level}}</div>
      </div>
    </div>
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" @click="delLeaveMsg" />
    </template>
  </van-swipe-cell>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "messageInfo",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    delLeaveMsg(){
      this.$emit("delLeaveMsg",this.item._id )
    },
    MessageDetail(){
      this.$router.push({
        path: "/MessageDetail",name:'MessageDetail',params:{msgItem:this.item}
      });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@{aaa} .van-button--danger {
  height: 100%;
  font-size: 0.28rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: #FF755A;
  border:none
}
.message-info {
  background: rgba(255, 255, 255, 1);
  border-top: 0.02rem solid rgba(243, 243, 243, 1);
  border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
  margin-bottom: 0.2rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 0.08rem;
    height: 0.8rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 4px;
  }
  .message-top {
    padding: 0.2rem 0.32rem 0.12rem 0.32rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > span {
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .avatar-box {
      display: flex;
      flex-direction: row;
      img {
        width: 0.72rem;
        height: 0.72rem;
        border-radius: 100%;
      }
      .sex-age {
        padding-left: 0.16rem;
        display: flex;
        flex-direction: column;

        span {
          font-size: 0.28rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          &:last-child {
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
  }
  .message-body {
    max-height: 0.88rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding: 0 0.32rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .message-footer {
    display: flex;
    padding-left: 0.32rem;
    padding-top: 0.08rem;
    padding-bottom: 0.2rem;
    > div {
      // min-width: 1.2rem;
      padding: 0 0.32rem;
      height: 0.52rem;
      background: #caf6e7;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      line-height: 0.52rem;
      text-align: center;
      &:last-child {
        color: rgba(242, 169, 0, 1);
        background: rgba(255, 240, 206, 1);
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
