import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/hospitalMap",
      component: () => import("@/views/medicationGuidance/hospitalMap"),
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
      component: () => import("@/components/DetailInfo"),
      name: "DetailInfo",
      meta: {
        index: 2
      }
    },
    {
      path: "/caringAction",
      component: () => import("@/views/medicationGuidance/caringAction"),
      name: "caringAction",
      meta: {
        title: "关爱行动",
        index: 1
      }
    },
    {
      path: "/diseaseTest",
      component: () => import("@/views/patientManagement/diseaseTest"),
      name: "diseaseTest",
      meta: {
        title: "疾病自测",
        index: 1
      }
    }
  ]
});
