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
    <div id="myChart" style="width：6.48rem;height:3.5rem;margin:0 auto"></div>
    <div class="assessList">
      <div class="headerassess">评估列表</div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="assessItem" v-for="(item,index) in answerLogs" :key="index">
          <div class="left">
            <div class="deg">{{item.score}}分</div>
            <div class="time">{{item.date}}</div>
          </div>
          <div class="right" @click="toDetailassess(item)">
            <!-- <star-scale :scale="scale" /> -->
            评估详情
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
import { Toast } from "vant";
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
        startDate: getLastMonth().last,
        endDate: getLastMonth().now,
        isChart: false
      },
      answerLogs: [],
      total: 0,
      loading: false,
      finished: false,
      //
      interval: 5,
      innerinterval: 2,
      xall: []
    };
  },
  created() {
    this.getAnswerLogsChart();
    for (var i = 0; i < 30; i++) {
      var day = this.getPassFormatDate(i);
      this.xall.push(day);
    }
  },
  methods: {
    toDetailassess(item) {
      this.$router.push({
        path: "/assesshistory/assessDetail",
        query: {
          id: item._id,
          date: item.date
        }
      });
    },
    thisTimeBtn(item) {
      this.currentTime = item;
      if (this.currentTime == "近一个月") {
        this.xall = [];
        this.interval = 5;
        this.innerinterval = 2;
        for (var i = 0; i < 30; i++) {
          var day = this.getPassFormatDate(i);
          this.xall.push(day);
        }
        this.$set(this.getAnswerLogChart, "startDate", getLastMonth().last);
        this.$set(this.getAnswerLogChart, "endDate", getLastMonth().now);
        this.$set(this.getAnswerLog, "startDate", getLastMonth().last);
        this.$set(this.getAnswerLog, "endDate", getLastMonth().now);
        this.getAnswerLogsChart();
        this.answerLogs = [];
        this.$set(this.getAnswerLog, "page", 1);
        this.getAnswerLogs();
        // this.finished = false;
      } else if (this.currentTime == "近三个月") {
        this.xall = [];
        this.interval = 17;
        this.innerinterval = 8;
        for (var i = 0; i < 90; i++) {
          var day = this.getPassFormatDate(i);
          this.xall.push(day);
        }
        this.$set(this.getAnswerLogChart, "startDate", getLast3Month().last);
        this.$set(this.getAnswerLogChart, "endDate", getLast3Month().now);
        this.$set(this.getAnswerLog, "startDate", getLast3Month().last);
        this.$set(this.getAnswerLog, "endDate", getLast3Month().now);
        this.getAnswerLogsChart();
        this.answerLogs = [];
        this.$set(this.getAnswerLog, "page", 1);
        this.getAnswerLogs();
        // this.finished = false;
      } else {
        this.xall = [];
        this.interval = 35;
        this.innerinterval = 17;
        for (var i = 0; i < 180; i++) {
          var day = this.getPassFormatDate(i);
          this.xall.push(day);
        }
        this.$set(this.getAnswerLogChart, "startDate", getLastYear().last);
        this.$set(this.getAnswerLogChart, "endDate", getLastYear().now);
        this.$set(this.getAnswerLog, "startDate", getLastYear().last);
        this.$set(this.getAnswerLog, "endDate", getLastYear().now);
        this.getAnswerLogsChart();
        this.answerLogs = [];
        this.$set(this.getAnswerLog, "page", 1);
        this.getAnswerLogs();
        // this.finished = false;
      }
    },
    getPassFormatDate(i) {
      var nowDate = new Date();
      var date = new Date(nowDate);
      date.setDate(date.getDate() - i);
      var seperator1 = ".";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = month + seperator1 + strDate;
      return currentdate;
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
      var _this = this;
      var dataAll = [];
      var dataX = [];
      var dataY = [];
      for (var i = 0; i < this.answerLogsChart.length; i++) {
        var arr = [];
        arr.push(this.answerLogsChart[i].date);
        arr.push(this.answerLogsChart[i].score);
        dataX.push(this.answerLogsChart[i].date);
        dataY.push(this.answerLogsChart[i].score);
        dataAll.push(arr);
      }
      console.log("dataX", dataX, "dataY", dataY);
      console.log("dataAll", dataAll);
      myChart.clear();
      myChart.setOption({
        grid: {
          x: "0%",
          y: "7%",
          width: "84%",
          height: "70%",
          left: "5%",
          top: "16%",
          containLabel: true
        },
        // grid: {
        //   right: "4%", //距离右侧边距
        //   bottom: "9%",
        //   show: true,
        //   containLabel: true
        // },
        xAxis: [
          {
            min: _this.xall[0],
            max: _this.xall[_this.xall.length - 1],
            type: "category",
            boundaryGap: false,
            position: "bottom",
            splitLine: {
              show: true,
              width: "1",
              color: "#E5E5E5"
            },
            axisLine: {
              symbol: [
                "none",
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAACKCAYAAADG4zg7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzMjRkMGMtY2VmNi02ZDQ1LTk2YzYtNmU0MjhkM2FmYzYzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODAwMDRmZTctYzUxZC0wZjQ0LTgzYmItMjZhOTFkN2NlZjVmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDE5OjMyOjU1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDMyNGQwYy1jZWY2LTZkNDUtOTZjNi02ZTQyOGQzYWZjNjMiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rd05OQAAAgFJREFUeNrt3DFLAzEYxvEkFNGvYBEUHRQciiId7ejWrR3aLl36NTr6tRxFFAdBB0VB6u4mIp5vIAWxae+SvMkFeQIvJ8c1/vq3IL3hZFEUIselxH9fs9mso4drvwajbWqOnWz+lKbUqR6ualyfsfMlP9cHo0JndGj/OtU252ovNq14Lh3MUoutmopQi6WailCLpZr0ROnXXdEcl1x6TXPSbDaLVMW6FVDCXNNNUszUuqFpVXzJLc2RazXlWavlcH3Lp5qMXMu7mopcy7uaTFDLq5pLsX4Aal6tz1qMauk3cEdzEPif4p7mkKp9cxXrMaCE2aPHUoyxllM1lbCWUzWZuFblamXFBhFQ82oDr2JUS3+DeqDZjfSN74lmn6p9uRYbRkQJs/fQqViCWqXVVE21SqvJGmutrGYrNkqImlcbrSxGtdbo8EizlfiezCvNHlX7XFZsXANKmN85tharsZa1msqglrWazKTWQjWVSa2FapJqbZhamyKP9aar6WKTjFDCWCYNc2PkImCjdcvNlUuaj4A92zL07dFHYZsOz39O79AH+CVk32zv8wMGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYBUXxzPu9DMr3i3ngpbEcxQd1w/4l5X+nPd6jgAAAABJRU5ErkJggg=="
              ],
              symbolOffset: [0, 7],
              symbolSize: [10, 15],
              lineStyle: {
                color: "#e5e5e5"
              },
              onZero: false,
              show: false
            },
            axisLabel: {
              color: "#666666",
              showMinLabel: true,
              showMaxLabel: true,
              align: "left",
              fontSize: 10,
              interval: _this.innerinterval,
              show: false
            },
            data: _this.xall,
            axisTick: { show: true, length: 0 }
          },
          {
            min: _this.xall[0],
            max: _this.xall[_this.xall.length - 1],
            type: "category",
            boundaryGap: false,
            position: "bottom",
            splitLine: {
              show: true,
              width: "1",
              color: "#E5E5E5"
            },
            axisLine: {
              symbol: [
                "none",
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAACKCAYAAADG4zg7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzMjRkMGMtY2VmNi02ZDQ1LTk2YzYtNmU0MjhkM2FmYzYzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODAwMDRmZTctYzUxZC0wZjQ0LTgzYmItMjZhOTFkN2NlZjVmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDE5OjMyOjU1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDMyNGQwYy1jZWY2LTZkNDUtOTZjNi02ZTQyOGQzYWZjNjMiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rd05OQAAAgFJREFUeNrt3DFLAzEYxvEkFNGvYBEUHRQciiId7ejWrR3aLl36NTr6tRxFFAdBB0VB6u4mIp5vIAWxae+SvMkFeQIvJ8c1/vq3IL3hZFEUIselxH9fs9mso4drvwajbWqOnWz+lKbUqR6ualyfsfMlP9cHo0JndGj/OtU252ovNq14Lh3MUoutmopQi6WailCLpZr0ROnXXdEcl1x6TXPSbDaLVMW6FVDCXNNNUszUuqFpVXzJLc2RazXlWavlcH3Lp5qMXMu7mopcy7uaTFDLq5pLsX4Aal6tz1qMauk3cEdzEPif4p7mkKp9cxXrMaCE2aPHUoyxllM1lbCWUzWZuFblamXFBhFQ82oDr2JUS3+DeqDZjfSN74lmn6p9uRYbRkQJs/fQqViCWqXVVE21SqvJGmutrGYrNkqImlcbrSxGtdbo8EizlfiezCvNHlX7XFZsXANKmN85tharsZa1msqglrWazKTWQjWVSa2FapJqbZhamyKP9aar6WKTjFDCWCYNc2PkImCjdcvNlUuaj4A92zL07dFHYZsOz39O79AH+CVk32zv8wMGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYBUXxzPu9DMr3i3ngpbEcxQd1w/4l5X+nPd6jgAAAABJRU5ErkJggg=="
              ],
              symbolOffset: [0, 9],
              symbolSize: [6, 20],
              lineStyle: {
                color: "#e5e5e5"
              },
              onZero: false
            },
            axisLabel: {
              color: "#666666",
              showMinLabel: true,
              showMaxLabel: true,
              align: "left",
              fontSize: 10,
              interval: _this.interval,
              show: true
            },
            data: _this.xall,
            axisTick: { show: true, length: 0 }
          }
        ],
        yAxis: [
          {
            type: "category",
            boundaryGap: false,
            show: true,
            // min: "",
            // max: 24,
            position: "left",
            splitLine: {
              show: true,
              width: "1",
              color: "#E5E5E5"
            },
            axisLine: {
              symbol: [
                "none",
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAACKCAYAAADG4zg7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzMjRkMGMtY2VmNi02ZDQ1LTk2YzYtNmU0MjhkM2FmYzYzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODAwMDRmZTctYzUxZC0wZjQ0LTgzYmItMjZhOTFkN2NlZjVmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDE5OjMyOjU1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDMyNGQwYy1jZWY2LTZkNDUtOTZjNi02ZTQyOGQzYWZjNjMiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rd05OQAAAgFJREFUeNrt3DFLAzEYxvEkFNGvYBEUHRQciiId7ejWrR3aLl36NTr6tRxFFAdBB0VB6u4mIp5vIAWxae+SvMkFeQIvJ8c1/vq3IL3hZFEUIselxH9fs9mso4drvwajbWqOnWz+lKbUqR6ualyfsfMlP9cHo0JndGj/OtU252ovNq14Lh3MUoutmopQi6WailCLpZr0ROnXXdEcl1x6TXPSbDaLVMW6FVDCXNNNUszUuqFpVXzJLc2RazXlWavlcH3Lp5qMXMu7mopcy7uaTFDLq5pLsX4Aal6tz1qMauk3cEdzEPif4p7mkKp9cxXrMaCE2aPHUoyxllM1lbCWUzWZuFblamXFBhFQ82oDr2JUS3+DeqDZjfSN74lmn6p9uRYbRkQJs/fQqViCWqXVVE21SqvJGmutrGYrNkqImlcbrSxGtdbo8EizlfiezCvNHlX7XFZsXANKmN85tharsZa1msqglrWazKTWQjWVSa2FapJqbZhamyKP9aar6WKTjFDCWCYNc2PkImCjdcvNlUuaj4A92zL07dFHYZsOz39O79AH+CVk32zv8wMGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYBUXxzPu9DMr3i3ngpbEcxQd1w/4l5X+nPd6jgAAAABJRU5ErkJggg=="
              ],
              symbolOffset: [0, 9],
              symbolSize: [6, 20],
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
              showMinLabel: false
            },
            // data: ["", 0, 8, 16, 24]
            data: [-5, 0, 8, 16, 24]
          },
          {
            type: "value",
            boundaryGap: false,
            show: true,
            min: -8,
            max: 24,
            position: "left",
            splitLine: {
              show: false
            },
            axisLine: {
              show: false,
              symbol: [
                "none",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAACKCAYAAADG4zg7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0yNlQxOTozMjo1NSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzMjRkMGMtY2VmNi02ZDQ1LTk2YzYtNmU0MjhkM2FmYzYzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODAwMDRmZTctYzUxZC0wZjQ0LTgzYmItMjZhOTFkN2NlZjVmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzdlNWJjZGQtM2E5NS0yYTQ2LWExZDAtOTM2MTg4NWM3NDI0IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDE5OjMyOjU1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDMyNGQwYy1jZWY2LTZkNDUtOTZjNi02ZTQyOGQzYWZjNjMiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjZUMTk6MzI6NTUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rd05OQAAAgFJREFUeNrt3DFLAzEYxvEkFNGvYBEUHRQciiId7ejWrR3aLl36NTr6tRxFFAdBB0VB6u4mIp5vIAWxae+SvMkFeQIvJ8c1/vq3IL3hZFEUIselxH9fs9mso4drvwajbWqOnWz+lKbUqR6ualyfsfMlP9cHo0JndGj/OtU252ovNq14Lh3MUoutmopQi6WailCLpZr0ROnXXdEcl1x6TXPSbDaLVMW6FVDCXNNNUszUuqFpVXzJLc2RazXlWavlcH3Lp5qMXMu7mopcy7uaTFDLq5pLsX4Aal6tz1qMauk3cEdzEPif4p7mkKp9cxXrMaCE2aPHUoyxllM1lbCWUzWZuFblamXFBhFQ82oDr2JUS3+DeqDZjfSN74lmn6p9uRYbRkQJs/fQqViCWqXVVE21SqvJGmutrGYrNkqImlcbrSxGtdbo8EizlfiezCvNHlX7XFZsXANKmN85tharsZa1msqglrWazKTWQjWVSa2FapJqbZhamyKP9aar6WKTjFDCWCYNc2PkImCjdcvNlUuaj4A92zL07dFHYZsOz39O79AH+CVk32zv8wMGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYBUXxzPu9DMr3i3ngpbEcxQd1w/4l5X+nPd6jgAAAABJRU5ErkJggg=="
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
              showMinLabel: true,
              show: false
            }
          }
        ],
        series: [
          {
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: dataAll,
            // data: [
            //   ["04.12", 0],
            //   ["03.21", 0],
            //   ["03.20", 4],
            //   ["03.10", 24],
            //   ["02.28", 7],
            //   ["02.26", 8],
            //   ["12.09", 24]
            // ],
            symbol: "circle",
            showAllSymbol: true,
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
          // if(e){
          //   Toast(e);
          // }
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
          // if(e){
          //   Toast(e);
          // }
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
  // padding: 0 0.32rem;
  padding-left: 0.32rem;
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
        font-size: 0.36rem;
        font-family: "PingFangSC-Medium";
        font-weight: 400;
        color: #f2a900;
        line-height: initial;
      }
      .time {
        font-size: 0.28rem;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: #acadaf;
        line-height: initial;
      }
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 0.28rem;
      font-family: "PingFangSC-Medium";
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      text-decoration: underline;
      padding-right: 0.32rem;
    }
  }
}
</style>
