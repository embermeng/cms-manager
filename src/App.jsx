import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';

export default function App() {
    const [myKey, setMyKey] = useState(1)
    return (
        <Layout id='app'>
            <Header />
            <div className='container'>
                <Aside />
                <div className='container_box'>
                    <Bread />
                    <div className="container_content">
                        <Outlet />
                    </div>

                </div>
            </div>
            <footer>Respect | Copyright &copy; 2022 Author 你单排吧</footer>
        </Layout>
    )
}