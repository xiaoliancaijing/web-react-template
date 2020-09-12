/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 11:40:38
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-10 17:13:02
 * @Descripttion: 入口
 */

import React from 'react';
import './App.less';
import { Switch, Route } from 'react-router-dom';
import { Button } from 'antd';
import WrappedRoute from '@/components/wrappedRoute';
const Home = React.lazy(() => import('@/pages/home'));
const Error = React.lazy(() => import('@/pages/error')); // 404

export default props => {
	return (
		<div className="App">
			<header className="abc">
				头部区域
				{!window.localStorage.Authorization && (
					<Button
						type="primary"
						size="small"
						className="rf"
						onClick={() => props.history.push('/login')}
					>
						前往登录
					</Button>
				)}
			</header>
			<div className="main">
				<WrappedRoute>
					<React.Suspense fallback={<div>loading.....</div>}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route component={Error} />
						</Switch>
					</React.Suspense>
				</WrappedRoute>
			</div>
			<footer className="footer">尾部</footer>
		</div>
	);
};
