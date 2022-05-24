/**
 * @作者: Seale
 * @时间: 2022/4/26
 * @版本: V1.0
 */

export interface IModelCourseDetailItem{
    title?: string
    desc?: string
    nodes?: IModelCourseDetailItemNode[]
}


export interface IModelCourseDetailItemNode{
    title?: string
    type?: string       // 资源类型 video：视频，file：文件
    route?: string      // 点击跳转的地址
    videoUrl?: string   // 视频地址
    teacherId?: number  // 教师id
}
