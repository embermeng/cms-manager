import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';


export default function App() {
    return (
        <Layout id='app'>
            <Header />
            <div className='container'>
                <Aside />
                <div className='container_box'>
                    <Outlet />
                </div>
            </div>
            <footer>Respect | Copyright &copy; 2022 Author 你单排吧</footer>
        </Layout>
    )
}