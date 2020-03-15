<template>
    <div class="caringList">
        <div class="caringItem">
            <div class="header">
                <div class="left">fsddfsafsafasfsfsdfsfsdfsdfdsfsafsfsfsdfdsfsdfdsfsffds</div>
                <div class="right">
                    <span class="saveicon" @click="iconcolorchange()">
                        <svg-icon iconClass='heart' className='heart-icon'  /> 收藏
                    </span>
                </div>
            </div>
            <div class="center"  @click="pageInfo()">
                <van-image
                        width="100%"
                        height="2.6rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" />
            </div>
            <div class="bottom">
                2020-02-26
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
        },
    pageInfo(){
        this.$router.push({ path: '/itemInfo' })
        }
    }
}
</script>
<style lang="less" scoped>
.saveicon{
    display: flex;
    justify-content: center;
    align-items: center;
.heart-icon{
    width: .32rem!important;
    height: .28rem!important;
    fill:#9A979B!important;
    margin-right: 0.06rem;
    &.iconactive{
        fill:#FF765D!important;
    }
}
}

.caringList{
    width: 100%;
    .caringItem{
        width: 95%;
        border-radius: 0.08rem;
        border: 2px solid #f3f3f3;
        margin: 0 auto;
        box-sizing: border-box;
        margin-bottom: 0.3rem;
        .header{
            height: 0.7rem;
            padding: 0 0.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size:.3rem;
                font-family: 'PingFangSC-Regular';  
                font-weight:400;
                color:rgba(5,15,43,1);
                flex: 9;
            }
            .right{
                font-size: 0.24rem;
                color: #999999;
                font-family: 'PingFangSC-Regular';  
                display: flex;
                align-items: center;
            }
        }
        .center{
            overflow: hidden;
            line-height: 0;
        }
        .bottom{
            padding: 0 0.2rem;
            font-size: 0.3rem;
            color: #ACADAF;
            text-align: left;
            height: 0.7rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
}
</style>