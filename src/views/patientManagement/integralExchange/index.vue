<template>
    <div class="integralexchange">
        <div class="headerpageto">
            <div class="left">
                <van-image
                width=".48rem"
                height=".48rem"
                fit="cover"
                :src="require('@/assets/change.png')"
                />
            <span class="title">我的兑换</span></div>
            <div><img class="upchange" :src="require('@/assets/up.png')" alt=""></div>
        </div>
        <div class="integrallist">
            <div class="integralItem">
                <div>
                    <van-image
                        width=".48rem"
                        height=".48rem"
                        fit="cover"
                        :src="require('@/assets/change.png')"
                        />
                </div>
                <div>
                    <div></div>
                    <div class="btnchange">
                        立即兑换
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Image } from 'vant';
export default {
    
}
</script>
<style lang="less" scoped>
.integralexchange{
    .headerpageto{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.36rem;
        width:6.86rem;
        height:.8rem;
        background:rgba(249,249,249,1);
        border-radius:.5rem;
        margin: 0.28rem auto;
        box-sizing: border-box;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            .title{
                padding-left: 0.12rem;
                font-size:.28rem;
                font-family: 'PingFangSC-Regular';
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:.4rem;
            }
        }
        .upchange{
            width: 0.28rem;
            height: 0.28rem;
            transform: rotate(90deg);
        }
    }
    .btnchange{
        font-size:.24rem;
        font-family: 'PingFangSC-Medium'; 
        font-weight:500;
        color:rgba(139,87,42,1);
        line-height:.34REM;
        background:linear-gradient(270deg,rgba(246,188,88,1) 0%,rgba(255,247,207,1) 100%);
        border-radius:30px;
    }
}
</style>