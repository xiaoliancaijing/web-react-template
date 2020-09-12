/*
 * @Author: 许凌霄
 * @Date: 2020-07-10 16:38:39
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-07-31 12:45:37
 * @Descripttion: 更新拦截，仅在路由变化时候更新
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(
	class extends Component {
		shouldComponentUpdate(nextProps) {
			return nextProps.location.pathname !== this.props.location.pathname;
		}

		render() {
			return <>{this.props.children}</>;
		}
	}
);
