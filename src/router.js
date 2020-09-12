/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 12:42:56
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-12 16:41:24
 * @Descripttion: 最外层路由表
 */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';

const AppChinese = props => (
	<ConfigProvider locale={zhCN}>
		<App {...props} />
	</ConfigProvider>
);

// 路由切换
export default props => (
	<BrowserRouter>
		<Switch>
			<Route
				exact
				path="/login"
				render={routeProps =>
					window.localStorage.getItem('Authorization') ? (
						<Redirect to="/" />
					) : (
						<Login {...props} {...routeProps} />
					)
				}
			/>
			<Route path="/" component={AppChinese} />
		</Switch>
	</BrowserRouter>
);
