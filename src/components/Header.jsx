import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png'
import defaultAvatar from '../assets/face.jpeg'
import { Menu, Dropdown, Space, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

export default function Header() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [userName, setUserName] = useState("游客")

    // 模拟componentDidMount
    useEffect(() => {
        let userName1 = localStorage.getItem("username")
        let avatar1 = localStorage.getItem("avatar")
        if (userName1) {
            setUserName(userName1)
        }
        if (avatar1) {
            setAvatar("http://47.93.114.103:6688/" + avatar1)
        }
    })

    // 退出登录
    const logout = () => {
        // 清除localStorage中的数据
        localStorage.clear()
        message.success("退出成功，即将返回登录页")
        setTimeout(() => navigate('/login'), 1500);
    }

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            修改资料
                        </a>
                    ),
                },
                {
                    type: 'divider',
                },
                {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                            退出登录
                        </a>
                    ),
                },
            ]}
        />
    );

    return (
        <header>
            <img src={logoImg} alt="" className='logo' />
            <div className='right'>
                <Dropdown overlay={menu}>
                    <a className='userName' onClick={e => e.preventDefault()}>
                        <img src={avatar} className="avatar" alt="" />
                        <Space>
                            <span>{userName}</span>
                            <CaretDownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
