/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明:
 * @网站: https://www.imsle.com
 */

import axios, { AxiosResponse} from "axios";
import {Notification} from "@arco-design/web-vue";
import Cookies from 'js-cookie'


export interface Response<T>{
    code?: number
    data?: T
    message?: string
}


// 认证信息 Header名

const xsrfHeaderName = "token";

// 认证类型

export class AuthType {
    public static BEARER = 'Bearer'
    public static BASIC = "Basic"
}

// 请求方式
export class Methods {
    public static GET = 'get'
    public static POST = 'post'
    public static DELETE = 'delete'
    public static PUT = 'put'
}

// axios 默认配置
axios.defaults.timeout = 8000;
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = xsrfHeaderName;
axios.defaults.xsrfCookieName = xsrfHeaderName;
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
console.log(`当前请求baseUrl:${import.meta.env.VITE_APP_BASE_URL}`)

// axios 拦截器

// 设置 axios 请求拦截器
axios.interceptors.request.use(config=>{
    // 发送请求前

    return config;
},error => {
    // 当请求错误的时候
    // 创建一个2秒消失的的报错提示窗口
    Notification.error({
        title: '请求出错',
        content: error.message,
        duration: 2000,
        closable: true
    })
    return Promise.reject(error);
})

// 设置 axios 响应拦截器
axios.interceptors.response.use(resp=>{
    //TODO 进行错误码的处理
    console.log(resp)
    // 后端服务正常，业务错误
    return resp.data;
},error => {
    // 后端服务异常
    Notification.error({
        title: '服务器异常',
        content: error.message,
        duration: 2000,
        closable: true
    });
    return Promise.reject(error);
})




/**
 * axios 请求
 * @param url 请求地址
 * @param method 请求方式
 * @param params 请求参数
 */
export async function request<T>(url: string, method: string, params?: any): Promise<Response<T>> {
    switch (method) {
        case Methods.GET:
            return axios.get(url, {params})
        case Methods.POST:
            return axios.post(url, params)
        case Methods.PUT:
            return axios.put(url, params)
        case Methods.DELETE:
            return axios.delete(url, {params})
        default:
            return axios.get(url, {params});
    }
}

interface Auth {
    token: string;
    expireAt: number;
}

/**
 * 设置认证信息
 * @param auth
 * @param authType
 */
export function setAuthorization(auth: Auth, authType: string = AuthType.BEARER): void {
    switch (authType) {
        case AuthType.BEARER:
            Cookies.set(xsrfHeaderName, "Bearer " + auth.token, {expires: auth.expireAt})
            break;
        case AuthType.BASIC:
            Cookies.set(xsrfHeaderName, auth.token, {expires: auth.expireAt})
            break;
    }
}

/**
 * 移除认证信息
 */
export function removeAuthorization(): void {
    Cookies.remove(xsrfHeaderName);
}

/**
 * 检查认证信息
 */
export function checkAuthorization(): boolean{
    return !!Cookies.get(xsrfHeaderName);
}
