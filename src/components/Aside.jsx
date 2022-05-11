import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { EditOutlined, ReadOutlined, FormOutlined } from '@ant-design/icons';

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')
    // 一般加个空数组是为了模仿componentDidMount
    useEffect(() => {
        let key = location.pathname.replaceAll('/', '')
        setDefaultKey(key)
    }, [])
    
    const items = [
        getItem('查看文章列表', 'list', <ReadOutlined />),
        getItem('文章编辑', 'edit', <EditOutlined />),
        getItem('修改资料', 'means', <FormOutlined />),
    ];

    const onClick = (e) => {
        console.log('/' + e.key);
        navigate(`/${e.key}`)
        setDefaultKey(e.key)
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
            defaultSelectedKeys={['list']}
            selectedKeys={[defaultKey]}
            defaultOpenKeys={['list']}
            openKeys={['list']}
            mode="inline"
            items={items}
        />
    )
}
