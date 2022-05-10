import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';

const { Sider, Content } = Layout;

export default function App() {
    return (
        <Layout id='app'>
            <Header />
            <Layout>
                {/* <Sider>Sider</Sider> */}
                <Aside />
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