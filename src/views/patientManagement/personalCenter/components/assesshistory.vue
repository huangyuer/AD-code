<template>
  <div id="myChart" style="width：6.48rem;height:4.2rem;margin:0 auto"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },

  methods: {
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
      myChart.setOption({
        grid: [{ x: "7%", y: "7%", width: "80%", height: "80%" }],
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
              color: "#999999",
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
              color: "#999999",
              showMinLabel: false
            },
            axisTick: { show: false }
          },
          {
            gridIndex: 0,
            min: 0,
            max: 15,
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
              showMinLabel: false
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
<style lang="less" scoped></style>
