import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import logoImg from './assets/logo.png'

const { Sider, Content } = Layout;

export default function App() {
    return (
        <Layout id='app'>
            <header>
                <img src={logoImg} alt="" className='logo' />
                <div>右边</div>
            </header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>
                    <div>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <footer>Respect | Copyright &copy; 2022 Author 你单排吧</footer>
        </Layout>
    )
}