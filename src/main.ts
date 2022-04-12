import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from "@arco-design/web-vue";
import {router} from "@/router";
// 引入基础css
import '@/assets/scss/index.scss'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import pinia from "@/store";

createApp(App)
    .use(router)
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(pinia)
    .mount('#app')
