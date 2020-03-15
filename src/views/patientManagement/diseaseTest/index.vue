<template>
    <div class="TestWapper">
        <div class="vanimagebg">
            <van-image
            width="100%"
            height="100%"
            src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" />
        </div>
        <div class="TestWapper-List">
            <van-swipe class="my-swipe" 
            ref="myswiper"
            :loop="false" 
            :show-indicator="false" 
            :touchable="false" 
            indicator-color="white"
            >
                <van-swipe-item>
                    <div class="swipediv">1.您是否有使用以下几种药物?</div>
                    <check-box @nextToPagecheckbox="nextToPagecheckbox"></check-box>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="swipediv">2.您是否有使用以下几种药物?</div>
                    <radio-box @nextToPageradiobox="nextToPageradiobox"></radio-box>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="swipediv">2.您皮肤瘙痒的程度？</div>
                    <slider-box @nextToPageslider="nextToPageslider"></slider-box>
                </van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
                <div class="custom-indicator" slot="indicator">
                    {{ current + 1 }}<b>/4</b>
                </div>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import CheckBox from "./components/checkbox"
import RadioBox from "./components/radiobox"
import SliderBox from "./components/sliderbox"
export default {
    data(){
        return{
            current: 0
        }
    },
    methods:{
        nextToPagecheckbox(){
            this.$refs.myswiper.next();
            this.current = this.current+1;
        },
        nextToPageradiobox(){
            this.$refs.myswiper.next();
            this.current = this.current+1;
        },
        nextToPageslider(){
            this.$refs.myswiper.next();
            this.current = this.current+1;
        }
    },
    components:{CheckBox,RadioBox,SliderBox}
}
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.TestWapper{
    position: relative;
    .vanimagebg{
        width: 100%;
        height: 100%;
        position: fixed;
    }
    .TestWapper-List{
        position: relative;
        z-index: 1;
        top: 0.8rem;
        left:5%;
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    @{aaa}.my-swipe{
        position: relative;
        width: 100%;
        height: 10rem;
        .van-swipe-item {
            color: #fff;
            font-size: 20px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 0.2rem;
            box-shadow:0px 4px 2px 0px rgba(195,223,214,1);
        }
        .custom-indicator{
            position: absolute;
            top: .62rem;
            left: 0.4rem;
            width: 93%;
            font-size:.4rem;
            font-family: 'PingFangSC-Medium'; 
            font-weight:500;
            color:rgba(36,153,118,1);
            line-height:.56rem;
            >b{
                color: #999999;
                font-weight: 500;
            }
        }
    }
    .swipediv{
        font-size:.3rem;
        font-family: 'PingFangSC-Regular';
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:.42rem;
        text-align: left;
        padding-top: 1.58rem;
        width: 88%;
        margin: 0 auto;
    }
}
</style>