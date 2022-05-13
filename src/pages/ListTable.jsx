import React, { useState, useEffect } from 'react'
import { Table, Button, Space, message } from 'antd';
import "./less/ListTable.less"
import moment from 'moment';
import { ArticleListApi, ArticleDelApi } from '../request/api';
import { useNavigate } from 'react-router-dom';

// 使用表格做list
export default function ListTable() {
    // 表格数据
    const [tableData, setTableData] = useState([
        {
            key: '1',
            title: 'John Brown',
            subTitle: 'asd',
            date: '32',
            titleData: ['John Brown', 'asd']
        }
    ])
    // 分页配置
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 10 })
    const navigate = useNavigate()

    // 提取请求的代码
    const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize
        }).then((res) => {
            if (res.errCode === 0) {
                // 更改pagination
                let { num, count, total } = res.data
                setPagination({
                    current: num,
                    pageSize: count,
                    total
                })
                let newData = JSON.parse(JSON.stringify(res.data.arr))
                /* 
                    1. 要给每个数组项加key，让key=id
                    2. 需要有一套标签结构，赋予给一个属性（或者把title和subTitle整到一个数组里）（又或者去掉colums中某个列的dataIndex属性，这样那个列拿到的数据就是完整的）
                */
                newData.forEach((item) => {
                    item.key = item.id
                    item.date = moment(item.date).format('YYYY-MM-DD hh:mm:ss')
                })
                // newData = [...newData, ...newData, ...newData]
                setTableData(newData)
            }
        })
    }


    // 请求文章列表
    useEffect(() => {
        getArticleList(pagination.current, pagination.pageSize)
    }, [])

    // 分页的函数
    const pageChange = (arg) => {
        console.log(arg);
        getArticleList(arg.current, arg.pageSize)
    }

    // 删除文章请求
    const delList = (id) => {
        ArticleDelApi({
            id
        }).then((res) => {
            if (res.errCode === 0) {
                message.success(res.message)
                // 重新请求数据或者重新刷页面或增加变量的监测
                getArticleList(1, pagination.pageSize)
            } else {
                message.error(res.message)
            }
        })
    }

    // 每一列
    const columns = [
        {
            key: 'titleData',
            render: datas => {
                return (
                    <>
                        <a className='table_title' href={'http://codesohigh.com:8765/article/' + datas.id} target="_blank">{datas.title}</a>
                        <p style={{ color: '#999' }}>{datas.subTitle}</p>
                    </>
                )
            },
            width: '70%'
        },
        {
            dataIndex: 'date',
            key: 'date',
        },
        {
            key: 'action',
            render: (item) => {
                return (
                    <Space size="middle">
                        <Button type="primary" onClick={() => navigate('/edit/' + item.id)}>编辑</Button>
                        <Button type="primary" onClick={() => delList(item.id)} danger>删除</Button>
                    </Space>
                )
            },
        },
    ];

    return (
        <div className='list_table'>
            <Table
                columns={columns}
                dataSource={tableData}
                showHeader={false}
                onChange={pageChange}
                pagination={pagination}
            />
        </div>
    )
}



