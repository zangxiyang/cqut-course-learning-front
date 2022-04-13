/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明: 鉴权相关api
 * @网站: https://www.imsle.com
 */
import {Methods, request, Response} from "@/utils/request";
import {ApiUrl} from "@/api/ApiUrl";
import {IModelLoginForm, IModelRegisterForm} from "@/components/header/model";
import {IModelLoginResp, IModelUserDetailResp} from "@/api/auth/model";

// 发送手机验证码
export async function sendSmsCodeRequest(phone: string){
    return request<string>(`${ApiUrl.API_REGISTER_SEND_CODE_URL}/${phone}`,Methods.POST);
}
// 注册
export async function registerRequest(params: IModelRegisterForm){
    return request<string>(`${ApiUrl.API_REGISTER_URL}`,Methods.POST, params)
}
// 登录
export async function loginRequest(params: IModelLoginForm){
    return request<IModelLoginResp>(`${ApiUrl.API_LOGIN_URL}`,Methods.POST,params);
}

// 获取用户详情
export async function userDetailRequest(id: number){
    return request<IModelUserDetailResp>(`${ApiUrl.API_USER_DETAIL_URL}/${id}`, Methods.GET);
}
