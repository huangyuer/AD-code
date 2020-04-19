<template>
  <div class="message-detail">
    <van-image-preview v-model="show" :images="images" @change="onChange"></van-image-preview>
    <div class="message-info">
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
      <div class="message-footer">
        <div>{{item.tag}}</div>
        <div>{{item.level}}</div>
      </div>
      <div class="message-body">{{item.description}}</div>
      <div class="message-img">
        <!-- <img src="../../../../assets/avatar.png" alt=""> -->
        <img
          v-for="(img,index) in item.images"
          :key="img.id"
          :src="img.httpUrl"
          @click="privewPic(index)"
          alt
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageDetail",
  data() {
    return {
      item: this.$route.params.msgItem,
      show: false,
      index: 0,
      images: []
    };
  },
  created() {
    for (const key in this.item.images) {
      if (this.item.images.hasOwnProperty(key)) {
        this.images.push(this.item.images[key].httpUrl);
      }
    }
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    privewPic(index) {
      this.index = index;
      this.show = true;
    }
  }
};
</script>
<style lang='less' scoped>
.message-detail {
}
.message-info {
  height: 2.8rem;
  background: rgba(255, 255, 255, 1);
  border-top: 0.02rem solid rgba(243, 243, 243, 1);
  margin-bottom: 0.2rem;
  .message-top {
    padding: 0.4rem 0.32rem 0.12rem 0.32rem;
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
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding: 0 0.32rem;
    padding-top: 0.28rem;
  }
  .message-footer {
    display: flex;
    padding-left: 0.32rem;
    padding-top: 0.08rem;
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
  .message-img {
    display: flex;
    margin-top: 0.18rem;
    margin-left: 0.17rem;
    flex-wrap: wrap;
    img {
      width: 3.28rem;
      height: 2.4rem;
      margin: 0.14rem 0.15rem;
      object-fit: cover;
    }
  }
}
</style>
