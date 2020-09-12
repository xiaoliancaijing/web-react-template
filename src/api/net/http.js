/*
 * @Author: wei.chen
 * @Date: 2020-06-29 15:20:43
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-07-07 15:16:12
 * @Descripttion:
 */

import httpInterceptors from './httpInterceptors';
// import { message } from "antd";

/**
 * 公用get请求
 * @param url       接口地址
 * @param headers   接口所需header配置
 */
export const getAPI = async (url, data = {}, config) => {
	// debugger
	for (let key in data) {
		if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
			url += url.indexOf('?') === -1 ? '?' : '&'; //判断url中是否有'?'
			url += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]); //拼接
		}
	}
	return await httpInterceptors.get(url, config);
};
/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param headers   接口所需header配置
 */
export const postAPI = (url, data, config) => {
	return httpInterceptors.post(url, data, config);
};

/**
 * 公用 put 请求
 * @param url       接口地址
 * @param data      接口参数
 * @param headers   接口所需header配置
 */
export const putAPI = (url, data, config) => {
	return httpInterceptors.put(url, data, config);
};

/**
 * 公用 delete 请求
 * @param url       接口地址
 * @param data      接口参数
 * @param headers   接口所需header配置
 */
export const deleteAPI = (url, data, config) => {
	return httpInterceptors.delete(url, data, config);
};
