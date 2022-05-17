/**
 * @作者: Seale
 * @时间: 2022/5/13
 * @版本: V1.0
 * @说明: 课程服务
 */
import {Methods, request} from "@/utils/request";
import {ApiUrl} from "@/api/ApiUrl";
import {BasePageRes, BaseParams} from "@/api/model";
import {
    IModelClassResp, IModelCourseDetailResp,
    IModelCourseResp,
    IModelSignCourseNumberResp,
    IModelSignCourseRequest
} from "@/api/course/model";
import {Message} from "@arco-design/web-vue";


export function courseListRequest(params: BaseParams){
    return request<BasePageRes<IModelCourseResp[]>>(`${ApiUrl.API_COURSE_LIST_URL}?status=1`, Methods.GET, params)
}
export function classListRequest(){
    return request<IModelClassResp[]>(`${ApiUrl.API_CLASS_LIST_URL}`, Methods.GET);
}

// 查询课程详情
export function courseDetailRequest(id: number){
    return request<IModelCourseDetailResp>(`${ApiUrl.API_COURSE_DETAIL_URL}/${id}`,Methods.GET);
}

// 查询课程加入人数（带avatar）
export function courseSignNumberRequest(id: number){
    return request<IModelSignCourseNumberResp>(`${ApiUrl.API_SIGN_COURSE_NUMBER_URL}/${id}`, Methods.GET);
}

// 加入课程
export function signCourseRequest(params: IModelSignCourseRequest){
    return request(`${ApiUrl.API_SIGN_COURSE_URL}`, Methods.POST, params);
}
// 查询学生是否加入课程
export function queryCourseSignRequest(courseId: number, studentId: number){
    return request<boolean>(`${ApiUrl.API_SIGN_COURSE_URL}/${courseId}`,Methods.GET, {studentId})
}

