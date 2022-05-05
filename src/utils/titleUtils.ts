import {baseConfig} from "@/config";

/**
 * @作者: Seale
 * @时间: 2022/4/29
 * @版本: V1.0
 */

export const setTitle = (title: string = "默认标题")=> {
    document.title = `${title} - ${baseConfig.title}`
}
