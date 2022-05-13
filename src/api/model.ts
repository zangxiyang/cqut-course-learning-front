/**
 * @作者: Seale
 * @时间: 2022/5/13
 * @版本: V1.0
 */

// 基本分页返回
export interface BasePageRes<T>{
    total: number;
    pageNumber: number;
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
