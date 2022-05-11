import React from 'react'
import { Menu } from 'antd';
import { EditOutlined, ReadOutlined, FormOutlined } from '@ant-design/icons';

export default function Aside() {
    const items = [
        getItem('查看文章列表', 'list', <ReadOutlined />),
        getItem('文章编辑', 'editor', <EditOutlined />),
        getItem('修改资料', 'means', <FormOutlined />),
    ];

    const onClick = (e) => {
        console.log('click ', e.key);
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
                width: 200
            }}
            className="aside"
            theme="dark"
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    )
}
