<template>
  <div>
    <van-tabs
      line-width="1.4rem"
      @change="change"
      @rendered="change"
      v-model="active"
      title-active-color="#009966"
    >
      <van-tab
        v-for="(index, key) in itemTabcontent"
        :key="key"
        :title="index.type"
      >
        <div class="vansList">
          <div
            :class="{
              'vans-tableContent': true,
              activeTag: activeTag !== '' && activeTag == k
            }"
            v-for="(item, k) in index.tags"
            :key="k"
            @click="tocurrentTag(item, k)"
          >
            外用糖皮质激素{{ item }}
          </div>
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
      itemTabcontent: [
        // {
        //   _id: "5e69a5e431ee627724a44d22",
        //   createdAt: "2020-03-12T11:00:52.204+08:00",
        //   menu: "疾病知识",
        //   no: 0,
        //   tags: ["fdsf", "fsdfsd", "dfsfsdf"],
        //   type: "疾病知识", // ⽂章分类
        //   updatedAt: "2020-03-12T11:00:52.204+08:00"
        // },
        // {
        //   _id: "5e6f25433f31d473fc7ad7ab",
        //   createdAt: "2020-03-12T11:00:52.204+08:00",
        //   menu: "疾病知识",
        //   no: 0,
        //   tags: ["fsfsd"],
        //   type: "治疗指南", // ⽂章分类
        //   updatedAt: "2020-03-12T11:00:52.204+08:00"
        // }
      ]
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
        .dispatch("common/getMenuSelect", "疾病知识")
        .then(data => {
          if (this.$store.getters.menuList.selects.length != 0) {
            this.itemTabcontent = this.$store.getters.menuList.selects;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    tocurrentTag(item, k) {
      this.activeTag = k;
      this.$emit("tocurrentTag", item);
    }
  }
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
  margin-left: -0.1rem;
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
