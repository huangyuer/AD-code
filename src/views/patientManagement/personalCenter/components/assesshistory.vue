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
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="assessItem" v-for="(item,index) in answerLogs" :key="index">
          <div class="left">
            <div class="deg">{{item.level}}</div>
            <div class="time">{{item.date}}</div>
          </div>
          <div class="right">
            <star-scale :scale="scale" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import StarScale from "@/components/StarScale";
import { getLastYear, getLastMonth, getLast3Month } from "./timetemp";
export default {
  name: "hello",
  components: { StarScale },
  data() {
    return {
      timeBtn: ["近一个月", "近三个月", "近半年"],
      currentTime: "近一个月",
      scale: 5,
      getAnswerLogChart: {
        //获得评估历史
        page: Number,
        limit: Number,
        startDate: getLastMonth().last,
        endDate: getLastMonth().now,
        isChart: true
      },
      answerLogsChart: [], //获得评估历史图表
      getAnswerLog: {
        //获得评估历史
        page: 1,
        limit: 10,
        startDate: getLastMonth().now,
        endDate: getLastMonth().now,
        isChart: false
      },
      answerLogs: [],
      total: 0,
      loading: false,
      finished: false
    };
  },
  mounted() {
    // this.drawLine();
    this.getAnswerLogsChart();
  },

  methods: {
    thisTimeBtn(item) {
      this.currentTime = item;
      if (this.currentTime == "近一个月") {
        this.$set(this.getAnswerLogChart, "startDate", getLastMonth().last);
        this.$set(this.getAnswerLogChart, "endDate", getLastMonth().now);
        this.$set(this.getAnswerLog, "startDate", getLastMonth().last);
        this.$set(this.getAnswerLog, "endDate", getLastMonth().now);
        this.getAnswerLogsChart();
        this.answerLogs = [];
        this.$set(this.getAnswerLog, "page", 1);
        this.finished = false;
      } else if (this.currentTime == "近三个月") {
        this.$set(this.getAnswerLogChart, "startDate", getLast3Month().last);
        this.$set(this.getAnswerLogChart, "endDate", getLast3Month().now);
        this.$set(this.getAnswerLog, "startDate", getLast3Month().last);
        this.$set(this.getAnswerLog, "endDate", getLast3Month().now);
        this.getAnswerLogsChart();
        this.answerLogs = [];
        this.$set(this.getAnswerLog, "page", 1);
        this.finished = false;
      } else {
        this.$set(this.getAnswerLogChart, "startDate", getLastYear().last);
        this.$set(this.getAnswerLogChart, "endDate", getLastYear().now);
        this.$set(this.getAnswerLog, "startDate", getLastYear().last);
        this.$set(this.getAnswerLog, "endDate", getLastYear().now);
        this.getAnswerLogsChart();
        this.answerLogs = [];
        this.$set(this.getAnswerLog, "page", 1);
        this.finished = false;
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // let dataAll = [
      //   ["03.10", 8.04],
      //   ["04.10", 6.95],
      //   ["05.10", 7.58],
      //   ["06.10", 8.81],
      //   ["07.10", 8.33],
      //   ["08.10", 9.96],
      //   ["09.10", 10],
      //   ["10.10", 10]
      // ];
      var dataAll = [];
      var dataX = [];
      var dataY = [];
      for (var i = 0; i < this.answerLogsChart.length; i++) {
        var arr = [];
        arr.push(this.answerLogsChart[i].date);
        arr.push(this.answerLogsChart[i].level);
        dataX.push(this.answerLogsChart[i].date);
        dataY.push(this.answerLogsChart[i].level);
        dataAll.push(arr);
      }
      console.log("dataX", dataX);
      console.log("dataAll", dataAll);
      myChart.clear();
      myChart.setOption({
        grid: { x: "0%", y: "7%", width: "80%", height: "80%", left: "10%" },
        // grid: {
        //   right: "4%", //距离右侧边距
        //   bottom: "9%",
        //   show: true,
        //   containLabel: true
        // },
        xAxis: {
          // gridIndex: 0,
          // category: "time",
          // type: "category",
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: true
          },
          axisLine: {
            symbol: [
              "none",
              "path://M58.022829 1024h906.490238c42.196084 0 73.499208-49.696773 48.848705-98.752783-19.712865-39.3315-418.229342-825.452649-452.302822-892.46885-22.370144-44.061833-75.798415-43.345687-98.168558 0C437.825277 81.042847 37.235745 870.141657 9.437967 927.263734c-20.391319 41.838011 2.129592 96.736266 48.584862 96.736266z"
            ],
            // symbolOffset: [0, 7],
            // symbolSize: [10, 15],
            lineStyle: {
              color: "#e5e5e5"
            },
            onZero: true
          },
          axisLabel: {
            color: "#666666",
            showMinLabel: true,
            align: "left",
            fontSize: 8
          },
          data: dataX,
          // data: [
          //   "03.10",
          //   "04.10",
          //   "05.10",
          //   "06.10",
          //   "07.10",
          //   "08.10",
          //   "09.10",
          //   "10.10"
          // ],
          axisTick: { show: true, length: 0 }
        },
        yAxis: {
          type: "category",
          boundaryGap: false,
          show: true,
          min: "",
          max: "重",
          position: "left",
          splitLine: {
            show: true
          },
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
          axisTick: {
            show: false,
            alignWidthLabel: true
          },
          axisLabel: {
            color: "#999999",
            showMinLabel: true
          },
          data: ["", "无", "轻", "中", "重"]
        },
        // yAxis: [
        //   // {
        //   //   gridIndex: 0,
        //   //   min: 0,
        //   //   max: 15,
        //   //   splitNumber: 4,
        //   //   axisLine: {
        //   //     show: false,
        //   //     symbol: [
        //   //       "none",
        //   //       "path://M58.022829 1024h906.490238c42.196084 0 73.499208-49.696773 48.848705-98.752783-19.712865-39.3315-418.229342-825.452649-452.302822-892.46885-22.370144-44.061833-75.798415-43.345687-98.168558 0C437.825277 81.042847 37.235745 870.141657 9.437967 927.263734c-20.391319 41.838011 2.129592 96.736266 48.584862 96.736266z"
        //   //     ],
        //   //     symbolOffset: [0, 7],
        //   //     symbolSize: [10, 15],
        //   //     lineStyle: {
        //   //       color: "#e5e5e5"
        //   //     }
        //   //   },
        //   //   axisLabel: {
        //   //     show: false,
        //   //     color: "#999999",
        //   //     showMinLabel: false
        //   //   },
        //   //   axisTick: { show: false }
        //   // },
        //   {

        //     min: "无",
        //     max: "重",
        //     position: "left",
        //     axisLine: {
        //       symbol: [
        //         "none",
        //         "path://M58.022829 1024h906.490238c42.196084 0 73.499208-49.696773 48.848705-98.752783-19.712865-39.3315-418.229342-825.452649-452.302822-892.46885-22.370144-44.061833-75.798415-43.345687-98.168558 0C437.825277 81.042847 37.235745 870.141657 9.437967 927.263734c-20.391319 41.838011 2.129592 96.736266 48.584862 96.736266z"
        //       ],
        //       symbolOffset: [0, 7],
        //       symbolSize: [10, 15],
        //       lineStyle: {
        //         color: "#e5e5e5"
        //       }
        //     },
        //     axisLabel: {
        //       color: "#999999",
        //       showMinLabel: true
        //     },
        //     data: ["无", "轻", "中", "重"],
        //     axisTick: { show: false }
        //   }
        // ],
        series: [
          {
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: dataY,
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
    },
    getAnswerLogsChart() {
      this.$store
        .dispatch("patientManagement/getAnswerLogs", this.getAnswerLogChart)
        .then(response => {
          this.answerLogsChart = response.data.answerLogs;
          this.drawLine();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAnswerLogs() {
      this.$store
        .dispatch("patientManagement/getAnswerLogs", this.getAnswerLog)
        .then(response => {
          if (this.answerLogs.length != 0) {
            this.answerLogs = this.answerLogs.concat(response.data.answerLogs);
          } else {
            this.answerLogs = response.data.answerLogs;
          }
          this.total = response.data.total;
          this.loading = false;
          if (this.answerLogs.length >= this.total) {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            return;
          } else {
            this.getAnswerLog.page = this.getAnswerLog.page + 1;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    onLoad() {
      this.getAnswerLogs();
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
