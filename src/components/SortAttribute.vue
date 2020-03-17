 <!-- props:name名字   $emit---sortway{"arc"为升序-----------“des”为降序} -->
<template>
  <div class="shaixuanitem" ref="shaixuanitem" @click="sort()">
    {{name}}
    <img class="shaixuan" src="../assets/shaixuan@2x.png" />
  </div>
</template>
<script>
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
        this.$emit("sortway", this.sortwayc);
      } else {
        this.sortwayc = "des";
        classlist.add("asc");
        this.$emit("sortway", this.sortwayc);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.shaixuanitem {
  display: flex;
  justify-content: center;
  align-items: center;
  .shaixuan {
    width: 0.12rem;
    height: 0.24rem;
    margin-left: 0.12rem;
  }
}
</style>