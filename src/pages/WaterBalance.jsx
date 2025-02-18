import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WaterBalanceForm from '../components/WaterBalance/WaterBalanceForm';
import WaterBalanceTable from "../components/WaterBalance/WaterBalanceTable";
import { message } from 'antd';
import { AuthContext } from "../components/AuthContext";

export default function WaterBalance() {
    const [tableData, setTableData] = useState([])
    const [totals, setTotals] = useState([])
    const [isLoading,setIsLoading] = useState()
    const navigate = useNavigate();
    const { setIsAuth } = useContext(AuthContext);

    const handleGetData = (start_time,end_time,sample) => {
        getData(start_time,end_time,sample)
    }

    const getData = (start_time,end_time,sample) => {
        setIsLoading(true);
            const url = `http://10.50.50.2/api/report/waterbalance?start_time=${start_time}&end_time=${end_time}&sample=${sample}`
            axios.get(url,{withCredentials: true}).then((response)=>{
            let my_index = 0
            const add_key_data = response.data.data_source.map((item,index)=>(my_index = index,{
                ...item,
                "key":index,
            }))
            const add_key_summ = response.data.summ.map((item)=>(my_index = my_index+1,{
                ...item,
                "key":my_index,
            }))
            setTableData(add_key_data)
            setTotals(add_key_summ)

        })
        .catch((error) => {
            if (error.status === 401){
                message.error("Пользователь не авторизован")
                setIsAuth(false)
                navigate("/login");
            }else if (error.status === 403){
                message.error("Недостаточно прав")
            }else if (error.status === 404){
                message.error("Ничего не найдено")     
            }else{
                message.error(error.message)
            }
            setTableData([]);
            setTotals([]);
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    };
    return(
        <>
            <div className='waterbalance'>
                <div className='table-form'>
                    <WaterBalanceForm onSubmit={handleGetData}/>
                </div>
                <div className="table">
                    <WaterBalanceTable isLoading={isLoading} data={tableData} totals={totals} />
                </div>
            </div>
        </>
    )
}