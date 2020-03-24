<!-- props:name名字   $emit---sortway{"arc"为升序-----------“des”为降序} -->
<template>
  <div class="shaixuanitem" ref="shaixuanitem" @click="sort()">
    {{ name }}
    <img
      class="shaixuan"
      v-if="sortwayc === ''"
      src="../assets/shaixuan@2x.png"
    />
    <img
      class="shaixuan"
      v-else-if="sortwayc === 'des'"
      src="../assets/shaixuan-toptobottom@2x.png"
    />
    <img
      class="shaixuan"
      v-else-if="sortwayc === 'asc'"
      style="transform:rotate(180deg)"
      src="../assets/shaixuan-toptobottom@2x.png"
    />
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sortwayc: ""
    };
  },
  methods: {
    sort() {
      var classlist = this.$refs.shaixuanitem.classList;
      if (classlist.contains("asc")) {
        this.sortwayc = "asc";
        classlist.remove("asc");
        this.$emit("sortway", this.sortwayc, this.name);
      } else {
        this.sortwayc = "des";
        classlist.add("asc");
        this.$emit("sortway", this.sortwayc, this.name);
      }
    }
  },
  watch: {
    sortwayc(val, oldVal) {
      //普通的watch监听
      console.log("a: " + val, oldVal);
    }
  }
};
</script>
<style lang="less" scoped>
.shaixuanitem {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-right: 0.4rem;
  .shaixuan {
    width: 0.12rem;
    height: 0.24rem;
    margin-left: 0.12rem;
  }
}
</style>
