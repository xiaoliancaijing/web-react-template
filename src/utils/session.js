const LOGIN_COOKIE_NAME = 'Authorization';
// import { inject, observer } from 'mobx-react'
// 获取 token
function isAuthenticated() {
	return _getCookie(LOGIN_COOKIE_NAME);
}

// 设置 token
function authenticateSuccess(token) {
	_setCookie(LOGIN_COOKIE_NAME, token);
}

// 退出登录

// const  mobxLogOut= inject("LoginStore")( () =>{
//   console.log("========================");
//     this.LoginStore.refreshUserInfo();
// });

function logout() {
	if (window !== undefined) {
		window.localStorage.removeItem('userInfo');
		window.localStorage.removeItem('Authorization');

		_setCookie(LOGIN_COOKIE_NAME, '', -1);
		_setCookie('signFlag', '', -1);
	}
}

// 获取用户信息
function getUserInfo() {
	let _userInfo = {};
	if (typeof window !== 'undefined') {
		_userInfo = JSON.parse(localStorage.getItem('userInfo') || null);
	}

	return _userInfo;
}

// 修改用户信息
function setUserInfo(data) {
	if (data) {
		localStorage.setItem('userInfo', JSON.stringify(data));
	} else {
		localStorage.removeItem('userInfo');
	}
}

function _getCookie(name) {
	try {
		if (document) {
			var nameEQ = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}
	} catch (error) {
		return null;
	}
}

function getCookieItemByStr(cookieStr, key) {
	try {
		if (cookieStr) {
			let nameEQ = key + '=';
			let ca = cookieStr.split(';');
			for (let i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			return '';
		}
	} catch (error) {
		return '';
	}
}

/**
 * @description: 检查今天是否签到 可以通过传入fun接口 可以手动修改 并设置cookie
 * @param {fun} fun  传入签到接口函数 传入null 则需要传入data值来手动修改
 * @param {fun} data 手动修改值
 * @return: none
 */
function setSign(fun, data) {
	if (!isAuthenticated()) {
		return false;
	}
	let date = new Date();
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setTime(Math.floor(date.getTime() / 1000) * 1000);
	let endtime = date; //今天截至时间==>用来已签到保存的时间
	let nowtime = Math.floor(new Date().getTime() / 1000) * 1000; //用户当前打开网站的时间==>用来检测是否签到状态是否过期
	let signtime = JSON.parse(_getCookie('signFlag')); //cookie现存的签到时间==>用来检测是否签到状态是否过期
	if (signtime < nowtime || signtime === undefined) {
		if (fun) {
			fun().then(res => {
				if (res.success) {
					document.cookie = `signFlag=${res.data};expires=${endtime}`;
					return res.data;
				}
			});
		} else {
			document.cookie = `signFlag=${data};expires=${endtime}`;
		}
	}
}
/**
 * @description: 获取签到状态
 * @param {type}
 * @return: true/false
 */
function getSigncookie() {
	return JSON.parse(_getCookie('signFlag'));
}

/**
 * cookie 设置
 *
 * @param {*} name
 * @param {*} value
 * @param {number} [days=30]  默认是 30 天
 */
function _setCookie(name, value, days = 30) {
	var date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	var expires = '; expires=' + date.toGMTString();
	document.cookie = name + '=' + value + expires + '; path=/';
}

export {
	logout,
	isAuthenticated,
	authenticateSuccess,
	getUserInfo,
	setUserInfo,
	setSign,
	getSigncookie,
	_getCookie,
	getCookieItemByStr,
};
