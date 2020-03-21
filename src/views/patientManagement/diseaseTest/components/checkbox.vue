<template>
  <div>
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell
          class="cellvan"
          v-for="(item, key) in list"
          clickable
          :key="item"
          :title="`${item}`"
          @click="toggle(key,item)"
        >
          <template #right-icon>
            <van-checkbox slot="right-icon" :name="item" ref="checkboxes" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
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
      default: 0
    },
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      result: [],
      resultList: []
    };
  },
  methods: {
    toggle(key, item) {
      this.$refs.checkboxes[key].toggle();
      var cellvan = document.getElementsByClassName("cellvan");
      if (cellvan[key].classList.contains("checked")) {
        cellvan[key].classList.remove("checked");
        for (var i = 0; i < this.resultList.length; i++) {
          if (this.resultList[i] == item) {
            this.resultList.splice(i, 1);
          }
        }
      } else {
        cellvan[key].classList.add("checked");
        this.resultList.push(item);
      }
      this.$emit("nextToPagecheckbox", this.resultList, this.title, this.type);
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
@{aaa}.van-checkbox__icon--checked .van-icon {
  background: none;
  border-color: #1989fa;
}
@{aaa}.van-checkbox__icon .van-icon {
  border: 0;
}
</style>