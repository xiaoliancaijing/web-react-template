/* * Descripttion:网络模块整体封装,
 * Author: chenwei
 * Date: 2019-11-13 18:34:52
 * Last Modified by: 许凌霄
 * Last Modified time: 2019-11-13 18:34:52
 */

import axios from 'axios';
import { message } from 'antd';
import { logout } from '@/utils/session';
// import loadingInstance from '@/components/loading/loading';

const service = axios.create({
	baseURL: process.env.REACT_APP_API_URL, // api的base_url
	timeout: process.env.REACT_APP_API_TiMEOUT, // 请求超时时间
	headers: {
		Platform: 'WEB',
		ContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
	},
	// withCredentials: true, // 允许携带cookie
});

function openLoading() {
	// 暂不开启
	// loadingInstance.open();
}

function closeLoading() {
	// 暂不开启
	// loadingInstance.close();
}

// request拦截
service.interceptors.request.use(
	config => {
		// TODO 后面优化写道  store 里
		// if(cookie){
		//   config.headers.Authorization = isAuthenticated() || "";
		// }

		// if (typeof window !== 'undefined') {
		const Authorization = window.localStorage.getItem('Authorization');
		// }

		if (Authorization) {
			config.headers.Authorization = Authorization;
		}
		openLoading();
		return config;
	},
	error => {
		closeLoading();
		// Do something with request error
		Promise.reject(error);
	}
);

// respone拦截器
service.interceptors.response.use(
	response => {
		closeLoading();
		if (response.data && response.data.code === 0) {
			message.error(response.data.message, 3);
		} else if (response.data && response.data.code === 402) {
			// Token 无效
			logout();
			setTimeout(() => {
				window.location.reload();
			}, 2000);
			message.info('登录状态失效，请重新登录', 3);
		} else if (response.data && response.data.code === 401) {
			logout();
			setTimeout(() => {
				window.location.reload();
			}, 2000);
			message.info('请先登录', 3);
		} else if (response.data && response.data.code !== 200) {
			message.error(response.data.msg || '未知错误');
		}
		return response.data;
	},
	error => {
		if ((error + '').indexOf('timeout of') > -1) {
			message.error('网络超时');
		}
		if ((error + '').indexOf('Network Error') > -1) {
			message.error('网络错误, 请稍后重试');
		}
		closeLoading();
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.desc = '请求错误';
					break;
				case 401:
					error.desc = '未授权，请登录';
					break;
				case 403:
					error.desc = '拒绝访问';
					break;
				case 404:
					error.desc = `请求地址出错: ${error.response.config.url}`;
					break;
				case 408:
					error.desc = '请求超时';
					break;
				case 500:
					error.desc = '服务器内部错误';
					break;
				case 501:
					error.desc = '服务未实现';
					break;
				case 502:
					error.desc = '网关错误';
					break;
				case 503:
					error.desc = '服务不可用';
					break;
				case 504:
					error.desc = '网关超时';
					break;
				case 505:
					error.desc = 'HTTP版本不受支持';
					break;
				default:
					error.desc = '未知错误';
					break;
			}
			message.error(error.desc);
		}
		return Promise.reject(error);
	}
);

export default service;
