/**
 * @作者: Seale
 * @时间: 2022/4/29
 * @版本: V1.0
 */
import {RoleType} from "@/store/user/types";


export interface IModelCourseNav{
    index?: number
    name?: string
    disabled?: boolean,
    role?: RoleType[]
}
