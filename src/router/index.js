import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/hospitalMap',
            component: () =>
                import ('@/views/medicationGuidance/hospitalMap'),
            name: 'HospitalMap',
            meta: {
                title: '医院地图'
            }
        },
        {
            path: '/medicationInstructions',
            component: () =>
                import ('@/views/medicationGuidance/medicationInstructions'),
            name: 'MedicationInstructions',
            meta: {
                title: '用药说明',
                index: 1,
            }
        },
        {
            path: '/itemInfo',
            component: () =>
                import ('@/components/itemInfo'),
            name: 'itemInfo',
            meta: {
                index: 2,
            }
        },
        {
            path: '/caringAction',
            component: () =>
                import ('@/views/medicationGuidance/caringAction'),
            name: 'caringAction',
            meta: {
                title: '关爱行动',
                index: 1,
            }
        },
        {
            path: '/diseaseTest',
            component: () =>
                import ('@/views/patientManagement/diseaseTest'),
            name: 'diseaseTest',
            meta: {
                title: '疾病自测',
                index: 1,
            }
        }
    ]
})