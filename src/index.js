/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 11:40:38
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-12 16:42:43
 * @Descripttion:
 */
// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './store';
import Router from './router';
import 'moment/locale/zh-cn';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

ReactDOM.render(
	<Provider {...store}>
		<Router />
	</Provider>,
	document.getElementById('root')
);
