/*
 * @Author: 许凌霄
 * @Date: 2020-06-23 12:49:30
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-12 16:49:54
 * @Descripttion:
 */
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { loginByCode, getCode, getUid, qrLand } from '@/api/login';
import { Input, Button, message, Form, Checkbox } from 'antd';
import IconFont from '@/components/iconfont';
import QRCode from 'qrcode.react';
import { MobXProviderContext } from 'mobx-react';

const COUNTDOWNTIME = 10;

export default props => {
	const [loginType, setLoginType] = useState(1); // 1-用户名密码登录   2-扫码登录
	const { LoginStore } = React.useContext(MobXProviderContext);

	async function onFinish(value) {
		if (!value.remember) {
			message.error('请阅读协议后勾选同意');
			return;
		}
		const res = await loginByCode(value);
		if (res.code === 200) {
			LoginStore.setUserInfo(res.data.user);
			LoginStore.setAuthorization(res.data.token);
			const redirect = props.location.search.slice(1).split('=')[1];
			if (redirect) {
				props.history.push(window.decodeURIComponent(redirect));
			} else {
				props.history.push('/');
			}
		}
	}

	const timer = useRef(null);
	useEffect(() => {
		return () => {
			clearInterval(timer.current);
		};
	}, []);
	const pause = useRef(false); // 防止重复点击
	const [countdownData, setCountdownData] = useState({ flag: false, time: COUNTDOWNTIME + 1 }); // 是否倒计时中
	const [form] = Form.useForm();
	async function getVerificationCode() {
		const phone = form.getFieldValue('phone');
		if (pause.current) {
			return;
		}
		pause.current = true;
		if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)) {
			form.validateFields(['phone']); // 为出现校验失败的效果，主要用于未输入手机号直接点击获取验证码的情况
			pause.current = false;
		} else {
			setCountdownData({ flag: true, time: COUNTDOWNTIME + 1 });
			const res = await getCode({ phone });
			pause.current = false;
			if (res.code === 200) {
				setCountdownData({ flag: true, time: COUNTDOWNTIME });
				let time = COUNTDOWNTIME;
				timer.current = setInterval(() => {
					if (time > 0) {
						setCountdownData(prev => {
							time = prev.time - 1;
							return { flag: true, time };
						});
					} else {
						setCountdownData({ flag: false, time: COUNTDOWNTIME + 1 });
						clearInterval(timer.current);
					}
				}, 1000);
			} else {
				message.error(res.msg);
				setCountdownData({ flag: false, time: COUNTDOWNTIME + 1 });
			}
		}
	}

	const timer1 = useRef(null); // 启动heartbeat的setTimeout的返回ID
	const timer2 = useRef(null); // heartbeat中的setInterval的返回ID
	useEffect(() => {
		return () => {
			clearInterval(timer1.current);
			clearInterval(timer2.current);
		};
	}, []);
	const [qrData, setQrData] = useState({ overdue: false, url: '' });
	const uid = useRef(null);
	async function getNewCode() {
		function heartbeat() {
			timer2.current = setInterval(async () => {
				const res = await qrLand({ uid: uid.current });
				if (res.code === 200 && res.data) {
					LoginStore.setUserInfo(res.data.user);
					LoginStore.setAuthorization(res.data.token);
					clearInterval(timer2.current);
					const redirect = props.location.search.slice(1).split('=')[1];
					if (redirect) {
						props.history.push(window.decodeURIComponent(redirect));
					} else {
						props.history.push('/');
					}
				} else if (res.code === 4041) {
					// 二维码失效
					clearInterval(timer2.current);
					setQrData({ overdue: true, url: '' });
				}
			}, 1000);
		}

		const res = await getUid();
		if (res.code === 200) {
			uid.current = res.data;
			setQrData({ overdue: false, url: JSON.stringify({ type: 'login', value: res.data }) });
			timer1.current = setTimeout(() => {
				heartbeat();
			}, 4000);
		} else {
			message.error(res.msg);
		}
	}

	return (
		<div className="login">
			<div className="main">
				<img className="lf" src={require('@/assets/imgs/login-bg.png')} alt="" />
				<div className="login_center">
					{loginType === 1 ? (
						<div className="content">
							<img
								onClick={() => {
									setLoginType(2);
									getNewCode();
								}}
								className="qrcodeImg"
								src={require('@/assets/imgs/logo-qrcode.png')}
								alt=""
							/>
							<img
								className="logo"
								src={require('@/assets/imgs/login-logo.png')}
								alt=""
							/>
							<Form
								layout="horizontal"
								onFinish={onFinish}
								form={form}
								initialValues={{
									remember: true,
								}}
							>
								<Form.Item
									name="phone"
									validateFirst={true}
									rules={[
										{
											required: true,
											message: '请输入手机号!',
										},
										{
											pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
											message: '请输入正确的手机号',
										},
									]}
									validateTrigger="onBlur"
								>
									<Input
										maxLength={11}
										size="large"
										prefix={<IconFont className="icons" type="iconyonghu" />}
										placeholder="请输入手机号"
										autoComplete="off"
									/>
								</Form.Item>
								<Form.Item
									name="code"
									rules={[
										{
											required: true,
											message: '请输入验证码!',
										},
									]}
								>
									<div>
										<Input
											maxLength={6}
											size="large"
											prefix={<IconFont className="icons" type="iconmima" />}
											placeholder="请输入验证码"
										/>
										{countdownData.time <= COUNTDOWNTIME ? (
											<span className="codeBtn">
												{countdownData.time}秒后重发
											</span>
										) : (
											<span
												onClick={getVerificationCode}
												className="codeBtn"
												style={{ opacity: !countdownData.flag ? 1 : 0.5 }}
											>
												获取验证码
											</span>
										)}
									</div>
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										size="medium"
										htmlType="submit"
										style={{ width: '100%', height: 40 }}
									>
										登录
									</Button>
								</Form.Item>
								<Form.Item
									name="remember"
									valuePropName="checked"
									style={{ textAlign: 'center' }}
								>
									<Checkbox className="checked">
										<span className="agreement">登录即同意</span>
										<span className="agreement primary">
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={'https://www.baidu.com'}
											>
												《xxx协议》
											</a>
										</span>
									</Checkbox>
								</Form.Item>
							</Form>
						</div>
					) : (
						<>
							<div className="phoneCode">
								<p
									onClick={() => {
										setLoginType(1);
										clearTimeout(timer1.current);
										clearTimeout(timer2.current);
									}}
								>
									<span>
										<IconFont type="iconicon_fh" />
									</span>
									验证码登陆
								</p>
							</div>
							<div className="code_box">
								{qrData.overdue && (
									<div className="overdue">
										<p className="text">二维码失效</p>
										<Button onClick={getNewCode} className="refresh">
											刷新
										</Button>
									</div>
								)}
								<QRCode
									value={qrData.url} //value参数为生成二维码的链接
									size={220} //二维码的宽高尺寸
									fgColor="#000000" //二维码的颜色
									className={qrData.overdue ? 'overdued' : ''}
								/>
							</div>
							<div className="holderText">- 请打开「昱之贤网校APP」扫码登录 -</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
