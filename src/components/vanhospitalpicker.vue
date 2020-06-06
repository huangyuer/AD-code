<template>
  <div :class="{ areacomponent: true, tipe: !isFirstEnter }">
    <van-field
      :class="{ color3: !isFirstEnter, color9: isFirstEnter }"
      readonly
      clickable
      :value="value"
      :label="formlabel"
      :placeholder="formplaceholder"
      :input-align="forminputalign"
      @click="isFirstEnter ? (showSex = true) : (showSex = false)"
    />
    <img v-if="isFirstEnter" src="../assets/up.png" />
    <van-popup v-model="showSex" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showSex = false" @confirm="onConfirm" />
    </van-popup>
    <van-popup v-model="showaddress" position="bottom">
      <van-picker show-toolbar  :columns="address" @cancel="showaddress = false" @confirm="onConfirmaddreess" />
    </van-popup>
    <van-popup v-model="showhospital" position="bottom">
      <van-picker show-toolbar  :columns="hospitalList" @cancel="showhospital = false" @confirm="onConfirmhospital" />
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
    isFirstEnter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      columns: ['选择医院','无'],
      showSex: false,
      showaddress:false,
      showhospital:false,
      value: "",
      address:[],
      hospitalList:[],
    };
  },
  created() {
    this.$store.dispatch("patientManagement/getHospAddress").then(data => {
      for(let key in data.data.address){
        let obj={};
        obj['text']=key;
        obj['children']=[];
        for(let keyc in data.data.address[key]){
          let objchildren={};
          objchildren['text']=data.data.address[key][keyc];
          obj['children'].push(objchildren);
        }
        this.address.push(obj);
      }
    });
  },
  mounted() {
    this.value = this.formvalue;
  },
  methods: {
    onConfirm(val) {
      if(val=='无'){
        this.value = val;
        this.$emit("IsshowHospital", val);
      }else{
        this.showaddress=true;
      }
      this.showSex = false;
    },
    onConfirmaddreess(val){
      this.hospitalList=[];
      this.showaddress=false;
      var address={
        province:val[0],
        city:val[1],
      };
      this.$store.dispatch("patientManagement/getHospByAddress",address).then(data => {
        for(let key in data.data.hospitals){
          this.hospitalList.push(data.data.hospitals[key].name);
        }
        this.hospitalList.push('其他医院');
        this.showhospital=true;
      })
    },
    onConfirmhospital(val){
      this.value = val;
      this.$emit("IsshowHospital", val);
      this.showhospital=false;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
@import "./picker.less";
.areacomponent {
  &.tipe {
    @{aaa}.van-field__control {
      padding-right: 0;
    }
  }
}
.color9 @{aaa}.van-field__label{
  width: 2.2rem!important;
}
</style>
