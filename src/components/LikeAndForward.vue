<!-- 
props: like:false|true,forward:false|true
event:likeBtn,forwardBtn 
-->

<template>
  <div class="like-forward">
    <svg-icon iconClass="like-btn" className="like-icon" v-if="like" @likeBtn="likeBtn"></svg-icon>
    <svg-icon iconClass="forward-btn" className="forward-icon" v-if="forward" @forwardBtn="forwardBtn"></svg-icon>
  </div>
</template>
<script>
export default {
  name: "LikeAndForward",
  props:{
      like:{
          type: Boolean,
          default:false,
      },
      forward:{
          type: Boolean,
          default:false,
      }
  },
  data() {
    return {};
  },
  methods:{
      likeBtn(){
        this.$emit("likeBtn")
      },
      forwardBtn(){
        this.$emit("forwardBtn")
      }
  }
};
</script>
<style lang="less" scoped>
.like-forward {
  .like-icon {
    position: fixed;
    top: 7.5rem;
    right: 0.08rem;
    width: 1.36rem !important;
    height: 1.36rem !important;
    opacity: 0.9;
  }
  .forward-icon {
    position: fixed;
    top: 8.78rem;
    right: 0.32rem;
    width: 0.88rem !important;
    height: 0.88rem !important;
  }
}
</style>
