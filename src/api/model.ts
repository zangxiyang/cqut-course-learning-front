/**
 * @作者: Seale
 * @时间: 2022/5/13
 * @版本: V1.0
 */

// 基本分页返回
export interface BasePageRes<T>{
    total: number;
    pageNum: number;
    pageSize: number;
    size: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    list: T;
}
// 基本分页参数
export interface BaseParams{
    page: number;
    size: number;
}

// 分页组件
export interface BasePagination{
    page?: number,
    size?: number,
    total?: number
}
