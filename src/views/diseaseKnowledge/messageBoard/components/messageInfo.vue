<template>
  <div class="message-info">
    <div class="message-top">
      <div class="avatar-box">
        <img src="@/assets/avatar.png" alt="" />
        <div class="sex-age">
          <span>男</span>
          <span>28岁</span>
        </div>
      </div>
      <span>20分钟前</span>
    </div>
    <div class="message-body">
      2个月前出现头皮非瘙痒性皮疹，继而出现双侧眼睑及眶周水肿。非瘙痒性皮疹逐渐蔓延至全身大部分皮肤。sssssssss最…
    </div>
    <div class="message-footer">
      <div>鱼鳞病</div>
      <div>中度</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "messageInfo",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.message-info {
  height: 2.8rem;
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
    height: 0.88rem;
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
    > div {
      width: 1.2rem;
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
