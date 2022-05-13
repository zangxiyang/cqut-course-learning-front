/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明: API 统一管理
 * @网站: https://www.imsle.com
 */
import authApi from '@/api/auth/api'
import courseApi from '@/api/course/api'

export const ApiUrl = {
    ...authApi,
    ...courseApi
}
