import React, { useState, useEffect } from 'react'
import { Table, Button, Space } from 'antd';
import "./less/ListTable.less"
import { Link } from 'react-router-dom';
import { ArticleListApi } from '../request/api';

// 使用表格做list
export default function ListTable() {
    // 表格数据
    const [tableData, setTableData] = useState([
        {
            key: '1',
            title: 'John Brown',
            subTitle: 'asd',
            date: '32',
        }
    ])

    // 请求文章列表
    useEffect(() => {
        ArticleListApi().then((res) => {
            if (res.errCode === 0) {
                console.log(res.data.arr);
                let newData = JSON.parse(JSON.stringify(res.data.arr))
                /* 
                    1. 要给每个数组项加key，让key=id
                    2. 需要有一套标签结构，赋予给一个属性（或者把title和subTitle整到一个对象里）
                */
                newData.forEach((item) => {
                    item.key = item.id
                    item.titleData = [
                        item.title,
                        item.subTitle
                    ]
                })
                console.log('处理后的数据', newData);
                setTableData(newData)
            }
        })
    }, [])

    // 每一列
    const columns = [
        {
            dataIndex: 'titleData',
            key: 'titleData',
            render: titles => (
                <>
                    <Link className='table_title' to={'/'}>{titles[0]}</Link>
                    <p style={{ color: '#999' }}>{titles[1]}</p>
                </>
            ),
            width: '70%'
        },
        {
            dataIndex: 'date',
            key: 'date',
        },
        {
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="primary">编辑</Button>
                    <Button type="primary" danger>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='list_table'>
            <Table columns={columns} dataSource={tableData} showHeader={false} />
        </div>
    )
}



