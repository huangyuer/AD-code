<template>
  <div>
     <!-- <svg-icon iconClass='xiala' className='icon'></svg-icon> -->
    <search-input :result='result'></search-input>
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
      result: [
        {
          title: "ssss",
          value: "ss"
        }
      ]
    };
  },
};
</script>

<style scoped lang="less"></style>
