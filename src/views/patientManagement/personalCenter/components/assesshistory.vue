<template>
  <div>
    <div class="timeBtnList">
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
      <div class="assessItem">
        <div class="left">
          <div class="deg">fsdfdsf</div>
          <div class="time">fsdfsfasf</div>
        </div>
        <div class="right">
          <star-scale :scale="scale" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import StarScale from "@/components/StarScale";
export default {
  name: "hello",
  components: { StarScale },
  data() {
    return {
      timeBtn: ["近一个月", "近三个月", "近半年"],
      currentTime: "近一个月",
      scale: 5
    };
  },
  mounted() {
    this.drawLine();
  },

  methods: {
    thisTimeBtn(item) {
      this.currentTime = item;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      let dataAll = [
        ["03.10", 8.04],
        ["04.10", 6.95],
        ["05.10", 7.58],
        ["06.10", 8.81],
        ["07.10", 8.33],
        ["08.10", 9.96]
      ];
      myChart.clear();
      console.log("fsdsdf");
      myChart.setOption({
        grid: [{ x: "7%", y: "7%", width: "80%", height: "80%", left: "10%" }],
        xAxis: [
          {
            gridIndex: 0,
            category: "time",
            splitLine: {
              show: true
            },
            min: "03.10",
            max: "08.10",
            axisLine: {
              symbol: [
                "none",
                "path://M58.022829 1024h906.490238c42.196084 0 73.499208-49.696773 48.848705-98.752783-19.712865-39.3315-418.229342-825.452649-452.302822-892.46885-22.370144-44.061833-75.798415-43.345687-98.168558 0C437.825277 81.042847 37.235745 870.141657 9.437967 927.263734c-20.391319 41.838011 2.129592 96.736266 48.584862 96.736266z"
              ],
              symbolOffset: [0, 7],
              symbolSize: [10, 15],
              lineStyle: {
                color: "#e5e5e5"
              }
            },
            axisLabel: {
              color: "#666666",
              showMinLabel: true
            },
            data: ["03.10", "04.10", "05.10", "06.10", "07.10", "08.10"],
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            max: 15,
            splitNumber: 4,
            axisLine: {
              show: false,
              symbol: [
                "none",
                "path://M58.022829 1024h906.490238c42.196084 0 73.499208-49.696773 48.848705-98.752783-19.712865-39.3315-418.229342-825.452649-452.302822-892.46885-22.370144-44.061833-75.798415-43.345687-98.168558 0C437.825277 81.042847 37.235745 870.141657 9.437967 927.263734c-20.391319 41.838011 2.129592 96.736266 48.584862 96.736266z"
              ],
              symbolOffset: [0, 7],
              symbolSize: [10, 15],
              lineStyle: {
                color: "#e5e5e5"
              }
            },
            axisLabel: {
              show: false,
              color: "#999999",
              showMinLabel: false
            },
            axisTick: { show: false }
          },
          {
            // gridIndex: 0,
            // min: "无",
            // max: "重",
            position: "left",
            axisLine: {
              symbol: [
                "none",
                "path://M58.022829 1024h906.490238c42.196084 0 73.499208-49.696773 48.848705-98.752783-19.712865-39.3315-418.229342-825.452649-452.302822-892.46885-22.370144-44.061833-75.798415-43.345687-98.168558 0C437.825277 81.042847 37.235745 870.141657 9.437967 927.263734c-20.391319 41.838011 2.129592 96.736266 48.584862 96.736266z"
              ],
              symbolOffset: [0, 7],
              symbolSize: [10, 15],
              lineStyle: {
                color: "#e5e5e5"
              }
            },
            axisLabel: {
              color: "#999999",
              showMinLabel: true
            },
            data: ["无", "轻", "中", "重"],
            axisTick: { show: false }
          }
        ],
        series: [
          {
            name: "I",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: dataAll,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "#009966",
                lineStyle: {
                  color: "#009966"
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.timeBtnList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.32rem 0.3rem;
  .timeBtn {
    width: 2rem;
    height: 0.56rem;
    background: rgba(247, 247, 247, 1);
    border-radius: 0.28rem;
    font-size: 0.28rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(0, 153, 102, 1);
    line-height: 0.56rem;
    text-align: center;
    &.activeTime {
      background: rgba(0, 153, 102, 1);
      color: #ffffff;
    }
  }
}
.assessList {
  padding: 0 0.32rem;
  .headerassess {
    font-size: 0.3rem;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: initial;
    padding-top: 0.4rem;
    padding-bottom: 0.16rem;
    border-bottom: 0.02rem solid rgba(229, 229, 229, 1);
  }
  .assessItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
    border-bottom: 0.02rem solid rgba(229, 229, 229, 1);
    .left {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      .deg {
        font-size: 0.3rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(5, 15, 43, 1);
        line-height: initial;
      }
      .time {
        font-size: 0.3rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: rgba(172, 173, 175, 1);
        line-height: initial;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
