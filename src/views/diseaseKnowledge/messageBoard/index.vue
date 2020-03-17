<template>
    <div>
        <message-tip class="message-tip-box"></message-tip>
        <message-info></message-info>
    </div>
</template>
<script>
import MessageTip from './components/messageTip'
import MessageInfo from './components/messageInfo'
export default {
   name:'MessageBoard',
   components:{MessageTip,MessageInfo},
   data() {
      return {
      }
   },
}
</script>
<style lang='less' scoped>
.message-tip-box{
    margin-top: 0.4rem !important;
    margin-bottom: 0.32rem !important;
}

</style>
