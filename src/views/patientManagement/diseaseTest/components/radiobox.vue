<template>
  <div>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell
          :class="{cellvans:true,checked:radio==item.option}"
          :title="item.option"
          v-for="item in list"
          :key="item.option"
          clickable
          @click="toggle(item.option)"
        >
          <van-radio ref="radios" slot="right-icon" :name="item.option" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      //   list: [1, 2, 3, 4],
      radio: ""
    };
  },
  methods: {
    toggle(item) {
      this.radio = item;
      this.$emit("nextToPageradiobox", item, this.title, this.type);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.value-class {
  flex: none !important;
}
.van-cell-group {
  background-color: transparent;
  &:after {
    border: 0;
  }
}
@{aaa}.van-cell {
  height: 0.8rem;
  padding: 0 0.4rem 0 0.4rem;
  text-align: left;
  color: #333333;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  width: 88%;
  margin: 0.28rem auto;
  border-radius: 0.4rem;
  background: #f7f7f7;
  &:not(:last-child)::after {
    border-bottom: 0;
  }
  &.checked {
    background: linear-gradient(
      270deg,
      rgba(50, 209, 157, 1) 0%,
      rgba(0, 153, 102, 1) 100%
    );
    color: #ffffff;
  }
}
@{aaa}.van-radio__icon--checked .van-icon {
  background: none;
  border-color: #1989fa;
}
@{aaa}.van-radio__icon .van-icon {
  border: 0;
}
</style>