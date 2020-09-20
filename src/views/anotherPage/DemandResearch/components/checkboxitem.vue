<template>
  <div>
    <div class="selecthistoryinner">
      <div class="title" style="margin: 0 auto 0.28rem;">{{ dataitem.title }}</div>
      <van-checkbox-group
        @change="onChange"
        v-model="result"
        direction="horizontal"
        ref="checkboxGroup"
      >
        <div style="width: 100%;" v-for="(index, key) in dataitem.options" :key="key">
          <van-checkbox
            :name="index.Option"
            ref="checkboxes"
          >
            <div>{{ index.Option }}</div>
            <div class="exp">{{ index.remark }}</div>
          </van-checkbox>
        </div>
      </van-checkbox-group>
      </div>
  </div>
</template>
<script>
export default {
  name: "checkboxitem",
  props: {
    typethis: {
      type: String,
      default: ""
    },
    dataitem: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      result: [],
    };
  },
  methods: {
    onChange(name) {
        this.$emit("checkbox", this.result, this.dataitem);
    }
  },
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.selecthistoryinner {
  padding: 0 0.4rem 0rem 0.4rem;
  box-sizing: border-box;
  .title {
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: initial;
    text-align: left;
  }
  .exp {
    color: #666666;
    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
@{aaa}.van-icon {
  position: static;
}
@{aaa}.van-checkbox {
  margin-top: 0.12rem;
  margin-bottom: 0.12rem;
  width: 100%;
  border: 0.02rem solid #e5e5e5;
  height: .8rem;
  background: #FFFFFF;
  border-radius: .04rem;
  padding-left: 0.24rem;
  box-sizing: border-box;
}
@{aaa}.van-checkbox__icon {
  width: 0.36rem;
  height: 0.36rem;
}
@{aaa}.van-checkbox__icon .van-icon {
  background: RGBA(206, 206, 206, 1);
  color: #ffffff;
}
@{aaa}.van-checkbox__icon--round .van-icon {
  border-radius: 0;
  width: 0.36rem;
  height: 0.36rem;
  line-height: 0.36rem;
  font-size: 0.3rem;
}
@{aaa}.van-checkbox__icon--checked .van-icon {
  background-color: RGBA(4, 151, 101, 1);
  border-color: RGBA(4, 151, 101, 1);
}
@{aaa}.van-checkbox__label {
  font-size: 0.28rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: initial;
  text-align: left;
}
</style>
