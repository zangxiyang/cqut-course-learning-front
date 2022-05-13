/**
 * @作者: Seale
 * @时间: 2022/5/13
 * @版本: V1.0
 * @说明: 课程服务
 */
import {Methods, request} from "@/utils/request";
import {ApiUrl} from "@/api/ApiUrl";
import {BasePageRes, BaseParams} from "@/api/model";
import {IModelClassResp, IModelCourseResp} from "@/api/course/model";


export function courseListRequest(params: BaseParams){
    return request<BasePageRes<IModelCourseResp[]>>(`${ApiUrl.API_COURSE_LIST_URL}`, Methods.GET, params)
}
export function classListRequest(){
    return request<IModelClassResp[]>(`${ApiUrl.API_CLASS_LIST_URL}`, Methods.GET);
}
