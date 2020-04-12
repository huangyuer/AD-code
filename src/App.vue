<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "",
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      console.log(
        "Fdsfsadfasfas",
        "to=>>>>>>>>>>>>>>>>>",
        to,
        "from=>>>>>>>>>>>>>>>>",
        from
      );
      if (from.path == "/productInfo" && to.path == "/editaddressInfo") {
        this.$store.commit("patientManagement/SET_PROTOEDITADDRESS", true);
      }
      if (
        from.path == "/editaddressInfo" &&
        to.path == "/productInfo" &&
        this.$store.getters.IssaveAddress
      ) {
        this.$store.commit("patientManagement/SET_ISSUBMITEXCHANGE", true);
      }
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    },
  },
};
</script>

<style lang="less">
@import "./common/quill.snow.css";
#app {
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular, PingFang SC;
  box-sizing: border-box;
  font-size: 0.24rem;
  height: 100%;
}
html,body{
  height: 100%;

}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>
