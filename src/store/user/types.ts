/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明:
 */

export type RoleType = '' | '*' | 'admin' | 'student' | 'teacher'

export interface UserState{
    id?: number
    userName?: string
    phone?: string
    roleName?: string
    role?: RoleType
    sex?: number
    nickName?: string
    school?: string
    className?: string
    description?: string
}
