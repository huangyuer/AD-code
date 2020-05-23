<template>
  <div>
    <van-tabs line-width="1.4rem" @change="change" v-model="active" title-active-color="#009966">
      <van-tab
        v-for="(index, key) in itemTabcontent"
        :key="key"
        :title="index.type"
        :name="index.type"
      >
        <div ref="vansList" class="vansList" v-if="index.tags.length != 0">
          <div
            ref="tablecontent"
            v-for="(item, k) in index.tags"
            :key="k"
            :class="{
              'vans-tableContent': true,
              activeTag: current[key] == item
            }"
            @click="tocurrentTag(item, k, key,index.tags)"
          >{{ item }}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  props: {
    itemTabcontent: {
      type: Array,
      default: []
    },
    activeTabName: {
      type: String,
      default: ""
    },
    activeTabChild: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      active: "",
      activeTag: "",
      current: [],
      indexParent:0,
    };
  },
  methods: {
    change(name, title) {
      this.current = [];
      this.$emit("change", name, title);
    },
    tocurrentTag(item, k, key,t) {
      this.current = [];
      if (
        this.$refs.vansList[key].children[k].classList.contains("activeTag")
      ) {
        this.current[key] = "";
        this.$emit("tocurrentTag", "");
        this.$emit("currentFuc", this.itemTabcontent.length, "", key);
      } else {
        this.current[key] = item;
        // this.$set(this.current, key, item);
        this.$emit("tocurrentTag", item,key);
        this.$emit("currentFuc", this.itemTabcontent.length, item, key);
      }
    }
  },
  watch: {
    // activeTabName(val) {
    //   console.log("val", val);
    //   this.active = val;
    //   this.indexParent = this.itemTabcontent.indexOf(val);
    //   if(localStorage.getItem("tabChild")){
    //     console.log("fssssssssssssssssssssssssssssssssssss");
    //     this.$set(this.current,this.indexParent,localStorage.getItem("tabChild"))
    //     // this.current[this.indexParent] = localStorage.getItem("tabChild");
    //     console.log("this.current[this.indexParent]",this.current[this.indexParent]);
    //   }
    // },
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@{aaa}.van-tab {
  text-align: center;
}
@{aaa}.van-tabs__line {
  background-color: #009966;
}
@{aaa}.van-tab__text {
  // font-family: "PingFangSC-Medium";
  font-weight: normal;
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
    border-bottom: 0.12rem solid rgba(216, 216, 216, 0.34);
    margin: 0 0.32rem;
    border-radius: 0.03rem;
  }
}
@{aaa} .van-tab {
  font-size: 0.3rem;
  // font-family: PingFangSC-Medium, PingFang SC;
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
    // font-family: "PingFangSC-Medium";
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
