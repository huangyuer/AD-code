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
            path: '/medicationInstructions/itemInfo',
            component: () =>
                import ('@/views/medicationGuidance/medicationInstructions/components/itemInfo'),
            name: 'itemInfo',
            meta: {
                title: '用药说明',
                index: 2,
            }

        },
    ]
})