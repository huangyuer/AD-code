<template>
<div class="sliderbox">
    <div class="header"><span>无瘙痒问题</span><span>瘙痒难忍</span></div>
    <van-slider
        v-model="value"
        bar-height="4px"
        active-color="linear-gradient(90deg,rgba(0,153,102,1) 0%,rgba(242,169,0,1) 100%)"
        @change="onChange"
    />
    <div class="groupnext" @click="groupNextBtn()">下一题</div>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            value:50,
        }
    },
    methods:{
        onChange(value) {
            // Toast('当前值：' + value);
        },
        groupNextBtn(){
            this.$emit('nextToPageslider');
        }
    }
}
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.sliderbox{
    margin-top: .62rem;
    .header{
        display: flex;
        justify-content: space-between;
        color: #333333;
        font-size: 0.28rem;
        width: 6rem;
        margin: 0.12rem auto;
    }
}
.van-slider{
    position: relative;
    // width: 82%;
    background-color: #ebedf0;
    border-radius: 999px;
    cursor: pointer;
    margin: 0 auto;
    width:6rem;
    height:.12rem;
    background:linear-gradient(90deg,rgba(0,153,102,1) 0%,rgba(242,169,0,1) 100%);
    box-shadow:0px 4px 8px 0px rgba(103,103,103,0.5);
    border-radius:.4rem;
}
@{aaa}.van-slider__button{
    width: .28rem;
    height: .28rem;
    background:linear-gradient(180deg,rgba(0,201,159,1) 0%,rgba(0,153,102,1) 100%);
    box-shadow:0px 4px 8px 0px rgba(58,170,133,1);
}
.groupnext{
    width:6rem;
    height:.8rem;
    background:rgba(242,169,0,1);
    border-radius:.4rem;
    margin: 0 auto;
    font-size:.3rem;
    font-family: 'PingFangSC-Medium'; 
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.8rem;
    margin-top: 3.86rem;
}
</style>