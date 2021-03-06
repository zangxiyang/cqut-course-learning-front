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
    publishDate: string,
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
    knowledgeCount: number
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

// 加入课程请求体
export interface IModelSignCourseRequest {
    courseId: number,
    studentId: number,
}

// 课程加入人数返回
export interface IModelSignCourseNumberResp {
    count: number,
    avatars?: string[]
}

export interface IModelCommentCourseResp {
    id: number,
    content: string,
    userName: string,
    nickName: string,
    avatar: string,
    parentId?: number,
    parentNickName?: string,
    children?: IModelCommentCourseResp[],
    date: string,
}

// 发布课程评论请求
export interface IModelCommentCourseRequest {
    courseId: number,
    userId: number,
    content: string,
    parentId?: number
}

// 课程文件返回体
export interface IModelCourseFileResp {
    id: number,
    courseId: number,
    cosId: number,
    fileName: string,
    fileType: string,
    userName: string,
    nickName: string,
    url: string,
    createDate: string
}

// 知识点文件返回体
export interface IModelKnowledgeFileResp {
    id: number,
    courseId: number,
    cosId: number,
    fileName: string,
    fileType: string,
    userName: string,
    knowledgeName: string;           // 知识点名
    knowledgeDescription: string;    // 知识点描述
    url: string,
    createDate: string
}


// 通知请求体
export interface IModelNoticeRequest{
    courseId: number,
    title: string,
    content: string,
    status?: number
}
// 通知返回体
export interface IModelNoticeResp{
    id: number,
    courseId: number,
    title: string,
    content: string,
    date: string,
    status: number
}

// 作业请求体
export interface IModelHomeworkRequest {
    courseId: number,
    title: string,
    content: string,
    fileUrl?: string
}
export interface IModelHomeworkResp {
    id: number;
    courseId: number;
    title: string;
    content: string;
    date: string;
    endDate: string;
    fileUrl: string;
}

