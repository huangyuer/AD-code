<template>
  <div class="caringList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="caringItem" v-for="(item, index) in acticalList" :key="index">
        <div class="header">
          <div class="left">
            {{ item.title }}
          </div>
          <div class="right">
            <span class="saveicon" @click="iconcolorchange()">
              <svg-icon
                iconClass="heart"
                :class="{ 'heart-icon': true, iconactive: index.isStar }"
              />
              收藏
            </span>
          </div>
        </div>
        <div class="center" @click="pageInfo(item)">
          <van-image
            width="100%"
            height="2.6rem"
            :src="item.coverImg[0].httpUrl"
            fit="cover"
          />
        </div>
        <div class="bottom">
          {{ item.date }}
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      acticalList: [],
      form: {
        menu: this.$route.meta.title,
        childMenu: String,
        tag: String,
        title: String,
        page: 1,
        limit: 15
      },
      total: 0
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.$store
        .dispatch("common/getArticles", this.form)
        .then(data => {
          if (this.acticalList != null) {
            this.acticalList = this.acticalList.concat(
              this.$store.getters.articlesList.articles
            );
          } else {
            this.acticalList = this.$store.getters.articlesList.articles;
          }
          this.total = this.$store.getters.articlesList.total;
          this.loading = false;
          if (this.acticalList.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.form.page = this.form.page + 1;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    iconcolorchange() {
      var hearticon = document.getElementsByClassName("heart-icon")[0];
      if (!hearticon.classList.contains("iconactive")) {
        hearticon.classList.add("iconactive");
        Toast({
          message: "收藏成功",
          icon: "like-o"
        });
      } else {
        hearticon.classList.remove("iconactive");
        Toast({
          message: "取消收藏",
          icon: "like-o"
        });
      }
    },
    pageInfo(item) {
      if (item.link) {
        window.location.href = item.link;
      } else {
        this.$router.push({ path: "/DetailInfo?id=" + item._id });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.saveicon {
  display: flex;
  justify-content: center;
  align-items: center;
  .heart-icon {
    width: 0.32rem !important;
    height: 0.28rem !important;
    fill: #9a979b !important;
    margin-right: 0.06rem;
    &.iconactive {
      fill: #ff765d !important;
    }
  }
}
.caringList {
  width: 100%;
  .caringItem {
    width: 95%;
    border-radius: 0.08rem;
    border: 2px solid #f3f3f3;
    margin: 0 auto;
    box-sizing: border-box;
    margin-bottom: 0.3rem;
    .header {
      height: 0.7rem;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.3rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(5, 15, 43, 1);
        flex: 9;
      }
      .right {
        font-size: 0.24rem;
        color: #999999;
        font-family: "PingFangSC-Regular";
        display: flex;
        align-items: center;
      }
    }
    .center {
      overflow: hidden;
      line-height: 0;
    }
    .bottom {
      padding: 0 0.2rem;
      font-size: 0.3rem;
      color: #acadaf;
      text-align: left;
      height: 0.7rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
