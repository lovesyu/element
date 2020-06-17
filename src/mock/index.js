import Mock from "mockjs";
import { user_list } from "./user";


// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1000
})

//接口
Mock.mock(/\/user\/list/, user_list)

export default Mock