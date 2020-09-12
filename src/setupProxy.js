/*
 * @Author: 许凌霄
 * @Date: 2020-08-13 16:48:04
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-11 14:50:28
 * @Descripttion:
 */
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		proxy('/api', {
			target: 'http://127.0.0.1:3001/jdg',
			pathRewrite: {
				'^/api': '',
			},
		}),
		proxy('/bpi', {
			target: 'http://127.0.0.1:3002',
			changeOrigin: true, // 默认为false，暂未发现切换true/false有何区别
			pathRewrite: {
				'^/bpi': '',
			},
		})
	);
};
