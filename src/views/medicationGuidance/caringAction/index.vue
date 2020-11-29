<template>
  <div class="caringList">
    <van-sticky>
      <div style="background: #ffffff; padding-top: 0.12rem;">
        <search-input
          class="searchinput"
          :value="searchinputvalue"
          placeholder="搜索关键字"
          @onSearch="onSearch"
          @onClear="onClear"
        ></search-input>
        <div style="overflow: hidden">
        <van-dropdown-menu active-color="#009966">
          <van-dropdown-item
            v-model="currentProvince"
            :options="provinceList"
            @change="changeCurrentProvince"
          />
        </van-dropdown-menu>
        <van-dropdown-menu active-color="#009966">
          <van-dropdown-item
            v-model="currentProvinceCity"
            :options="currentProvinceCityList"
            @change="changeCurrentCity"
          />
        </van-dropdown-menu>
        </div>
      </div>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="caringItem" v-for="(item, index) in acticalList" :key="index">
        <div class="header">
          <div class="left">{{ item.title }}</div>
          <div class="right">
            <div class="like-btn">
              <div class="likeclick" @click.stop="likeBtn(item)">
                <svg-icon iconClass="heart" class="icon" v-if="item.isStar"></svg-icon>
                <svg-icon iconClass="heart" class="grey" v-else></svg-icon>
                <span>收藏</span>
              </div>
            </div>
          </div>
        </div>
        <div class="center" @click="pageInfo(item)">
          <van-image width="100%" height="2.6rem" :src="item.coverImg[0]&&item.coverImg[0].httpUrl" fit="cover" />
        </div>
        <div class="bottom">{{ item.date }}</div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { Toast } from "vant";
import areaList from "../../../components/area";
import SearchInput from "@/components/SearchInput";
export default {
  data() {
    return {
      searchinputvalue: "",
      provinceList: [],
      currentProvince: '',
      currentProvinceCityList: [{
        text: '请选择城市',
        value: ''
      }],
      currentProvinceCity: '',
      acticalList: [],
      form: {
        menu: this.$route.meta.title,
        childMenu: String,
        tag: String,
        title: String,
        province: '',
        city: '',
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false,
      finished: false
    };
  },
  components: {
    SearchInput
  },
  created() {
    this.initProvinceList();
  },
  methods: {
    changeCurrentProvince(e) {
      this.currentProvince = e;
      this.form.province = areaList.province_list[e];
      this.currentProvinceCity = '';
      this.form.city = '';
      this.acticalList = [];
      this.form.page = 1;
      this.onLoad();
      this.initCurrentProvinceCityList(e);
    },
    changeCurrentCity(e) {
      this.currentProvinceCity = e;
      this.form.city = areaList.city_list[e];
      this.acticalList = [];
      this.form.page = 1;
      this.onLoad();
    },
    onSearch(value) {
      this.form.title = value;
      this.acticalList = [];
      this.form.page = 1;
      this.onLoad();
    },
    onClear() {
      this.form.title = "";
      this.acticalList = [];
      this.form.page = 1;
      this.onLoad();
    },
    initProvinceList() {
      const province_list = [{
        text: '请选择省份/地区',
        value: ''
      }];
      for (var p in areaList.province_list){
        let obj = {
          value: p,
          text: areaList.province_list[p]
        };
        province_list.push(obj);
      }
      this.provinceList = province_list;
    },
    initCurrentProvinceCityList(e) {
      const key = e.substr(0,2);
      const currentProvinceCity_list = [{
        text: '请选择城市',
        value: ''
      }];
      for (var p in areaList.city_list){
        if (parseInt(key+'0000') <= parseInt(p) && parseInt(p) <= parseInt(key+'9999')) {
          let obj = {
            value: p,
            text: areaList.city_list[p]
          };
          currentProvinceCity_list.push(obj);
        }
      }
      this.currentProvinceCityList = currentProvinceCity_list;
    },
    onLoad() {
      // this.finished = false;
      this.$store
        .dispatch("common/getArticles", this.form)
        .then(data => {
          this.total = data.total;
          if (this.acticalList.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
          } else {
            this.acticalList = this.acticalList.concat(
              this.$store.getters.articlesList.articles
            );
            this.loading = false;
            this.form.page = this.form.page + 1;
          }
        });
    },
    likeBtn(index) {
      if (!index.isStar) {
        let params = {
          menu: this.$route.meta.title,
          starId: index._id
        };
        this.$store.dispatch("common/star", params).then(res => {
          Toast({
            message: res,
            icon: "like-o"
          });
          index.isStar = !index.isStar;
        });
      } else {
        let params = { starId: index._id };
        this.$store.dispatch("common/unStar", params).then(res => {
          Toast({
            message: res,
            icon: "like-o"
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
          path: "/caringActionDetailInfo",
          name: "caringActionDetailInfo",
          query: {
            menu:'关爱行动',
            title: item.title,
            id: item._id,
            like: true,
            forward: false,
            isStar: item.isStar
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
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
    border: 0.02rem solid #f3f3f3;
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
      font-size: 0.28rem;
      color: #acadaf;
      text-align: left;
      height: 0.7rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}

.van-dropdown-menu {
  float: left;
  height: auto;
  &:after {
    border: 0;
  }
}
@{aaa} .van-dropdown-menu__item {
  padding-right: 0.56rem;
  font-family: "PingFangSC-Medium";
}
@{aaa} .van-dropdown-menu__title {
  font-size: 0.28rem;
  padding: 0 0.32rem;
  line-height: initial;
  &:after {
    // content:none;
    width: 0.28rem;
    height: 0.28rem;
    border: 0;
    background-image: url("../../../assets/up.png");
    background-size: 100% 100%;
    transform: rotate(180deg);
    top: calc(50% - 0.05rem);
    right: -0.1rem;
  }
  &.van-dropdown-menu__title--down::after {
    margin-top: -0.01rem;
    transform: rotate(0);
    top: calc(50% - 0.15rem);
    background-image: url("../../../assets/upgreen.png");
    background-size: 100% 100%;
  }
}
@{aaa}.van-dropdown-menu__item {
  &:before {
    content: "";
    border: 0;
  }
}
@{aaa}.van-overlay {
  top: 0.03rem;
}
@{aaa} .van-cell:not(:last-child)::after {
  border: 0;
}
@{aaa} .van-cell {
  font-size: 0.28rem;
  // padding: 0.16rem 0.32rem;
  font-family: "PingFangSC-Regular";
  line-height: initial;
}
@{aaa}.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
}
@{aaa}.van-dropdown-item__content {
  padding-top: 0.22rem;
  padding-bottom: 0.36rem;
  box-sizing: border-box;
  background-color: #ffffff;
}
@{aaa}.van-dropdown-menu__bar {
  box-shadow: none;
}
</style>
