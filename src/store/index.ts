/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明: pinia 状态管理
 */
import {createPinia} from "pinia";
// 引入持久化插件
import {createPersistedState} from "pinia-persistedstate-plugin";

const pinia = createPinia();

pinia.use(createPersistedState({
    storage: window.sessionStorage
}))


export default pinia;
