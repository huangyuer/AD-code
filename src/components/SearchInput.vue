<!-- 
props: value:'',placeholder:'',recentSearch:{type:"最近输入位置",data:[]}
event:recentClear,onChange 
-->
<template>
  <div>
    <form action="#">
      <van-search
        v-model="value"
        :readonly="readonly"
        :placeholder="placeholder"
        class="seach-input"
        @search="onSearch"
        @change="onChange"
        @focus="onFocus"
        @clear="onClear"
        type="search"
      />
    </form>
    <div class="recent-search" v-if="recentSearch.type && recentFlag">
      <div class="recent-search-title">
        <span>{{ recentSearch.type }}</span>
        <span class="clear" @click="recentClear">清除</span>
      </div>
      <div
        v-for="item in recentSearch.data"
        :key="item.id"
        class="recent-search-li"
        @click="recentItem(item)"
      >
        <svg-icon iconClass="search" class="icon"></svg-icon>
        <span>{{ item }}</span>
      </div>
    </div>
    <!-- <svg-icon iconClass='search' className='icon'></svg-icon> -->
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    recentSearch: {
      type: Object,
      default: function() {
        return {};
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    valuesearch: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: "",
      recentFlag: false
    };
  },
  methods: {
    onSearch() {
      console.log("-", this.value);
      this.$emit("onSearch", this.value);
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
      this.value = item;
      this.recentFlag = false;
    },
    recentClear() {
      this.$emit("recentClear");
    }
  },
  watch: {
    value: function(val, oldval) {
      if (val == "" && oldval != "") {
        this.$emit("onClear");
      }
    },
    valuesearch: function(val) {
      this.value = val;
      console.log("fsflskdajfsajf");
    }
  }
};
</script>

<style scoped lang="less">
@aaa: ~">>>";
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
    padding-left: 0.01rem;
  }
}
</style>
