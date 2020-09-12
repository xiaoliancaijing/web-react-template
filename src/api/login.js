/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 15:18:41
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-08-13 11:17:49
 * @Descripttion: 登录相关接口合集
 */
import { getAPI, postAPI } from './net/http';

export const getCode = data => {
	return getAPI(`/adminApi/captcha/${data.phone}`);
};

export const loginByCode = data => {
	return postAPI('/web/user/login/captcha', data);
};

export const getUid = data => {
	return getAPI('/web/user/login/qrCode/generatorUID', data);
};

export const qrLand = data => {
	return getAPI('/web/user/login/qrCode', data);
};

export const logout = data => {
	return postAPI('/web/user/logout');
};
