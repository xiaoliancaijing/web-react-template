/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 12:47:57
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-12 16:36:30
 * @Descripttion:
 */
import React from 'react';
import './index.less';
import Uploader from '@/components/uploader';

export default () => {
	return (
		<div className="home">
			<h1>
				主体主体主体主体主体主体主体主体主体主体主体主体主体主体主体主体主体主体主体主体
				主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体主体
				主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体
				主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体
				主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体
				主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体
				主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体 主体
			</h1>
			<Uploader
				name="file"
				onChange={info => {
					if (info.file.status === 'done') {
						console.log(info.file.response);
					}
				}}
			>
				<button>上传</button>
			</Uploader>
		</div>
	);
};
