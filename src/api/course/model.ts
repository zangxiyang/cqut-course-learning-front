/**
 * @作者: Seale
 * @时间: 2022/5/13
 * @版本: V1.0
 */

// 文章
export interface IModelCourseResp {
    id: number,
    name: string,
    subName: string,
    description: string,
    authorTeacherId: number,
    teacherName: string,
    classId: number,
    className: string,
    thumb: string,
    status: number,
    detailId: number,
    publishDate: string
}

export interface IModelClassResp {
    id:number;
    className: string;
    description: string;
}

export interface IModelCourseDetailResp {
    id: number,
    name: string,
    subName: string,
    description: string,
    authorTeacherId: number,
    teacherName: string,
    avatar: string,
    teacherDescription: string,
    classId: number,
    className: string,
    thumb: string,
    status: number,
    content: string,
    publishDate: string,
    chapters: IModelChapter[],
}
interface IModelChapter {
    chapterName: string,
    description: string,
    nodes:IModelNode[]
}

interface IModelNode{
    nodeName: string,
    videoUrl: string
}

