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
            <div class="like-btn">
              <div class="likeclick" @click.stop="likeBtn(item)">
                <svg-icon
                  iconClass="heart"
                  className="icon"
                  v-if="item.isStar"
                ></svg-icon>
                <svg-icon iconClass="heart" className="grey" v-else></svg-icon>
                <span>收藏</span>
              </div>
            </div>
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
        limit: 10,
      },
      total: 0,
      loading: false,
      finished: false,
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.$store
        .dispatch("common/getArticles", this.form)
        .then((data) => {
          this.acticalList = this.acticalList.concat(
            this.$store.getters.articlesList.articles
          );
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
        .catch((e) => {
          if (e) {
            Toast(e);
          }
        });
    },
    likeBtn(index) {
      if (!index.isStar) {
        let params = {
          menu: this.$route.meta.title,
          starId: index._id,
        };
        this.$store.dispatch("common/star", params).then((res) => {
          Toast({
            message: res,
            icon: "like-o",
          });
          index.isStar = !index.isStar;
        });
      } else {
        let params = { starId: index._id };
        this.$store.dispatch("common/unStar", params).then((res) => {
          Toast({
            message: res,
            icon: "like-o",
          });
          index.isStar = !index.isStar;
        });
      }
    },
    pageInfo(item) {
      if (item.link) {
        window.location.href = item.link;
      } else {
        this.$router.push({
          path: "/DetailInfo",
          name: "DetailInfo",
          query: {
            id: item._id,
            like: true,
            forward: false,
            isStar: item.isStar,
          },
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.like-btn {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .likeclick {
    display: flex;
    align-items: center;
  }
  .icon {
    fill: #ff7559 !important;
    width: 0.32rem;
    height: 0.28rem;
  }
  .grey {
    fill: #9a979b !important;
    width: 0.32rem;
    height: 0.28rem;
  }
  span {
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding-left: 0.1rem;
  }
}
.caringList {
  width: 100%;
  padding-top: 0.4rem;
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
