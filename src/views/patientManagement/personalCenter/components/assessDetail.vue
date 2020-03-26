<template>
  <div>
    <!-- <div class="timeBtnList">
      <div
        :class="{ timeBtn: true, activeTime: currentTime == item }"
        v-for="(item, key) in timeBtn"
        :key="key"
        @click="thisTimeBtn(item)"
      >{{ item }}</div>
    </div>
    <div id="myChart" style="width：6.48rem;height:4.2rem;margin:0 auto"></div>
    <div class="assessList">
      <div class="headerassess">评估列表</div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="assessItem" v-for="(item,index) in answerLogs" :key="index">
          <div class="left">
            <div class="deg">{{item.level}}</div>
            <div class="time">{{item.date}}</div>
          </div>
          <div class="right" @click="toDetailassess(item)">
            <!-- <star-scale :scale="scale" /> -->
            评估详情
          </div>
        </div>
      </van-list>
    </div> -->
  </div>
</template>
<script>

</script>