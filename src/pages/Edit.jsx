import React from 'react'
import { PageHeader, Button } from 'antd';
import moment from 'moment';

export default function Edit() {
	return (
		<div>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title="文章编辑"
				subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
				extra={<Button key="1" type="primary">提交文章</Button>}
			>
			</PageHeader>
		</div>
	)
}
