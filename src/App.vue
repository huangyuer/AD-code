<template>
  <div id="app"> 
    <transition :name="transitionName">  
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
        //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
        if( to.meta.index < from.meta.index){
          this.transitionName = 'slide-right';
        }else{
          this.transitionName = 'slide-left';
        }
    }
  }
}
</script>

<style lang="less">
@import "./common/font/font.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.icon {
  width: 14px!important;
  height: 8px!important;
  color: red!important;
  fill: red!important;
}
 .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all .3s;
        position: absolute;
        width:100%;
        left:0;
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
