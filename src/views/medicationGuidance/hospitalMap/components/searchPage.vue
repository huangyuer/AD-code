<!-- 
props: value:'',placeholder:'',recentSearch:{type:"最近输入位置",data:[]}
event:recentClear,onChange 
-->
<template>
  <div class="searchpage">
  <form action="#">
    <van-search
      v-model="value"
      placeholder="输入我的位置"
      class="seach-input"
      @search="onSearch"
      @change="onChange"
      @focus="onFocus"
      @clear="onClear"
      type="search"
    />
    </form>
    <div class="recent-search" v-if="recentFlag">
      <div class="recent-search-title">
        <span>{{ recentSearch.type }}</span>
        <span class="clear" @click="recentClear" v-if="recentSearch.type!='搜索结果'">清除</span>
      </div>
      <div
        v-for="item in searchResult"
        :key="item"
        class="recent-search-li"
        @click="recentItem(item)"
      >
        <svg-icon iconClass="search" class="icon"></svg-icon>
        <span>{{ item.province + item.city + item.address }}</span>
      </div>
    </div>
    <!-- <svg-icon iconClass='search' className='icon'></svg-icon> -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "SearchInput",
  data() {
    return {
      value: "",
      recentFlag: false,
      recentSearch: {
        type: "最近输入位置",
        data: [] //"上海市皮肤病医院", "上海江城皮肤病医院"
      },
      searchResult: [],
      list: []
    };
  },
  created() {
    if (localStorage.getItem("recentSearch") != null) {
      this.searchResult = JSON.parse(localStorage.getItem("recentSearch"));
      this.recentFlag = true;
    }
  },
  methods: {
    onSearch() {
      // console.log("-", this.value);
      if (this.value == "") {
        if (localStorage.getItem("recentSearch") != null) {
          this.searchResult = JSON.parse(localStorage.getItem("recentSearch"));
          this.recentFlag = true;
        } else {
          this.searchResult = [];
        }
        this.recentSearch.type = "最近输入位置";
      } else {
        this.searchAddress();
      }
    },
    onChange() {
      console.log("--2-", this.value);
      this.$emit("onChange", this.value);
    },
    onFocus() {
      this.recentFlag = true;
    },
    onClear() {
      this.$emit("onClear");
    },
    recentItem(item) {
      // this.value = item;
      this.recentFlag = false;
      this.recentSearch.data.push(item);
      if (localStorage.getItem("recentSearch") != null) {
        localStorage.setItem(
          "recentSearch",
          JSON.stringify(
            this.recentSearch.data.concat(
              JSON.parse(localStorage.getItem("recentSearch"))
            )
          )
        );
      } else {
        localStorage.setItem(
          "recentSearch",
          JSON.stringify(this.recentSearch.data)
        );
      }
      this.$router.push({
        path: "/hospitalMap",
        name: "HospitalMap",
        params: { item: item }
      });
    },
    recentClear() {
      localStorage.removeItem("recentSearch");
      this.searchResult = [];
    },
    searchAddress() {
      this.$store
        .dispatch("medicationGuidance/searchAddress", this.value)
        .then(res => {
          this.searchResult = res.data.address;
          this.recentSearch.type = "搜索结果";
          this.recentFlag = true;
          console.log(res);
        })
        .catch(e => {
          if(e){
            Toast(e);
          }
        });
    }
  },
  watch: {
    value: function(val, oldval) {
      if (val == "" && oldval != "") {
        if (localStorage.getItem("recentSearch") != null) {
          this.searchResult = JSON.parse(localStorage.getItem("recentSearch"));
        }
        this.recentSearch.type = "最近输入位置";
      }
    }
  }
};
</script>

<style scoped lang="less">
@aaa: ~">>>";
.searchpage {
  padding-top: 0.4rem;
}
.seach-input {
  background: rgba(249, 249, 249, 1);
  border-radius: 0.51rem;
  height: 0.72rem;
  margin: 0 0.32rem;
  padding: 0px;
}
.recent-search {
  padding: 0 0.32rem;
  .recent-search-title {
    padding-top: 0.12rem;
    height: 0.74rem;
    line-height: 0.74rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.02rem solid #e5e5e5;
    span {
      font-size: 0.3rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      &.clear {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .recent-search-li {
    border-bottom: 0.02rem solid #e5e5e5;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    align-items: center;

    .icon {
      width: 0.32rem;
      height: 0.32rem;
      margin-right: 0.16rem;
    }
    span {
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
@{aaa} .van-search__content {
  padding-left: 0.32rem;
  border-radius: 0.51rem;
}
@{aaa} .van-field__left-icon {
  margin-right: 0.16rem;
}
@{aaa} input {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  &::-webkit-input-placeholder {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
@{aaa} .van-icon-search {
  &::before {
    content: "\e68f";
  }
}
@{aaa} .van-field__value {
  .van-icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
}
@{aaa} .van-field__left-icon {
  .van-icon {
    font-family: "iconfont" !important;
    font-size: 0.36rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #8e8e93;
  }
}
</style>
