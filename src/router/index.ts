import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {baseConfig} from "@/config";

const routes: Array<RouteRecordRaw> = [{
    name: 'home',
    path: '/',
    component: ()=> import('@/view/Home/index.vue'),
    meta:{
        title: '首页',
        ignoreCache: true
    }
}]


export const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 * 路由守卫
 */

router.beforeEach((to, from, next) => {
    if (to.meta.title){
        document.title = `${to.meta.title} - ${baseConfig.title}`
    }
    // 保证每次切换路由页面都在最上方
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    next()
})
