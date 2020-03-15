<template>
    <div class="resultWapper">
        <div class="degtitle">中毒</div>
        <div>
            <img class="imgstar" v-for="i in starfill" src="../../../../assets/starfill.png" alt=""><img class="imgstar" v-for="k in starban" src="../../../../assets/starban.png" alt=""><img class="imgstar" v-for="m in starnull" src="../../../../assets/starnull.png" alt="">
        </div>
        <div class="time">2020-03-10</div>
        <div class="content">
            根据您的打分结果，发现您的疾病程度存在一定风险，建议您到附近医院就医。您的疾病程度较重，推荐您每周自测一次，以随时监测您的身体情况，如遇问题可及时就医。

        </div>
        <div class="groupnext">关闭</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            scale:5,
            starfill:0,
            starban:0,
            starnull:0,
        }
    },
    mounted(){
        this.starfill = parseInt(this.scale/2);
        if(this.scale%2==0){
            this.starban=0;
            this.starnull = this.scale - this.starfill
        }else{
            this.starban = this.scale%2;
            this.starnull = this.scale - this.starfill - this.starban;
        }
        
    }
}
</script>
<style lang="less" scoped>
.resultWapper{
    .degtitle{
        font-size:.44rem;
        font-family: 'PingFangSC-Medium'; 
        font-weight:500;
        color:rgba(0,157,117,1);
        line-height:.6rem;
        padding-top: 0.86rem;
    }
    .time{
        font-size:.32rem;
        font-family: 'PingFangSC-Regular'; 
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:.44rem;
        padding-bottom: .22rem;
    }
    .content{
        width: 6.06rem;
        margin: 0 auto;
        font-size:.28rem;
        font-family: 'PingFangSC-Regular';
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:.40rem;
        text-align: left;
    }
    .imgstar{
        margin: 0 0.06rem;
    }

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
    margin-top: 3.2rem;
}
</style>