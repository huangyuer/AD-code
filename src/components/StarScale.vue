<template>
  <div class="starTip">
    <span>
      <img class="imgstar" v-for="i in starfill" src="../assets/starfill.png" alt />
    </span>
    <span>
      <img class="imgstar" v-if="starban!=0" v-for="k in starban" src="../assets/starban.png" alt />
    </span>
    <span>
      <img
        class="imgstar"
        v-if="starnull!=0"
        v-for="m in starnull"
        src="../assets/starnull.png"
        alt
      />
    </span>
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
    // this.starfill = parseInt(this.scale / 2);
    if (parseInt(this.scale) == this.scale) {
      this.starfill = this.scale;
      this.starban = 0;
      this.starnull = 5 - this.starfill;
    } else {
      this.starfill = parseInt(this.scale);
      this.starban = 1;
      this.starnull = 4 - this.starfill;
    }
    // if (this.scale % 2 == 0) {
    //   this.starban = 0;
    //   this.starnull = this.scale - this.starfill;
    // } else {
    //   this.starban = this.scale % 2;
    //   this.starnull = this.scale - this.starfill - this.starban;
    // }
  }
};
</script>
<style lang="less" scoped>
.starTip {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  margin: 0.04rem 0;
  .imgstar {
    margin: 0 0.06rem;
  }
}
</style>
