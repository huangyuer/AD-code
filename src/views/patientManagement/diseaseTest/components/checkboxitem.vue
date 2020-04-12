<template>
  <div>
    <div class="selecthistoryinner" v-if="medications.options.length != 0">
      <div class="title">{{ index + "." + medications.title }}</div>
      <van-checkbox-group
        @change="onChange"
        v-model="result"
        direction="horizontal"
        ref="checkboxGroup"
      >
        <div style="width: 100%;" v-for="(index, key) in medications.options" :key="key">
          <van-checkbox
            v-if="key < medications.options.length - 1"
            :name="index.option"
            ref="checkboxes"
          >
            <div>{{ index.option }}</div>
            <div class="exp">{{ index.remark }}</div>
          </van-checkbox>
        </div>
      </van-checkbox-group>
      <van-checkbox
        :name="medications.options[medications.options.length - 1].option"
        ref="checkboxes"
        @click="checkAll"
        v-model="checked"
      >
        <div>{{ medications.options[medications.options.length - 1].option }}</div>
        <div class="exp">{{ medications.options[medications.options.length - 1].remark }}</div>
      </van-checkbox>
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
    medications: {
      type: Object,
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      result: [],
      checked: false
    };
  },
  methods: {
    onChange(name) {
      this.checked = false;
      this.$emit("checkbox", this.result, this.medications._id, this.checked);
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(false);
    }
  },
  watch: {
    checked: function(val) {
      this.$emit("checkbox", this.result, this.medications._id, this.checked);
    }
  }
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
@{aaa}.van-checkbox {
  margin-top: 0.12rem;
  margin-bottom: 0.12rem;
  width: 100%;
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
