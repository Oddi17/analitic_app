import React from 'react';
import {Table,Button} from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const columns = [
    {
        title: 'Временной интервал',
        dataIndex: 'dif_date_time',
        key: 'dif_date_time',
        width: '200px',
        align: "center",
    },
    {
        title: 'Объем потребления сырой воды,м³',
        dataIndex: "VOS1_VIN",
        key: "VOS1_VIN",
        width: '100px',
        align: "center",
    },
    {
        title: 'Расход реагента,м³ (P-08.01 A/B/C)',
        dataIndex: "VOS1_V_FLOK_SUM",
        key: "VOS1_V_FLOK_SUM",
        width: '140px',
        align: "center",
    },
    {
        title: 'Удельное значение,кг/тм³',
        dataIndex: "Udel",
        key: "Udel",
        width: '125px',
        align: "center",
    },
    
]

function ChemistryTable({isLoading,data,otherData}){  
    const ChangeObject = (targetobj) => {
        const collections_name = {
            "VOS1_V_KOAG_SUM":"Расход сернокислого алюминия",
            "VOS1_V_GHN_SUM":"Расход гипохлорита натрия",
        }
        let new_array = []
        for (let key in targetobj) {
            let change_object = {
                "Объем потребления сырой воды,м³": targetobj[key].volume,
                "Расход реагента,м³": targetobj[key].consumption,
                "Удельное значение кг/тм³": targetobj[key].res_value,
                "Имя" : collections_name[key]
            }
            new_array.push(change_object) 
        }   
        return new_array
    }
    
    const changeData = (data) => {
        const collections_name = {
          "dif_date_time":"Временной интервал",
          "VOS1_VIN":"Расход сырой воды, FT02.01,м³",
          "VOS1_V_FLOK_SUM":"Расход реагента,м³ (P-08.01 A/B/C)",
          "Udel":"Удельное значение,кг/тм³",
        }
        let change_data = data.map((obj)=>{
          delete obj.key
          let item_object = {};
          for (let item of Object.entries(obj)){
            item_object[collections_name[item[0]]]=item[1];
          }
          item_object["Флокулянт"] = "" //????????????????????????????????????????
          return item_object;
        });
        return change_data
      }  

    const exportToExcel = (exportData,exportObjects) => {
        if (!exportData || !exportObjects) {
            console.error("Ошибка: данные отсутствуют")
            return
        }
        const data1 = changeData(exportData);
        const data2 = ChangeObject(exportObjects)
        const ws = XLSX.utils.json_to_sheet(data1);
        const startRow = data1.length + 3;
        XLSX.utils.sheet_add_json(ws,data2,{origin:`A${startRow+1}`});
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Расход химических реагентов');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Расход химических реагентов.xlsx');
    };


    const defaultTitle = () => 'Расход флокулянта';
    return (
        <Table className='chemistry-flok'
            bordered
            loading = {isLoading}
            columns={columns} 
            dataSource={data}
            title={defaultTitle}
            pagination={false}
            scroll={{ y: 500 }} 
            footer={() => (
                 <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button onClick={()=>exportToExcel(data,otherData)} type="primary">Экспорт в Excel</Button>
                </div>
              )}
        />
    )
}
export default ChemistryTable