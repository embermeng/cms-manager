import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export default function Aside() {
    const items = [
        getItem('查看文章列表', 'sub1', <MailOutlined />),
        getItem('文章编辑', 'sub2', <AppstoreOutlined />),
        getItem('修改资料', 'sub3', <SettingOutlined />),
    ];

    const onClick = (e) => {
        console.log('click ', e);
    };

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 200,
                height: "100vh"
            }}
            theme="dark"
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    )
}
