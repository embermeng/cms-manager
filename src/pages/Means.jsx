import React, { useEffect, useState } from 'react'
import './less/Means.less'
import { Form, Input, Button, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UserInfoApi, UserInfoChgApi } from '../request/api';
import { useNavigate } from 'react-router-dom';

// 将图片路径转base64
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

// 限制图片大小，只能是200KB
function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
	if (!isLt2M) {
		message.error('请上传小于200KB的图!');
	}
	return isJpgOrPng && isLt2M;
}

export default function Means(props) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState('')

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

	// 点击了上传图片
	const handleChange = info => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			console.log(info);
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl => {
				setLoading(false)
				setImageUrl(imageUrl)
				// 存储图片名称
				localStorage.setItem('avatar', info.file.name)
				// 触发Header组件更新
				props.setMyKey(props.myKey++)
			});
		}
	};

	// 上传按钮
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

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
			<p>点击下方修改头像：</p>
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action="/api/upload"
				beforeUpload={beforeUpload}
				onChange={handleChange}
				headers={{'cms-token': localStorage.getItem('cms-token')}}
			>
				{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
		</div>
	)
}
