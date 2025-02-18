import React from 'react';
import {Table,Button} from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const columns = [
    {
      title: 'Временной интервал',
      dataIndex: 'dif_date_time',
      key: 'dif_date_time',
      width: '265px',
      align: "center",
    },
    {
      title: 'Расход сырой воды, FT02.01,м³' ,
      dataIndex: "VOS1_VIN",
      key: "VOS1_VIN",
      width: '130px',
      align: "center",
    },
    {
      title: 'Расход воды в сеть №1, FT04.05/A,м³' ,
      dataIndex: "VOS1_VV1_PROD",
      key: "VOS1_VV1_PROD",
      width: '130px',
      align: "center",
    },
    {
      title: 'Расход воды в сеть №2, FT04.05/B,м³',
      dataIndex: "VOS1_VV2_PROD",
      key: "VOS1_VV2_PROD",
      width: '130px',
      align: "center",
    },
    {
      title: 'Расход промывной воды, FT04.03,м³',
      dataIndex: "VOS1_V_WASHF",
      key: "VOS1_V_WASHF",
      width: '130px',
      align: "center",
    },
    {
      title: 'Расход осадка от гидроциклона №1, FT03.02/A,м³',
      dataIndex: "VOS1_V_SLG_OS1",
      key: "VOS1_V_SLG_OS1",
      width: '130px',
      align: "center",
    },
    {
      title: 'Расход осадка от гидроциклона №2, FT03.02/B',
      dataIndex: "VOS1_V_SLG_OS2",
      key: "VOS1_V_SLG_OS2",
      width: '130px',
      align: "center",
    },
    {
      title: 'Промывная вода в камеры смешивания,м³',
      dataIndex: "VOS1_VGPV_E1",
      key: "VOS1_VGPV_E1",
      width: '130px',
      align: "center",
    },
]


function WaterBalanceTable({isLoading,data,totals}){
    const changeData = (data) => {
      const collections_name = {
        "dif_date_time":"Временной интервал",
        "VOS1_VIN":"Расход сырой воды, FT02.01,м³",
        "VOS1_VV1_PROD":"Расход воды в сеть №1, FT04.05/A,м³",
        "VOS1_VV2_PROD":"Расход воды в сеть №2, FT04.05/B,м³",
        "VOS1_V_WASHF":"Расход промывной воды, FT04.03,м",
        "VOS1_V_SLG_OS1":"Расход осадка от гидроциклона №1, FT03.02/A,м³",
        "VOS1_V_SLG_OS2":"Расход осадка от гидроциклона №2, FT03.02/B",
        "VOS1_VGPV_E1" : "Промывная вода в камеры смешивания,м³",
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

    const exportToExcel = (exportData, exportTotals) => {
      if (!exportData  || !exportTotals) {
          console.error("Ошибка: данные отсутствуют")
          return
      }
      const combinedData = [...changeData(exportData),...changeData(exportTotals)];
      const ws = XLSX.utils.json_to_sheet(combinedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Водный баланс');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'Водный баланс.xlsx');
    };
    const defaultTitle = () => 'Водный баланс системы';
    return (
        <Table
            bordered
            loading = {isLoading}
            columns={columns} 
            dataSource={[...data,...totals]}
            title={defaultTitle}
            pagination={false}
            // scroll={{ x: 'max-content', y: 400 }} // Горизонтальный и вертикальный скролл
            scroll={{ y: 500 }} 
            footer={() => (
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                  <Button onClick={()=>exportToExcel(data,totals)} type="primary">Экспорт в Excel</Button>
                </div>
              )}
        />
    )
}
export default WaterBalanceTable