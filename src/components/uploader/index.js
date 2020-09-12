/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 12:47:57
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-12 16:36:23
 * @Descripttion: 上传组件
 */
import React, { useState, useEffect, useRef } from 'react';
import { getUploadToken } from '@/api/common';
import { Upload } from 'antd';

const QINIUEXPIRES = 7 * 60 * 1000; // qiniuToken有效期，默认7分钟

export default props => {
	const [state, setState] = useState(null);
	useEffect(() => {
		setState({ ...props, action: '//up-z2.qiniup.com' });
	}, [props]);

	const [qiniuToken, setQiniuToken] = useState('');
	const timer = useRef(null);
	useEffect(() => {
		async function _getUploadToken() {
			const res = await getUploadToken();
			if (res.code === 200) {
				setQiniuToken(res.data.uptoken);
				timer.current = setTimeout(() => {
					_getUploadToken();
				}, QINIUEXPIRES);
			}
		}
		_getUploadToken();
		return () => {
			clearTimeout(timer.current);
		};
	}, []);
	return (
		<>
			{state && (
				<Upload {...state} data={{ token: qiniuToken }}>
					{props.children}
				</Upload>
			)}
		</>
	);
};
