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
    return request<BasePageRes<IModelCourseResp[]>>(`${ApiUrl.API_COURSE_LIST_URL}?status=1`, Methods.GET, params)
}
export function classListRequest(){
    return request<IModelClassResp[]>(`${ApiUrl.API_CLASS_LIST_URL}`, Methods.GET);
}

// 查询课程详情
export function courseDetailRequest(id: number){
    return request<IModelCourseResp>(`${ApiUrl.API_COURSE_DETAIL_URL}/${id}`,Methods.GET);
}

