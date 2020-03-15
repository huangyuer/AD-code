<template>
    <div>
        <div class="dropdownwapper">
            <dropdown-menu 
            :option="option" 
            :value="value"  
            @DropdownchangeValue="DropdownchangeValue"
            ></dropdown-menu>
            <dropdown-menu 
            :option="option2" 
            :value="value2"
            @DropdownchangeValue="DropdownchangeValue2"
            ></dropdown-menu>
        </div>
        <instructions-item></instructions-item>
    </div>
</template>
<script>
import DropdownMenu from "@/components/DropdownMenu"
import InstructionsItem from "./components/instructionsitem"
export default {
    data(){
        return {
            value:'0',
            value2:'0',
            option: [
                { text: '全部商品', value: '0' },
                { text: '新款商品', value: '1' },
                { text: '活动商品', value: '2' }
            ],
            option2: [
                { text: '默认排序', value: '0' },
                { text: '好评排序', value: '1' },
                { text: '销量排序', value: '2' },
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
    components:{DropdownMenu,InstructionsItem}
}
</script>
<style scoped lang="less">
.dropdownwapper{
    overflow: hidden;
}
</style>