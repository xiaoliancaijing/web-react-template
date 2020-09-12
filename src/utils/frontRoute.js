/*
 * @Author: 许凌霄
 * @Date: 2020-07-02 12:14:11
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-07-02 14:33:25
 * @Descripttion: 路由前置守卫
 * @Example: <FrontRoute exact path="路径" auth component={组件} />
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default props => {
	return (
		<Route
			{...props}
			component={null}
			render={() =>
				(props.auth && window.localStorage.getItem('Authorization')) || !props.auth ? (
					<Route {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};
