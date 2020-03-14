<template>
  <mt-search v-model="value">
    <mt-cell v-for="item in result" :key="item.id" :title="item.title" :value="item.value"></mt-cell>
  </mt-search>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    result: {
      type: Array,
      default: function () {
        return {}
      }
    }
  },
  data(){
    return {
      value:"ddd"
    }
  }
}
</script>

<style scoped lang="less"></style>
