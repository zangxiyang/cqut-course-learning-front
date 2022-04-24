import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {baseConfig} from "@/config";

const routes: Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: () => import('@/view/Home/index.vue'),
        meta: {
            title: '首页',
            ignoreCache: true
        }
    },
    {
        name: 'user',
        path: '/user',
        redirect: '/user/home',
        component: ()=> import('@/view/User/index.vue'),
        meta: {
            title: '用户中心',
            roles: ['admin','student','teacher'],
            ignoreCache: true
        },
        children:[
            {
                name: 'user-course',
                path: '/user/course',
                component: ()=> import('@/view/User/Course/index.vue'),
                meta:{
                    userNavName: 'course'
                }
            },
            {
                name: 'user-message',
                path: '/user/message',
                component: ()=> import('@/view/User/Message/index.vue'),
                meta:{
                    userNavName: 'message'
                }
            },
            {
                name: 'user-home',
                path: '/user/home',
                component: ()=> import('@/view/User/Home/index.vue'),
                meta:{
                    userNavName: 'home'
                }
            },
            {
                name: 'user-setting',
                path: '/user/setting',
                component: ()=> import('@/view/User/Setting/index.vue'),
                meta:{
                    userNavName: 'setting'
                }
            }
        ]
    },
    {
        name: 'Course',
        path: '/course',
        component: ()=> import('@/view/Course/index.vue'),
        meta:{
            title: "课程",
            ignoreCache: true
        }
    },
    {
        name: 'CourseDetail',
        path: '/course/:id',
        component: ()=> import('@/view/Course/view/CourseDetail/index.vue'),
        meta:{
            ignoreCache: false
        },
        props: true
    }

]


export const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 * 路由守卫
 */

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - ${baseConfig.title}`
    }
    // 保证每次切换路由页面都在最上方
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    next()
})
