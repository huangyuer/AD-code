<template>
    <div>
        <div class="instructionsItem">
            <div class="top">
                <div class="left">
                    <div class="title">fhsadfa</div>
                    <div class="content">sdfdksfasfsahungjkkie</div>
                </div>
                <div class="right">
                    <van-image
                        width="2rem"
                        height="2rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" />
                </div>
            </div>
            <div class="bottom">
                <span class="time">2020-02-26</span>
                <span class="saveicon" @click="iconcolorchange()">
                     <svg-icon iconClass='heart' className='heart-icon'  /> 收藏
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    methods:{
        iconcolorchange(){
            var hearticon = document.getElementsByClassName("heart-icon")[0];
            if(!hearticon.classList.contains('iconactive')){
                hearticon.classList.add("iconactive");
                Toast({
                    message: '收藏成功',
                    icon: 'like-o'
                });
            }else{
                hearticon.classList.remove("iconactive");
                Toast({
                    message: '取消收藏',
                    icon: 'like-o'
                });
            }
        }
    }
}
</script>
<style lang="less">
.heart-icon{
    width: 15px!important;
    height: 15px!important;
    fill:#9A979B!important;
    &.iconactive{
        fill:#FF765D!important;
    }
}
.instructionsItem{
    padding: 0.24rem 0;
    margin: 0 0.32rem;
    .top{
        display: flex;
        .left{
            flex: 2;
            .title{
                color: #050F2B;
                font-size: .3rem;
                text-align: left;
                font-family: 'PingFangSC-Regular';  
            }
            .content{
                color: #666666;
                font-size: .28rem;
                text-align: left;
                font-family: 'PingFangSC-Regular';  
            }
        }
        .right{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .bottom{
        font-size: .3rem;
        text-align: left;
        color: #999999;
        font-family: 'PingFangSC-Regular';  
        .time{
            font-size: .3rem;
            color: #ACADAF;
            padding-right: 0.28rem;
        }
    }
    &:not(:last-child){
        border-bottom: 2px solid #E5E5E5;
    }
}
</style>