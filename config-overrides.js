/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 12:23:15
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-11 10:40:52
 * @Descripttion: create-react-app的webpack配置文件
 */
const path = require('path');
const {
	override,
	addDecoratorsLegacy,
	adjustStyleLoaders,
	addWebpackAlias,
	addLessLoader,
} = require('customize-cra');

process.env.GENERATE_SOURCEMAP = 'false';
process.env.PUBLIC_URL = '/';
process.env.PORT = 5000;

module.exports = override(
	addDecoratorsLegacy(), // 支持装饰器语法
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
		},
	}),
	adjustStyleLoaders(rule => {
		if (rule.test.toString().includes('less')) {
			rule.use.push({
				loader: 'style-resources-loader',
				options: {
					patterns: './src/common.less',
				},
			});
		}
	}),
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src'),
	})
);
