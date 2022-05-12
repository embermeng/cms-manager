import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Modal, Form, Input, Checkbox } from 'antd';
import moment from 'moment';
import E from 'wangeditor'
import {ArticleAddApi} from '../request/api'

let editor = null

export default function Edit() {
	const [content, setContent] = useState('')
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	// 对话框点击提交
	const handleOk = () => {
		// setIsModalVisible(false) // 关闭对话框
		form
			.validateFields() // 校验字段
			.then((values) => {
				// form.resetFields(); // 重置字段
				let {title, subTitle} = values
				console.log(content);
				// 请求
				ArticleAddApi({
					title,
					subTitle,
					content
				}).then((res) => {
					console.log(res);
				})
			})
			.catch(() => {
				return
			});
	}

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		editor = new E('#div1')
		editor.config.onchange = (newHtml) => {
			setContent(newHtml)
		}
		editor.create()

		// componentWillUnmount
		return () => {
			// 组件销毁时销毁编辑器
			editor.destroy()
		}
	}, [])

	return (
		<div>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title="文章编辑"
				subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
				extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>提交文章</Button>}
			>
			</PageHeader>
			<div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
			<Modal title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} zIndex={99999} okText="提交" cancelText="取消">
				<Form
					form={form}
					name="basic"
					labelCol={{
						span: 3,
					}}
					wrapperCol={{
						span: 21,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="标题"
						name="title"
						rules={[
							{
								required: true,
								message: '请输入标题！',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="副标题"
						name="subTitle"
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}
