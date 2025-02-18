import React from 'react';
import {Table} from 'antd';

const columns = [
    {
        title: 'Событие',
        dataIndex: 'name',
        key: '',
        width: '120px',
        align: "center",
    },
    {
        title: 'Временной интервал',
        dataIndex: "range",
        key: "range",
        width: '260px',
        align: "center",
    },
    {
        title: 'Объект',
        dataIndex: "area",
        key: "area",
        width: '120px',
        align: "center",
    },
    {
        title: 'Продолжительность',
        dataIndex: "duration",
        key: "duration",
        width: '120px',
        align: "center",
    }, 
]


function ReliabilityTable({isLoading,data}){    
    const defaultTitle = () => 'Показатели надежности';
    return (
        <Table
            bordered
            loading = {isLoading}
            columns={columns} 
            dataSource={data}
            title={defaultTitle}
            pagination={false}
            scroll={{ y: 500 }} // Высота для вертикального скролла
            footer={() => (
                <div>
                </div>
              )}
        />
    )
}
export default ReliabilityTable