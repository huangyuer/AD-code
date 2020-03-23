<template>
  <div class="areacomponent">
    <van-field
      clickable
      :value="value"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="showdate = true"
    />
    <img src="../assets/up.png" />
    <van-popup v-model="showdate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        @cancel="showdate = false"
        @confirm="onConfirm"
        :type="formtype"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    formvalue: {
      type: String,
      default: ""
    },
    formlabel: {
      type: String,
      default: ""
    },
    formplaceholder: {
      type: String,
      default: ""
    },
    forminputalign: {
      type: String,
      default: ""
    },
    formshowArea: {
      type: Boolean,
      default: false
    },
    formtype: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      nowdate: new Date(),
      showdate: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      value: ""
    };
  },
  mounted() {
    var year = this.nowdate.getFullYear();
    var month = this.nowdate.getMonth();
    var date = this.nowdate.getDate();
    this.maxDate = new Date(year, month, date);
    this.value = this.formvalue;
  },
  methods: {
    onConfirm(value) {
      var d = new Date(value);
      if (this.formtype == "date") {
        var datetime =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1 < 10
            ? "0" + (d.getMonth() + 1)
            : d.getMonth() + 1) +
          "-" +
          (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
      } else {
        var datetime =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1);
      }

      this.showdate = false;
      this.value = datetime;
      this.$emit("IsshowTime", datetime);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./picker.less";
</style>