import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/hospitalMap",
      component: () =>
        import("@/views/medicationGuidance/hospitalMap"),
      name: "HospitalMap",
      meta: {
        title: "医院地图"
      }
    },
    {
      path: "/diseaseKnowledge",
      component: () => import("@/views/diseaseKnowledge/diseaseKnowledge"),
      name: "DiseaseKnowledge",
      meta: {
        title: "疾病知识",
        index: 1
      }
    },
    {
      path: "/diseaseKnowledge/detail",
      component: () =>
        import(
          "@/views/diseaseKnowledge/diseaseKnowledge/components/diseaseDetail.vue"
        ),
      name: "DiseaseDetail",
      meta: {
        title: "疾病知识",
        index: 2
      }
    },
    {
      path: "/patientStory",
      component: () => import("@/views/diseaseKnowledge/patientStory"),
      name: "PatientStory",
      meta: {
        title: "患者故事",
        index: 1
      }
    },
    {
      path: "/messageBoard",
      component: () =>
        import(
          "@/views/diseaseKnowledge/messageBoard"
        ),
      name: "MessageBoard",
      meta: {
        title: "留言板",
        index: 1
      }
    },
    {
      path: "/messageBoard/leaveMessage",
      component: () =>
        import(
          "@/views/diseaseKnowledge/messageBoard/components/leaveMessage.vue"
        ),
      name: "LeaveMessage",
      meta: {
        title: "留言填写",
        index: 2
      }
    },
    {
      path: "/medicationInstructions",
      component: () =>
        import("@/views/medicationGuidance/medicationInstructions"),
      name: "MedicationInstructions",
      meta: {
        title: "用药说明",
        index: 1
      }
    },
    {
      path: "/DetailInfo",
      component: () =>
        import("@/components/DetailInfo"),
      name: "DetailInfo",
      meta: {
        index: 2
      }
    },
    {
      path: "/caringAction",
      component: () =>
        import("@/views/medicationGuidance/caringAction"),
      name: "caringAction",
      meta: {
        title: "关爱行动",
        index: 1
      }
    },
    {
      path: "/diseaseTest",
      component: () =>
        import("@/views/patientManagement/diseaseTest"),
      name: "diseaseTest",
      meta: {
        title: "疾病自测",
        index: 1
      }
    },
    {
      path: "/integralExchange",
      component: () =>
        import("@/views/patientManagement/integralExchange"),
      name: "integralExchange",
      meta: {
        title: "积分兑换",
        index: 2
      }
    },
    {
      path: "/productInfo",
      component: () =>
        import("@/views/patientManagement/integralExchange/components/ProductInfo"),
      name: "ProductInfo",
      meta: {
        title: "商品详情",
        index: 4
      }
    },
    {
      path: "/myexchange",
      component: () =>
        import("@/views/patientManagement/integralExchange/components/myexchange"),
      name: "myexchange",
      meta: {
        title: "我的兑换",
        index: 3
      }
    },
    {
      path: "/personalCenter",
      component: () =>
        import("@/views/patientManagement/personalCenter"),
      meta: {
        title: "个人中心",
        index: 1
      }
    },
    {
      path: "/personalInfo",
      component: () =>
        import("@/views/patientManagement/personalCenter/components/personalInfo"),
      meta: {
        title: "我的信息",
        index: 2
      }
    },
    {
      path: "/editpersonalInfo",
      component: () =>
        import("@/views/patientManagement/personalCenter/components/editpersonalInfo"),
      meta: {
        title: "编辑个人信息",
        index: 3
      }
    },
    {
      path: "/editaddressInfo",
      component: () =>
        import("@/components/editaddressInfo"),
      meta: {
        title: "编辑收货地址",
        index: 3
      }
    },
    {
      path: "/myCollect",
      component: () =>
        import("@/views/patientManagement/personalCenter/components/mycollect"),
      meta: {
        title: "我的收藏",
        index: 2
      }
    },
    {
      path: "/assesshistory",
      component: () =>
        import("@/views/patientManagement/personalCenter/components/assesshistory"),
      meta: {
        title: "评估历史",
        index: 2
      }
    },
    {
      path: "/scienceVideo",
      component: () =>
        import("@/views/diseaseKnowledge/scienceVideo"),
      meta: {
        title: "视频动态",
        index: 1
      }
    }
  ]
});
