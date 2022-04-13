/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明:
 * @网站: https://www.imsle.com
 */
export interface IModelLoginResp {
    id?: number
    userName?: string
    nickName?: string
    role?: string
    roleName?: string
    token?: string
}

export interface IModelUserDetailResp {
    id: number
    userName: string
    roleName: string
    phone: string
    nickName: string
    sex: number
    school: string
    description: string
    className: string
    createDate: string
    lastLoginDate: string
}


