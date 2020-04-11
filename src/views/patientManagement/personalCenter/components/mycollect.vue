<template>
  <div class="disease-content">
    <div class="disease-search">
      <div class="category-box">
        <dropdown-menu
          v-if="getstarmenus.length != 0"
          :title="'收藏分类'"
          :value="value"
          :option="getstarmenus"
          @DropdownchangeValue="DropdownchangeValue"
        ></dropdown-menu>
        <sort-attribute :name="'收藏时间'" @sortway="sortway"></sort-attribute>
      </div>
    </div>
    <div class="patient-like">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in getmystars" :key="item.id">
          <div class="like-item" @click="topageDetail(item)">
            <div class="like-content">
              <div class="like-text">{{ item.title }}</div>
              <div class="like-btn">
                <div>
                  <svg-icon iconClass="heart" class="icon"></svg-icon>
                  <span>收藏</span>
                </div>
              </div>
            </div>
            <div class="like-time">{{ item.date }}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import LikeInfo from "@/components/LikeInfo";
import SortAttribute from "@/components/SortAttribute";
import DropdownMenu from "@/components/DropdownMenu";
import { Toast } from "vant";

export default {
  name: "DiseaseKnowledge",
  components: { LikeInfo, DropdownMenu, SortAttribute },
  data() {
    return {
      value: "",
      getstarmenus: [],
      getmystars: [],
      keylist: {
        menu: String,
        page: 1,
        limit: 10,
        desc: Boolean
      },
      total: 0,
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.getStarMenus();
  },
  methods: {
    onChange(val) {},
    DropdownchangeValue(val) {
      this.getmystars = [];
      this.$set(this.keylist, "menu", this.getstarmenus[val].text);
      this.$set(this.keylist, "page", 1);
      this.finished = false;
    },
    sortway(val) {
      console.log("------------val", val);
      this.getmystars = [];
      if (val == "asc") {
        this.$set(this.keylist, "desc", false);
        this.$set(this.keylist, "page", 1);
        this.finished = false;
      } else {
        this.$set(this.keylist, "desc", true);
        this.$set(this.keylist, "page", 1);
        this.finished = false;
      }
    },
    likeBtn(val) {
      val.isStar = !val.isStar;
    },
    topageDetail(item) {
      console.log("item==>", item);
      if (item.menu == "科普视频") {
        this.$router.push({
          path: "/scienceVideo/videoList/videoDetail",
          name: "videoDetail",
          query: {
            id: item.starId,
            like: true,
            forward: true,
            isStar: true
          }
        });
      } else if (item.menu == "常用药物" || item.menu == "关爱行动") {
        this.$router.push({
          path: "/DetailInfo",
          name: "DetailInfo",
          query: {
            id: item.starId,
            like: true,
            forward: false,
            isStar: true
          }
        });
      } else {
        this.$router.push({
          path: "/diseaseDetail",
          name: "DiseaseDetail",
          query: {
            id: item.starId,
            like: true,
            forward: true,
            isStar: true
          }
        });
      }
    },
    getStarMenus() {
      this.$store
        .dispatch("patientManagement/getStarMenus")
        .then(data => {
          let menus = this.$store.getters.getstarmenus.menus;
          for (var i = 0; i < menus.length; i++) {
            let obj = {};
            obj["text"] = menus[i];
            obj["value"] = i.toString();
            this.getstarmenus.push(obj);
          }
        })
        .catch(e => {
          //  if(e){
          //   Toast(e);
          // }
        });
    },
    getMyStars() {
      this.$store
        .dispatch("patientManagement/getMyStars", this.keylist)
        .then(data => {
          this.getmystars = this.getmystars.concat(
            this.$store.getters.getmystars.stars
          );
          this.total = this.$store.getters.getmystars.total;
          this.loading = false;
          if (this.getmystars.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.keylist.page = this.keylist.page + 1;
          }
        })
        .catch(e => {
          //  if(e){
          //   Toast(e);
          // }
        });
    },
    onLoad() {
      this.getMyStars();
    }
  }
};
</script>
<style lang="less" scoped>
.disease-content {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.disease-search {
  padding-top: 0.4rem;
}
.patient-like {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
.category-box {
  display: flex;
  align-items: center;
  padding-bottom: 0.32rem;
  .category-li {
    width: 2rem;
    height: 0.56rem;
    background: rgba(247, 247, 247, 1);
    border-radius: 0.28rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 0.56rem;
    text-align: center;
    color: rgba(0, 153, 102, 1);
    &:last-child {
      margin-left: 0.4rem;
    }
  }
}
.like-item {
  height: 1.32rem;
  border-top: 0.02rem solid rgba(243, 243, 243, 1);

  border-bottom: 0.02rem solid rgba(243, 243, 243, 1);
  position: relative;
  padding: 0 0.32rem;
  margin-bottom: 0.2rem;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    content: "";
    /* height: 8px; */
    width: 0.08rem;
    height: 0.8rem;
    background: rgba(0, 153, 102, 1);
    border-radius: 0.04rem;
  }
  .like-content {
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    .like-text {
      font-size: 0.3rem;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: rgba(5, 15, 43, 1);
      height: 0.8rem;
      line-height: 0.8rem;
    }
    .like-btn {
      display: flex;
      justify-content: center;
      align-items: flex-end;
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
      }
    }
  }
  .like-time {
    font-size: 0.28rem;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    color: rgba(172, 173, 175, 1);
    line-height: 1;
  }
}
</style>
