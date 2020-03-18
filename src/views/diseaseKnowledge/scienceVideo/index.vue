<template>
  <div class="sciencevideo">
    <div class="header1">
      <span>科普视频</span>
      <span @click="toPagemore()"
        >更多<img :src="require('@/assets/up.png')"
      /></span>
    </div>
    <science-item
      :itemlist="itemlist"
      @iconcolorchange="iconcolorchange"
    ></science-item>
    <div class="title">视频直播</div>
    <div class="Link">
      <div class="LinkItem">
        <van-image
          width="100%"
          height="2.8rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-image
          class="playicon"
          width=".48rem"
          height=".48rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="LinkItem">
        <van-image
          width="100%"
          height="2.8rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-image
          class="playicon"
          width=".48rem"
          height=".48rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ScienceItem from "./components/scienceitem";
export default {
  components: { ScienceItem },
  data() {
    return {
      itemlist: [
        {
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        },
        {
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        },
        {
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          like: false,
          time: 3
        },
        {
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        },
        {
          src: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "fsdfdsffsadf",
          timer: "2019-02-08",
          time: 3,
          like: false
        }
      ]
    };
  },
  methods: {
    iconcolorchange(val, bool) {
      this.$set(this.itemlist[val], "like", bool);
    },
    toPagemore() {}
  }
};
</script>
<style lang="less" scoped>
.sciencevideo {
  .header1 {
    padding: 0.4rem 0.32rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1) {
      font-size: 0.3rem;
      line-height: initial;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(36, 36, 36, 1);
    }
    span:nth-child(2) {
      font-size: 0.28rem;
      line-height: initial;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      display: flex;
      align-items: center;
      img {
        width: 0.28rem;
        height: 0.16rem;
        transform: rotate(90deg);
        margin-left: 0.05rem;
      }
    }
  }
  .title {
    font-size: 0.3rem;
    line-height: initial;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(36, 36, 36, 1);
    padding: 0.4rem 0.32rem 0.24rem;
  }
  .Link {
    padding: 0 0.32rem;
    .LinkItem {
      position: relative;
      margin-bottom: 0.24rem;
      .playicon {
        position: absolute;
        top: calc(50% - 0.24rem);
        left: calc(50% - 0.24rem);
      }
    }
  }
}
</style>
