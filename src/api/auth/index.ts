/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明: 鉴权相关api
 * @网站: https://www.imsle.com
 */
import {Methods, request, Response} from "@/utils/request";
import {ApiUrl} from "@/api/ApiUrl";
import {IModelRegisterForm} from "@/components/header/model";

// 发送手机验证码
export async function sendSmsCodeRequest(phone: string){
    return request<string>(`${ApiUrl.API_REGISTER_SEND_CODE_URL}/${phone}`,Methods.POST);
}
// 注册
export async function registerRequest(params: IModelRegisterForm){
    return request<string>(`${ApiUrl.API_REGISTER_URL}`,Methods.POST, params)

}
