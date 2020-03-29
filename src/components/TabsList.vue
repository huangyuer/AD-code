<template>
  <div>
    <van-tabs line-width="1.4rem" @change="change" v-model="active" title-active-color="#009966">
      <van-tab v-for="(index, key) in itemTabcontent" :key="key" :title="index.type">
        <div class="vansList">
          <div
            :class="{
              'vans-tableContent': true,
              activeTag: current[key] == item
            }"
            v-for="(item, k) in index.tags"
            :key="k"
            @click="tocurrentTag(item, k, key)"
          >{{ item }}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "",
      activeTag: "",
      itemTabcontent: [],
      current: []
    };
  },
  mounted() {
    this.getMenuSelect();
  },
  methods: {
    change(name, title) {
      this.$emit("change", name, title);
    },
    getMenuSelect() {
      this.$store
        .dispatch("common/getMenuSelect", this.$route.meta.title)
        .then(data => {
          if (
            this.$store.getters.menuList.selects != "null" &&
            this.$store.getters.menuList.selects.length != 0
          ) {
            this.$emit(
              "currentFuc",
              this.$store.getters.menuList.selects.length
            );
            this.itemTabcontent = this.$store.getters.menuList.selects;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    tocurrentTag(item, k, key) {
      this.activeTag = k;
      this.current.length = this.itemTabcontent.length;
      this.$set(this.current, key, item);
      this.$emit("tocurrentTag", item);
      this.$emit("currentFuc", this.itemTabcontent.length, item, key);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@{aaa}.van-tab {
  text-align: center;
  width: 1.4rem;
  float: left;
  flex: none;
}
@{aaa}.van-tabs__nav {
  // margin-left: -0.1rem;
}
@{aaa}.van-tabs__line {
  background-color: #009966;
}
@{aaa}.van-tab__text {
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  font-size: 0.3rem;
}
@{aaa}.van-tabs__wrap {
  &:after {
    content: "";
    border-top: 0;
  }
}
// .category-box {
@{aaa} .van-sticky {
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
}

@{aaa} .van-hairline--top-bottom {
  &::after {
    border-width: 0px;
    border-bottom: 0.06rem solid rgba(216, 216, 216, 1);
    margin: 0 0.32rem;
  }
}
@{aaa} .van-tab {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
@{aaa} .van-tab--active {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 153, 102, 1);
}
@{aaa} .van-tabs__line {
  height: 0.06rem;
  background: rgba(0, 153, 102, 1);
  border-radius: 0.03rem;
}
// }
.vansList {
  overflow: hidden;
  .vans-tableContent {
    width: 3.2rem;
    height: 0.56rem;
    line-height: 0.56rem;
    text-align: center;
    background: rgba(247, 247, 247, 1);
    border-radius: 0.28rem;
    font-size: 0.28rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: #666666;
    float: left;
    margin-top: 0.24rem;
    &.activeTag {
      color: rgba(0, 153, 102, 1);
    }
    &:nth-child(2n) {
      margin-left: 0.28rem;
    }
  }
}
</style>
