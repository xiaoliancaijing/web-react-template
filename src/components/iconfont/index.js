/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 15:53:35
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-08-25 15:19:33
 * @Descripttion: iconfont全局组件
 */

import { createFromIconfontCN } from '@ant-design/icons';

export default createFromIconfontCN({
	scriptUrl: process.env.REACT_APP_ICONFONT_URL,
});
