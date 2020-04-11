<template>
  <div class="sciencevideo">
    <div class="header1">
      <span>科普视频</span>
      <span @click="toPagemore()">
        更多
        <!-- <img :src="require('@/assets/up.png')" /> -->
        <svg-icon iconClass="gengduo" class="gengduo"></svg-icon>
      </span>
    </div>
    <science-item :itemlist="videoList" @likeBtn="likeBtn" @toPageVideodetail="toPageVideodetail"></science-item>
    <div v-if="LiveList">
      <div class="title">视频直播</div>
      <div class="Link">
        <div class="LinkItem" @click="liveToPage(LiveList)">
          <van-image
            width="100%"
            height="2.8rem"
            fit="cover"
            :src="
              LiveList.coverImg.length>0
                ? LiveList.coverImg[0].httpUrl
                : 'https://img.yzcdn.cn/vant/cat.jpeg'
            "
          />
          <svg-icon iconClass="bofang" class="playicon"></svg-icon>
          <!-- <van-image
            class="playicon"
            width=".48rem"
            height=".48rem"
            fit="cover"
            :src="require('@/assets/play.png')"
          />-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScienceItem from "./components/scienceitem";
import { Toast } from "vant";
export default {
  components: { ScienceItem },
  data() {
    return {
      videoList: [],
      LiveList: "",
      form: {
        page: 1,
        limit: 10,
        tag: String,
        sort: String,
        desc: false
      }
    };
  },
  mounted() {
    this.getVideos();
    this.getLive();
  },
  methods: {
    likeBtn(val) {
      val.isStar = !val.isStar;
    },
    toPageVideodetail(item, key) {
      this.$store
        .dispatch("diseaseKnowledge/upVideoClickNum", item._id)
        .then(data => {
          this.$router.push({
            path: "/scienceVideo/videoList/videoDetail",
            name: "videoDetail",
            query: {
              id: item._id,
              like: true,
              forward: true,
              isStar: item.isStar
            }
          });
        })
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    },
    toPagemore() {
      this.$router.push({
        path: "/scienceVideo/videoList"
      });
    },
    liveToPage(liveItem) {
      if (liveItem.liveAdd) {
        window.location.href = liveItem.liveAdd;
      } else {
        Toast("直播不存在");
      }
    },
    getVideos() {
      this.$store
        .dispatch("diseaseKnowledge/getVideos", this.form)
        .then(data => {
          if (this.$store.getters.videoList.videos.length < 5) {
            this.videoList = this.$store.getters.videoList.videos;
          } else {
            for (var i; i < 4; i++) {
              this.videoList = this.videoList.concat(
                this.$store.getters.videoList.videos[i]
              );
            }
          }
        })
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    },
    getLive() {
      this.$store
        .dispatch("diseaseKnowledge/getLive")
        .then(data => {
          this.LiveList = this.$store.getters.LiveList.live;
        })
        .catch(e => {
          // if (e) {
          //   Toast(e);
          // }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.gengduo {
  width: 0.16rem !important;
  height: 0.28rem !important;
  margin-left: 0.12rem;
}
.sciencevideo {
  .header1 {
    padding: 0.4rem 0.32rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1) {
      font-size: 0.3rem;
      line-height: initial;
      // font-family: "PingFangSC-Medium";
      font-weight: 600;
      color: rgba(36, 36, 36, 1);
    }
    span:nth-child(2) {
      font-size: 0.28rem;
      line-height: initial;
      // font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: #999999;
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
    // font-family: "PingFangSC-Medium";
    font-weight: 600;
    color: rgba(36, 36, 36, 1);
    padding: 0.4rem 0.32rem 0.24rem;
  }
  .Link {
    padding: 0 0.32rem;
    .LinkItem {
      position: relative;
      margin-bottom: 0.24rem;
      .playicon {
        width: 0.48rem;
        height: 0.48rem;
        position: absolute;
        top: calc(50% - 0.24rem);
        left: calc(50% - 0.24rem);
      }
    }
  }
}
</style>
