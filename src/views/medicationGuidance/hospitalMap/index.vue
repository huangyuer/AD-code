<template>
  <div class="HospitalMapWapper">
    <!-- <svg-icon iconClass='xiala' className='icon'></svg-icon> -->

    <div class="MapCenter">
      <!-- <div class="searchdiv" @click="searchpage()"></div> -->
      <div style="padding-top:.4rem;line-height:0"></div>
      <div class="searchwapper" v-if="isExitSearch" @click="searchpage()">
        <van-search
          v-model="valuesearch"
          :readonly="true"
          :placeholder="'输入我的位置'"
          class="seach-input"
          type="search"
        />
        <!-- <search-input :valuesearch="valuesearch" :readonly="true" :placeholder="'输入我的位置'"></search-input> -->
      </div>
      <div id="allmap"></div>
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</!-->
    <div class="listDoctorAndHospital">
      <transition name="van-slide-up">
        <hospital-list
          :show="show"
          :typeValue="typeValue"
          :hospitals="hospitals"
          :isloading="isloading"
          @toHostipalDetail="toHostipalDetail"
          @typePickeropen="typePickeropen"
        ></hospital-list>
      </transition>
      <transition name="van-slide-up">
        <hospital-detail
          :show="showDetail"
          :doctors="doctors"
          :hispitalDetail="hispitalDetail"
          :hospitalIntro="hospitalIntro"
          :hospitalSignInfo="hospitalSignInfo"
          @goNav="goNav"
          @closedetailNav="closedetailNav"
        ></hospital-detail>
      </transition>
      <transition name="van-slide-up">
        <navgation-hospital
          :show="showNav"
          :x="x"
          :y="y"
          :hispitalDetail="hispitalDetail"
          @togoNavPART="togoNavPART"
          @closeNav="closeNav"
        ></navgation-hospital>
      </transition>
      <van-popup class="distancetip" v-model="typePicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @confirm="typeConfirm"
          @cancel="typePicker = false"
          visible-item-count="3"
        />
      </van-popup>
      <van-action-sheet
        v-model="showactionsheet"
        :actions="actions"
        cancel-text="取消"
        @select="onSelectAction"
        @cancel="onCancel"
      />
      <van-overlay :show="showNoSetLocation" @click="show = false">
        <div class="showNoSetLocationwrapper" @click.stop>
          <div class="block">
            <div class="title">温馨提示</div>
            <div class="content">
              建议您前往公众号“
              <b>设置</b>”中打开“
              <b>提供位置信息</b>”功能并点击确定，以便为您提供附近医院信息。
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import HospitalDetail from "./components/hospitalDetail";
import HospitalList from "./components/hospitalList";
import NavgationHospital from "./components/navgationHospital";
import { Toast } from "vant";
export default {
  name: "HospitalMap",
  components: {
    SearchInput,
    HospitalDetail,
    HospitalList,
    NavgationHospital
  },
  data() {
    return {
      valuesearch: "",
      isExitSearch: true,
      typePicker: false,
      typeValue: "",
      distancediv: "",
      typeColumns: ["全部", "3公里以内", "5公里以内", "10公里以内"],
      ii: false,
      show: false,
      showDetail: false,
      showNav: false,
      search: "",
      x: 0,
      y: 0,
      params: {
        x: String,
        y: String,
        address: String,
        distance: Number
      },
      isloading: false,
      hospitals: [],
      hispitalDetail: {},
      hospitalIntro: {},
      hospitalSignInfo: {},
      doctors: [],
      showactionsheet: false,
      showNoSetLocation: false,
      actions: [
        {
          name: "腾讯地图",
          color: "#07c160",
          subname: "推荐",
          className: "push"
        },
        { name: "高德地图", color: "#07c160" },
        { name: "百度地图", color: "#07c160" }
      ]
    };
  },
  created() {
    if (this.$route.params.item != undefined) {
      var address =
        this.$route.params.item.province +
        this.$route.params.item.city +
        this.$route.params.item.address;
      this.valuesearch = address;
      console.log("this.valuesearch", this.valuesearch);
      this.$set(this.params, "address", address);
      this.x = this.$route.params.item.x;
      this.y = this.$route.params.item.y;
    } else {
      this.getMyLocation();
    }
  },
  watch: {
    $route(to, from) {
      if (from.path == "/searchPage") {
        if (this.$route.params.item != undefined) {
          var address =
            this.$route.params.item.province +
            this.$route.params.item.city +
            this.$route.params.item.address;
          this.valuesearch = address;
          this.$set(this.params, "address", address);
          this.x = this.$route.params.item.x;
          this.y = this.$route.params.item.y;
          var map = new BMap.Map("allmap");
          this.show = true;
          this.showDetail = !this.show;
          this.mapMyLocation(map, 13);
          this.getNearHospitals(map);
        } else {
          this.getMyLocation();
        }
      }
    },

  },
  mounted() {
    this.show = true;
    if (this.$route.params.item != undefined) {
      var map = new BMap.Map("allmap");
      this.mapMyLocation(map, 13);
      this.getNearHospitals(map);
    }
  },
  methods: {
    searchpage() {
      this.$router.push({ path: "/searchPage" });
    },
    searchByStationName(localSearch) {
      //拿到医院名字，得到经纬度
      var keyword = this.hispitalDetail.name;
      var _this = this;
      localSearch.setSearchCompleteCallback(function(searchResult) {
        var poi = searchResult.getPoi(0);
        var PointArr = new Array();
        var point0 = new BMap.Point(_this.x, _this.y); //创建一个地理点坐标
        var point1 = new BMap.Point(poi.point.lng, poi.point.lat); //创建一个地理点坐标
        PointArr.push(point0);
        PointArr.push(point1);
        var convertor = new BMap.Convertor();
        convertor.translate(PointArr, 1, 5, _this.translateCallback);
      });
      localSearch.search(keyword);
    },
    translateCallback(data) {
      console.log("translateCallback", data);
      var map = new BMap.Map("allmap");
      map.centerAndZoom(data.points[0], 12);
      //创建自定义图标
      var myIcon = new BMap.Icon(
        require("../../../assets/dingwei.png"),
        new BMap.Size(32, 62)
      );
      // 创建标注
      var marker2 = new BMap.Marker(data.points[0], { icon: myIcon });
      // 将标注添加到地图中
      map.addOverlay(marker2);
      // 创建polyline对象
      var polyline = new BMap.Polyline(data.points, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        strokeWeight: "10", //折线的宽度，以像素为单位
        strokeColor: "#90ADFF" //折线颜色
      });
      map.addOverlay(polyline);
    },
    accSub(arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    addNum(num1, num2) {
      var sq1, sq2, m;
      try {
        sq1 = num1.toString().split(".")[1].length;
      } catch (e) {
        sq1 = 0;
      }
      try {
        sq2 = num2.toString().split(".")[1].length;
      } catch (e) {
        sq2 = 0;
      }
      m = Math.pow(10, Math.max(sq1, sq2));
      return (num1 * m + num2 * m) / m;
    },
    map() {
      // 百度地图API功能
      var map = new BMap.Map("allmap");
    },
    mapMyLocation(map, zoom) {
      // if(z00m){

      // }
      var x = this.accSub(this.x, 0.0005 * (18 - zoom) * 10);
      var y = this.accSub(this.y, 0.0006 * (18 - zoom) * 10);
      var point = new BMap.Point(x, y);
      map.centerAndZoom(point, zoom);
      //创建标注点
      var pt = new BMap.Point(this.x, this.y);
      var content = "我的位置";
      var labelpt = new BMap.Point(this.x, this.y);
      var label = new BMap.Label(content, {
        // 创建文本标注
        position: labelpt, // 设置标注的地理位置
        offset: new BMap.Size(-30, 0) // 设置标注的偏移量
      });
      map.addOverlay(label);
      label.setStyle({
        // 设置label的样式
        color: "#030303",
        fontSize: ".2rem",
        border: "0",
        background: "transparent",
        "font-family": "PingFangSC-Medium",
        transform: "rotate(35deg)"
      });
      var myIcon = new BMap.Icon(
        require("../../../assets/dingwei.png"),
        new BMap.Size(32, 62)
      );
      var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      map.addOverlay(marker2); // 将标注添加到地图中
    },
    mapHospitalLocation(map) {
      //创建医院的标注
      for (var i = 0; i < this.hospitals.length; i++) {
        var pt = new BMap.Point(this.hospitals[i].x, this.hospitals[i].y);
        var myIcon = new BMap.Icon(
          require("../../../assets/locationpng.png"),
          new BMap.Size(32, 68)
        );
        var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        map.addOverlay(marker2);
        var istwo = false;
        if (i > 8) {
          istwo = true;
        } else {
          istwo = false;
        }
        var content = i + 1;
        var labelpt = new BMap.Point(this.hospitals[i].x, this.hospitals[i].y);
        var label = new BMap.Label(content, {
          // 创建文本标注
          position: labelpt, // 设置标注的地理位置
          offset: istwo ? new BMap.Size(-9, -32) : new BMap.Size(-6, -34) // 设置标注的偏移量
        });
        map.addOverlay(label);
        label.setStyle({
          // 设置label的样式
          color: "#ffffff",
          fontSize: istwo ? ".25rem" : ".32rem",
          border: "0",
          background: "transparent",
          "font-family": "PingFangSC-Medium"
        });
      }
    },
    drawPolyline() {
      // pointline
      var map = new BMap.Map("allmap");
      var pointstart = new BMap.Point(this.x, this.y);
      var pointend = new BMap.Point(
        this.hispitalDetail.x,
        this.hispitalDetail.y
      );
      map.centerAndZoom(pointstart, 11);
      //创建自定义图标
      var myIcon = new BMap.Icon(
        require("../../../assets/dingwei.png"),
        new BMap.Size(32, 62)
      );
      // 创建标注
      var marker2 = new BMap.Marker(pointstart, { icon: myIcon });
      // 将标注添加到地图中
      map.addOverlay(marker2);
      // 创建polyline对象
      // var polyline = new BMap.Polyline([pointstart, pointend], {
      //   enableEditing: false, //是否启用线编辑，默认为false
      //   enableClicking: true, //是否响应点击事件，默认为true
      //   strokeWeight: "10", //折线的宽度，以像素为单位
      //   strokeColor: "#90ADFF" //折线颜色
      // });
      // map.addOverlay(polyline);
      var driving = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true
        }
      });
      driving.search(pointstart, pointend);
    },
    togoNavPART(bool) {
      this.showactionsheet = bool;
    },
    onSelectAction(active, name) {
      this.showactionsheet = false;
      this.togoNavPARTAction(active.name);
    },
    onCancel() {
      this.showactionsheet = false;
    },
    //跳转第三方
    togoNavPARTAction(name) {
      if (name == "高德地图") {
        var url =
          "https://gaode.com/dir?from[name]=我的位置&from[lnglat]=" +
          this.x +
          "," +
          this.y +
          "&to[name]=" +
          this.hispitalDetail.name +
          "&to[lnglat]=" +
          this.hispitalDetail.x +
          "," +
          this.hispitalDetail.y +
          "&policy=1&type=car";
        window.location.href = url;
      } else if (name == "百度地图") {
        var url =
          "http://api.map.baidu.com/direction?origin=latlng:" +
          this.y +
          "," +
          this.x +
          "|name:我的位置&destination=" +
          this.hispitalDetail.name +
          "&mode=driving&region=上海&output=html&src=webapp.baidu.openAPIdemo";
        window.location.href = url;
      } else {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var url =
          "https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=我的位置&fromcoord=" +
          this.y +
          "," +
          this.x +
          "&to=" +
          this.hispitalDetail.name +
          "&tocoord=" +
          this.hispitalDetail.y +
          "," +
          this.hispitalDetail.x +
          "&coord_type=1&policy=1&referer=adcode";
        if (isAndroid) {
          window.location.href = url;
        }
        if (isIOS) {
          this.$router.replace({
            path: "/map",
            query: { x: this.x, y: this.y, hispitalDetail: this.hispitalDetail }
          });
        }
      }
    },
    //选择距离范围
    typePickeropen() {
      this.typePicker = true;
    },
    //距离范围确定
    typeConfirm(value) {
      var map = new BMap.Map("allmap");
      if (value == "全部") {
        this.$set(this.params, "distance", Number);
        this.mapMyLocation(map, 13);
      } else {
        var distance = parseInt(value.split("公里")[0]);
        if (distance == 3) {
          this.mapMyLocation(map, 14);
        } else if (distance == 5) {
          this.mapMyLocation(map, 14);
        } else {
          this.mapMyLocation(map, 13);
        }
        this.$set(this.params, "distance", distance * 1000);
      }
      this.typeValue = value;
      this.typePicker = false;
      this.isloading = true;
      this.getNearHospitals(map);
    },
    //打开医院详情
    toHostipalDetail(val, bool) {
      document.title = "医院详情";
      this.$route.meta.title = "医院详情";
      this.show = bool;
      this.hispitalDetail = val;
      this.getHospital(val.hospital);
      this.getDoctors(val.hospital);
      this.hospSignCheck(val.hospital);
      setTimeout(() => {
        this.showDetail = !this.show;
      }, 300);
    },
    //导航框显示并拿到目的医院的经纬度
    goNav(val, name) {
      this.isExitSearch = false;
      document.title = "导航";
      this.$route.meta.title = "导航";
      this.showDetail = val;
      this.showNav = true;
      this.drawPolyline();
    },
    showPopup() {
      this.ii = true;
    },
    closedetailNav(val) {
      this.showDetail = false;
      this.show = true;
      document.title = "医院地图";
      this.$route.meta.title = "医院地图";
    },
    closeNav(val) {
      this.showNav = val;
      this.showDetail = !val;
      this.isExitSearch = true;
      document.title = "医院详情";
      this.$route.meta.title = "医院详情";
      // this.map();
      var map = new BMap.Map("allmap");
      this.mapMyLocation(map, 13);
      this.mapHospitalLocation(map);
    },

    //获取我的地址
    getMyLocation() {
      this.$store
        .dispatch("medicationGuidance/getMyLocation")
        .then(res => {
          var map = new BMap.Map("allmap");
          if (!res.data.location.x && !res.data.location.y) {
            this.showNoSetLocation = true;
          } else {
            this.x = parseFloat(res.data.location.x);
            this.y = parseFloat(res.data.location.y);
            this.$set(this.params, "x", res.data.location.x);
            this.$set(this.params, "y", res.data.location.y);
            this.mapMyLocation(map, 13);
            this.getNearHospitals(map);
          }
        })
        .catch(e => {});
    },
    //获取附近医院
    getNearHospitals(map) {
      this.isloading = true;
      this.$store
        .dispatch("medicationGuidance/getNearHospitals", this.params)
        .then(res => {
          console.log("res", res);
          this.isloading = false;
          this.hospitals = res.data.hospitals;
          this.mapHospitalLocation(map);
          this.vloading = false;
        })
        .catch(e => {
          this.isloading = false;
          this.hospitals = [];
        });
    },
    getHospital(id) {
      this.$store
        .dispatch("medicationGuidance/getHospital", id)
        .then(res => {
          this.hospitalIntro = res.data;
        })
        .catch(e => {});
    },
    hospSignCheck(id) {
      this.$store
        .dispatch("medicationGuidance/hospSignCheck", id)
        .then(res => {
          this.hospitalSignInfo = res.data;
        })
    },
    //获取医院医生
    getDoctors(id) {
      this.$store
        .dispatch("medicationGuidance/getDoctors", id)
        .then(res => {
          this.doctors = res.data.doctors;
        })
        .catch(e => {
        });
    }
  }
};
</script>

<style scoped lang="less">
@aaa: ~">>>";

/deep/.distancetip.van-popup.van-popup--bottom {
  z-index: 3000 !important;
}
/deep/.van-overlay {
  z-index: 2999 !important;
}
.HospitalMapWapper {
  position: relative;
  padding-top: 0.4rem;
  .MapCenter {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    .searchwapper {
      // position: fixed;
      z-index: 1;
      width: 100%;
      background: #ffffff;
      padding-bottom: 0.24rem;
    }
  }
  .listDoctorAndHospital {
    width: 100%;
    position: absolute;
    left: 0;
    // bottom:0;
    top: 0;
  }
}
#allmap {
  // width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0 0.32rem;
  box-sizing: border-box;
  background: #ffffff;
}
.distancetip {
  @{aaa} .van-picker__toolbar {
    &::after {
      border: none;
    }
  }
  @{aaa} .van-picker {
    height: 4.16rem;
  }
  @{aaa} .van-picker__frame {
    &::after {
      border: none;
    }
  }

  @{aaa} .van-picker__cancel,
  @{aaa}.van-picker__confirm {
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 153, 102, 1);
  }
}
// searchinput
.seach-input {
  background: rgba(249, 249, 249, 1);
  border-radius: 0.51rem;
  height: 0.72rem;
  margin: 0 0.32rem;
  padding: 0;
  line-height: 0;
}
@{aaa} .van-search__content {
  padding-left: 0.32rem;
  border-radius: 0.51rem;
}
@{aaa} .van-field__left-icon {
  margin-right: 0.16rem;
}
@{aaa} input {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  &::-webkit-input-placeholder {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
@{aaa} .van-icon-search {
  &::before {
    content: "\e68f";
  }
}
@{aaa} .van-field__value {
  .van-icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
}
@{aaa} .van-field__left-icon {
  .van-icon {
    font-family: "iconfont" !important;
    font-size: 0.36rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #8e8e93;
    padding-left: 0.01rem;
  }
}
@{aaa}.van-action-sheet {
  z-index: 3000 !important;
}
@{aaa}.van-action-sheet__subname {
  position: absolute;
  height: 0.36rem;
  line-height: 0.36rem;
  background: linear-gradient(
    270deg,
    rgba(50, 209, 157, 1) 0%,
    rgba(0, 153, 102, 1) 100%
  );
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding: 0 0.16rem;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  margin-left: 0.2rem;
  top: 0.25rem;
}
.showNoSetLocationwrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 5.6rem;
    background-color: #fff;
    border-radius: 0.08rem;
    .title {
      font-size: 0.3rem;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: initial;
      margin: 0.4rem 0 0.16rem 0;
      text-align: center;
    }
    .content {
      margin: 0 0.8rem;
      font-size: 0.28rem;
      color: #666666;
      line-height: 0.4rem;
      font-weight: 500;
      padding-bottom: 1.02rem;
      > b {
        color: #009966;
        font-weight: normal;
      }
    }
  }
}
</style>
