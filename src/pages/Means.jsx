import React, { useEffect, useState } from 'react'
import './less/Means.less'
import { Form, Input, Button, message } from 'antd';
import { UserInfoApi, UserInfoChgApi } from '../request/api';
import { useNavigate } from 'react-router-dom';

export default function Means() {
	const navigate = useNavigate()

	useEffect(() => {
		UserInfoApi().then((res) => {
			if (res.errCode === 0) {
				message.success(res.message)
				sessionStorage.setItem('username', res.data.username)
			}
		})

	}, [])

	const onFinish = (values) => {
		// 如果表单的username有值，且不等于初始化时拿到的username，同时密码非空
		if (values.username && values.username !== sessionStorage.getItem('username') && values.password.trim() !== '') {
			// 表单提交
			UserInfoChgApi({
				username: values.username,
				password: values.password
			}).then((res) => {
				if (res.errCode === 0) {
					message.success(res.message)
					setTimeout(() => {
						// 修改成功时要重新登录
						navigate('/login')
					}, 1000);
				} else {
					message.error(res.message)
				}
			})
		} else {
			message.error('用户名没改或没填写密码！')
		}
	}

	return (
		<div className='means'>
			<Form
				name="basic"
				style={{ width: '500px' }}
				onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="修改用户名："
					name="username"
				>
					<Input placeholder='请输入新用户名' />
				</Form.Item>

				<Form.Item
					label="修 改 密 码："
					name="password"
				>
					<Input.Password placeholder='请输入新密码' />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit" style={{ float: 'right' }}>
						提交
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
