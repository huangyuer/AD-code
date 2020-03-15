<template>
<div>
    <van-checkbox-group v-model="result">
    <van-cell-group>
            <van-cell
            class="cellvan"
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="`复选框 ${item}`"
            @click="toggle(index)"
            >
                <van-checkbox slot="right-icon" :name="item" ref="checkboxes" />
            </van-cell>
        </van-cell-group>
    </van-checkbox-group>
    <div class="groupnext" @click="groupNextBtn()">
        下一题
    </div>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            list: ['a', 'b', 'c','d'],
            result: []
        }
    },
    methods:{
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
            var cellvan = document.getElementsByClassName('cellvan');
            if(cellvan[index].classList.contains('checked')){
                cellvan[index].classList.remove('checked');
            }else{
                cellvan[index].classList.add('checked');
            }
        },
        groupNextBtn(){
            this.$emit('nextToPagecheckbox');
        }
    }
}
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.value-class {
  flex: none !important;
}
.van-cell-group{
    background-color:transparent;
    &:after{
        border:0;
    }
}
@{aaa}.van-cell{
        height: .8rem;
        padding: 0 0.4rem 0 0.4rem;
        text-align: left;
        color:#333333;
        font-size: 0.28rem;
        display: flex;
        align-items: center;
        width: 88%;
        margin: 0.28rem auto;
        border-radius:.40rem;
        background:#F7F7F7;
        &:not(:last-child)::after{
            border-bottom: 0;
        }
        &.checked{
            background:linear-gradient(270deg,rgba(50,209,157,1) 0%,rgba(0,153,102,1) 100%);
            color:#ffffff;
        }
}
@{aaa}.van-checkbox__icon--checked .van-icon{
    background: none;
    border-color: #1989fa;
}
@{aaa}.van-checkbox__icon .van-icon{
    border:0;
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
    margin-top: 0.8rem;
}
</style>