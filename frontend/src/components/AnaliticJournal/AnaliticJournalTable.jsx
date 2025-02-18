import React from 'react';
import {Table,Button} from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const columns = [
    {
      title: 'Дата/Время записи',
      dataIndex: 'recdt',
      key: 'recdt',
      width: '130px',
      align: "center",
      sorter: (a,b) => (new Date(a.recdt).getTime()-new Date(b.recdt).getTime()),  
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Локация',
      dataIndex: "location",
      key: "location",
      width: '120px',
      align: "center",
      filters: [
        {
          text: 'Исходная вода',
          value: 'Исходная вода',
        },
        {
          text: 'Второй подъем',
          value: 'Второй подъем',
        },
      ],
      onFilter: (value, record) => record.location.indexOf(value) === 0,
    },
    {
      title: 'Температура,град.С',
      dataIndex: "temperature",
      key: "temperature",
      width: '120px',
      align: "center",
    },
    {
      title: 'Водородный показатель,ед.pH',
      dataIndex: "ph",
      key: "ph",
      width: '120px',
      align: "center",
    },
    {
      title: 'Цветность,град.ХКШ',
      dataIndex: "color",
      key: "color",
      width: '120px',
      align: "center",
    },
    {
      title: 'Ост.Хлор,мг/дм³',
      dataIndex: "chlorine",
      key: "chlorine",
      width: '110px',
      align: "center",
      render: (text) => text ? text : "-"
    },
    {
      title: 'Ост.Алюминий,мг/дм³',
      dataIndex: "aluminum",
      key: "aluminum",
      width: '120px',
      align: "center",
    },
    {
      title: 'Мутность,мг/дм³',
      dataIndex: "turbidity",
      key: "turbidity",
      width: '110px',
      align: "center",
    },
    {
      title: 'Хлориды',
      dataIndex: "chlorides",
      key: "chlorides",
      width: '110px',
      align: "center",
    },
    {
      title: 'Лаборант',
      dataIndex: "username",
      key: "username",
      width: '160px',
      align: "center",
    }
]


function AnaliticJournalTable({isLoading,data}){
    const changeData = (data) => {
      const collections_name = {
        "recdt":"Дата/Время записи",
        "location":"Локация",
        "temperature":"Температура,град.С",
        "ph":"Водородный показатель,ед.pH",
        "color":"Цветность,град.ХКШ",
        "chlorine":"Ост.Хлор,мг/дм³",
        "aluminum":"Ост.Алюминий,мг/дм³",
        "turbidity" : "Мутность,мг/дм³",
        "chlorides" : "Хлориды",
        "username" : "Лаборант",
      }
      let change_data = data.map((obj)=>{
        delete obj.key
        let item_object = {};
        for (let item of Object.entries(obj)){
          item_object[collections_name[item[0]]]=item[1];
        }
        return item_object;
      });
      return change_data
    }
    const exportToExcel = (exportData) => {
          if (!exportData) {
              console.error("Ошибка: данные отсутствуют")
              return
          }
          const ws = XLSX.utils.json_to_sheet(changeData(exportData));
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Журнал аналитического контроля');
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
          saveAs(data, 'Журнал аналитического контроля.xlsx');
    };



    const defaultTitle = () => 'Журнал аналитического контроля';
    return (
        <Table
            bordered
            loading = {isLoading}
            columns={columns} 
            dataSource={data}
            title={defaultTitle}
            pagination={false}
            scroll={{ y: 400 }} // Высота для вертикального скролла
            footer={() => (
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button onClick={()=>exportToExcel(data)} type="primary">Экспорт в Excel</Button>
              </div>
              )}
        />
    )
}
export default AnaliticJournalTable