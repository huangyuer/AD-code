<template>
  <div>
    <img
      class="imgstar"
      v-for="i in starfill"
      src="../assets/starfill.png"
      alt=""
    /><img
      class="imgstar"
      v-for="k in starban"
      src="../assets/starban.png"
      alt=""
    /><img
      class="imgstar"
      v-for="m in starnull"
      src="../assets/starnull.png"
      alt=""
    />
  </div>
</template>
<script>
export default {
  props: {
    scale: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      starfill: 0,
      starban: 0,
      starnull: 0
    };
  },
  mounted() {
    this.starfill = parseInt(this.scale / 2);
    if (this.scale % 2 == 0) {
      this.starban = 0;
      this.starnull = this.scale - this.starfill;
    } else {
      this.starban = this.scale % 2;
      this.starnull = this.scale - this.starfill - this.starban;
    }
  }
};
</script>
<style lang="less" scoped>
.imgstar {
  margin: 0 0.06rem;
}
</style>
