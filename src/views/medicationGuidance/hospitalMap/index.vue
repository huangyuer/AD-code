<template>
  <div class="HospitalMapWapper">
    <!-- <svg-icon iconClass='xiala' className='icon'></svg-icon> -->
    <div class="MapCenter">
      <search-input
        :placeholder="'输入我的位置'"
        :recentSearch="recentSearch"
        @onChange="onChange"
        @recentClear="recentClear"
      ></search-input>
      <!-- <div><div id="container" style="width:100%;height:100vh"></div></div> -->
      <div id="allmap"></div>
      <div>
        <div
          @click="openHospitalList()"
          style="background:green;width:100%;heigth:.3rem"
        >
          fsdfsfsaf
        </div>
      </div>
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</!-->
    <div class="listDoctorAndHospital">
      <transition name="van-slide-up">
        <hospital-list
          :show="show"
          @toHostipalDetail="toHostipalDetail"
        ></hospital-list>
      </transition>
      <transition name="van-slide-up">
        <hospital-detail :show="showDetail" @goNav="goNav"></hospital-detail>
      </transition>
      <transition name="van-slide-up">
        <navgation-hospital
          :show="showNav"
          @closeNav="closeNav"
        ></navgation-hospital>
      </transition>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import HospitalDetail from "./components/hospitalDetail";
import HospitalList from "./components/hospitalList";
import NavgationHospital from "./components/navgationHospital";
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
      ii: false,
      show: false,
      showDetail: false,
      showNav: false,
      search: "",
      recentSearch: {
        type: "最近输入位置",
        data: ["上海市皮肤病医院", "上海江城皮肤病医院"]
      }
    };
  },
  created() {},
  mounted() {
    // this.getLocation();
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(121.612682, 31.176923);
    map.centerAndZoom(point, 19);
    //创建标注点
    var pt = new BMap.Point(121.612682, 31.176923);
    var myIcon = new BMap.Icon(
      require("../../../assets/up.png"),
      new BMap.Size(32, 32)
    );
    var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
    map.addOverlay(marker2); // 将标注添加到地图中
    this.show = true;
  },
  methods: {
    showPopup() {
      this.ii = true;
    },
    openHospitalList() {
      this.show = true;
    },
    toHostipalDetail(val, bool) {
      this.show = bool;
      setTimeout(() => {
        this.showDetail = !this.show;
      }, 300);
    },
    goNav(val) {
      this.showDetail = val;
      this.showNav = true;
    },
    closeNav(val) {
      this.showNav = val;
      this.showDetail = !val;
    },
    onChange(val) {
      this.search = val;
      console.log("--3-", val);
    },
    recentClear() {
      this.$set(this.recentSearch, "data", []);
    },
    getLocation() {
      document.getElementById("container").innerHTML =
        "正在搜寻中，请稍候。。。";

      var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
      };

      if (navigator.geolocation) {
        //浏览器支持geolocation
        navigator.geolocation.getCurrentPosition(
          this.onSuccess,
          this.onError,
          options
        );
      } else {
        //浏览器不支持geolocation
        alert("浏览器不支持GeoLocation!");
      }
    },

    // 获取成功
    onSuccess(position) {
      console.log("positon", position);
      // 经度
      var longitude = position.coords.longitude;

      // 纬度
      var latitude = position.coords.latitude;

      // 使用百度地图API创建地图实例
      var map = new BMap.Map("container");

      // 创建一个坐标
      var point = new BMap.Point(longitude, latitude);

      // 地图初始化，设置中心点坐标和地图级别
      map.centerAndZoom(point, 16);

      // 设置标注的图标,可自己定义图标
      var icon = new BMap.Icon(
        "http://api.map.baidu.com/img/markers.png",
        new BMap.Size(23, 25),
        {
          offset: new BMap.Size(10, 25), // 定位图标尺寸
          imageOffset: new BMap.Size(0, 0 - 11 * 25) // 设置图片偏移
        }
      );

      // 设置标注的经纬度
      var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
        icon: icon
      });

      // 把标注添加到地图上
      map.addOverlay(marker);

      // 设置点击事件
      marker.addEventListener("click", function() {
        alert("经度:" + longitude + ", 纬度:" + latitude);
      });
    },

    // 获取失败
    onError(error) {
      switch (error.code) {
        case 1:
          alert("位置服务被拒绝");
          break;

        case 2:
          alert("暂时获取不到位置信息");
          break;

        case 3:
          alert("获取信息超时");
          break;

        case 4:
          alert("未知错误");
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.HospitalMapWapper {
  position: relative;
  .MapCenter {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
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
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
</style>
