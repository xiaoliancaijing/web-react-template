/*
 * @Author: 刘家辰
 * @Date: 2020-07-10 10:45:48
 * @LastEditTime: 2020-09-02 18:59:35
 * @LastEditors: 许凌霄
 * @Description:
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

// import chalk from 'chalk';
import moment from 'moment';

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0 || !time) {
		return null;
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
	let date;
	if (typeof time === 'object') {
		date = time;
	} else {
		if (typeof time === 'string') {
			if (/^[0-9]+$/.test(time)) {
				// support "1548221490638"
				time = parseInt(time);
			} else {
				// support safari
				// https://stackoverflow.com/questions/4310953/invalid-date-in-safari
				time = time.replace(new RegExp(/-/gm), '/');
			}
		}

		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000;
		}
		date = new Date(time);
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	};
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key];
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value];
		}
		return value.toString().padStart(2, '0');
	});
	return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000;
	} else {
		time = +time;
	}
	const d = new Date(time);
	const now = Date.now();

	const diff = (now - d) / 1000;

	if (diff < 30) {
		return '刚刚';
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前';
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前';
	} else if (diff < 3600 * 24 * 2) {
		return '1天前';
	}
	if (option) {
		return parseTime(time, option);
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		);
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
	const search = url.split('?')[1];
	if (!search) {
		return {};
	}
	return JSON.parse(
		'{"' +
			decodeURIComponent(search)
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"')
				.replace(/\+/g, ' ') +
			'"}'
	);
}

/**
 * @name:
 * @description: 秒数 to [时, 分, 秒]/[分, 秒]
 * @param number 秒数, format
 * @return: 3-[时, 分, 秒] 2-[分, 秒]
 */
export function parseCountDown(countdown, format = 3) {
	if (format === 3) {
		const h = ('0' + Math.floor(countdown / 3600)).slice(-2); // 断言不超过两位
		const m = ('0' + Math.floor((countdown % 3600) / 60)).slice(-2);
		const s = ('0' + Math.floor((countdown % 3600) % 60)).slice(-2);
		return [h, m, s];
	} else {
		const h = Math.floor(countdown / 3600);
		let m = Math.floor((countdown % 3600) / 60);
		const s = ('0' + Math.floor((countdown % 3600) % 60)).slice(-2);
		m = h * 60 + m + '';
		m.length === 1 && (m = '0' + m);
		return [m, s];
	}
}

/**
 * @name:
 * @description: 时长转换 x分 ==> x天x分x秒
 * @param {number} StatusMinute 分钟数
 * @param {string} fmt d,h,m=>精确到天,小时,分钟 不传则精确为分钟
 * @return:
 */

export function timeStamp(StatusMinute, fmt) {
	var day = parseInt(StatusMinute / 60 / 24);
	var hour = parseInt((StatusMinute / 60) % 24);
	var min = parseInt(StatusMinute % 60);
	StatusMinute = '';
	if (day > 0) {
		StatusMinute = day + '天';
		if (fmt === 'd') {
			return StatusMinute;
		}
	}
	if (hour > 0) {
		StatusMinute += hour + '小时';
		if (fmt === 'h') {
			return StatusMinute;
		}
	}
	if (min > 0) {
		StatusMinute += parseFloat(min) + '分钟';
		if (fmt === 'm') {
			return StatusMinute;
		}
	}
	return StatusMinute;
}
/**
 * @name:
 * @description: 时长转换 x秒 ==> xhx''x'''
 * @param {type}
 * @param {string} fmt true改为中文显示 x小时x分钟x秒
 * @return:
 */
export function timeMoment(time, fmt) {
	let h = parseInt(time / 60 / 60);
	let m = parseInt((time / 60) % 60);
	let s = parseInt(time % 60);
	time = '';
	if (h > 0) {
		if (fmt) {
			time = h + '小时';
		} else {
			time = h + 'h';
		}
	}
	if (m > 0) {
		if (fmt) {
			time += m + '分钟';
		} else {
			time += m + "'";
		}
	}
	if (s > 0) {
		if (fmt) {
			// time += parseFloat(s) + '秒';
		} else {
			time += parseFloat(s) + "''";
		}
	}
	return time;
}

/**
 * @name:
 * @description: 时长转换 x秒 ==> x:x:x 自动补充0
 * @param {type}
 * @return:
 */
export function timeMomentFmt(time) {
	let h = parseInt(time / 60 / 60).toString();
	let m = parseInt((time / 60) % 60).toString();
	let s = parseInt(time % 60);
	time = '';
	time = h.padStart(2, '0') + ':';
	time += m.padStart(2, '0') + ':';
	time += parseFloat(s).toString().padStart(2, '0');
	return time;
}

/**
 * @name: 组建月历（周一为一周起始日）
 * @description:
 * @param YYYYMM - 字符串格式，如2020-08（可借助moment().format('YYYY-MM')）
 * @return 月历数组
 */
export function calcMonthData(YYYYMM) {
	const out = [];
	// 1. 当月共多少天, 上月共多少天
	const daysInMonth = moment(YYYYMM).daysInMonth();
	const daysInLastMonth = moment(
		moment(YYYYMM).subtract(1, 'months').format('YYYY-MM')
	).daysInMonth();
	// 2. 组建当月数据
	const today = moment().format('DD');
	for (let i = 1; i <= daysInMonth; i++) {
		const d = `0${i}`.slice(-2);
		const item = {
			y: moment(YYYYMM).format('YYYY'),
			m: moment(YYYYMM).format('MM'),
			d,
		};
		d === today && (item.today = true);
		out.push(item);
	}
	// 3. 处理边界情况
	// 当月1号是周几 1-7
	const firstWeekday = moment(`${YYYYMM}-01`).day() || 7;
	if (firstWeekday > 1) {
		for (let i = 1; i < firstWeekday; i++) {
			out.unshift({
				y: moment(YYYYMM).subtract(1, 'months').format('YYYY'),
				m: moment(YYYYMM).subtract(1, 'months').format('MM'),
				d: `0${daysInLastMonth - i + 1}`.slice(-2),
			});
		}
	}
	// 当月最后一天是周几 1-7
	const lastWeekday = moment(`${YYYYMM}-${daysInMonth}`).day() || 7;
	if (lastWeekday < 7) {
		for (let i = 1; i <= 7 - lastWeekday; i++) {
			out.push({
				y: moment(YYYYMM).add(1, 'months').format('YYYY'),
				m: moment(YYYYMM).add(1, 'months').format('MM'),
				d: `0${i}`.slice(-2),
			});
		}
	}
	return out;
}

/**
 * @name: 组建周历（周一为一周起始日）
 * @description:
 * @param YYYYMM - 字符串格式，如2020-08-25（可借助moment().format('YYYY-MM-DD')）
 * @return 周历数组
 */
export function calcWeekData(YYYYMMDD) {
	const out = [];
	// 参数日期是周几 1-7
	const day = moment(YYYYMMDD).day() || 7;
	for (let i = 1; i <= 7; i++) {
		if (i < day) {
			const temp = moment(YYYYMMDD).subtract(day - i, 'days');
			out.push({
				y: temp.format('YYYY'),
				m: temp.format('MM'),
				d: temp.date() + '',
			});
		} else if (i === day) {
			const temp = moment(YYYYMMDD);
			out.push({
				y: temp.format('YYYY'),
				m: temp.format('MM'),
				d: temp.date() + '',
			});
		} else if (i > day) {
			const temp = moment(YYYYMMDD).add(i - day, 'days');
			out.push({
				y: temp.format('YYYY'),
				m: temp.format('MM'),
				d: temp.date() + '',
			});
		}
	}
	return out;
}
