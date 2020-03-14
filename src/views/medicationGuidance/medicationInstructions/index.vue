<template>
    <div>
        <dropdown-menu 
        :option="option" 
        :value="value"  
        :option2="option2" 
        :value2="value2"
        @DropdownchangeValue="DropdownchangeValue"
        @DropdownchangeValue2="DropdownchangeValue2"
        ></dropdown-menu>
    </div>
</template>
<script>
import DropdownMenu from "@/components/DropdownMenu"
export default {
    data(){
        return {
            value:0,
            value2:0,
            option: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '默认排序', value: 0 },
                { text: '好评排序', value: 1 },
                { text: '销量排序', value: 2 },
            ],
        }
    },
    methods:{
        DropdownchangeValue(value){
            this.value=value;
        },
        DropdownchangeValue2(value){
            this.value2=value;
        }
    },
    components:{DropdownMenu}
}
</script>
<style scoped lang="less">

</style>