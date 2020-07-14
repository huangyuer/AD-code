<template>
  <div class>
    <img @click="jump(item.link)" v-for="(item,index) in htmlImg" :key="index" :src="item.url" alt />
  </div>
</template>

<script>
export default {
  name: "templateHtml",
  data() {
    return {
      htmlImg: []
    };
  },

  components: {},
  created() {
    this.$store
      .dispatch("common/getTempHtml", { id: this.$route.query.id })
      .then(data => {
        this.htmlImg = data.html.images;
        window.document.title = data.html.name;
      })
      .catch(e => {});
  },
  methods: {
    jump(link) {
      if (link) {
        window.open(link, "_blank");
      }
    }
  }
};
</script>

<style lang="less" scoped>
img {
  max-width: 100%;
  margin-bottom: 0.2rem;
}
</style>
