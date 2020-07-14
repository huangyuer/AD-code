<template>
   <div class="">
ddddd
   </div>
</template>

<script>
export default {
   name: 'templateHtml',
   data() {
       return {}
   },

  components: {},
  created(){
      this.$store
      .dispatch("common/getTempHtml", {id:this.$route.query.id})
      .then(data => {
      
      })
      .catch(e => {
        console.log("=====ss", e);
      });
  },
}
</script>

<style>
</style>
