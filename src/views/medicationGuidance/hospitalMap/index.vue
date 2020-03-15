<template>
  <div>
     <!-- <svg-icon iconClass='xiala' className='icon'></svg-icon> -->
    <search-input :placeholder="'输入我的位置'" :recentSearch='recentSearch' @onChange="onChange" @recentClear="recentClear"></search-input>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
export default {
  name: "HospitalMap",
  components: {
    SearchInput
  },
  data () {
    return {
      search:'',
      recentSearch:{
        type:'最近输入位置',
        data:['上海市皮肤病医院','上海江城皮肤病医院']
      }
    };
  },
  methods:{
    onChange(val){
      this.search=val
      console.log("--3-",val)
    },
    recentClear(){
      this.$set(this.recentSearch,'data',[])
    }
  }
};
</script>

<style scoped lang="less"></style>
