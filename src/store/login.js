/*
 * @Author: wei.chen
 * @Date: 2020-07-03 10:53:04
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-07-07 15:15:51
 * @Descripttion:
 */
import { action, observable } from 'mobx';
import { logout, authenticateSuccess } from '@/utils/session';

export default class LoginStore {
	@observable userInfo = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
	@observable authorization = window.localStorage.getItem('Authorization') || '';

	@action setUserInfo = data => {
		if (data) {
			this.userInfo = data;
			window.localStorage.setItem('userInfo', JSON.stringify(data));
		} else {
			this.userInfo = {};
			window.localStorage.removeItem('userInfo');
		}
	};

	@action setAuthorization = data => {
		if (data) {
			this.authorization = data;
			authenticateSuccess(data);
			window.localStorage.setItem('Authorization', data);
		} else {
			this.authorization = null;
			logout();
			window.localStorage.removeItem('Authorization');
		}
	};
}
