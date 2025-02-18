import React, { useState,useContext } from 'react';
import {Card,message} from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ChemistryForm from '../components/Сhemistry/ChemistryForm';
import ChemistryTable from '../components/Сhemistry/ChemistryTable'
import Spinner from '../components/Spinner'
import { AuthContext } from "../components/AuthContext";


function Chemistry(){
    const [data, setData] = useState({})
    const [dataTable,setDataTable] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGetData = (start_time,end_time,sample) => {
        getData(start_time,end_time,sample)
    }

    const getData = (start_time,end_time,sample) => {
        setIsLoading(true);
        const url = `http://10.50.50.2/api/report/chemistry?start_time=${start_time}&end_time=${end_time}&sample=${sample}`
        axios.get(url,{withCredentials: true}).then((response)=>{ 
            setData({
                'VOS1_V_KOAG_SUM': response.data['VOS1_V_KOAG_SUM'],
                'VOS1_V_GHN_SUM': response.data['VOS1_V_GHN_SUM'],
            })
            const add_key_data = response.data['VOS1_V_FLOK_SUM'].map((item,index)=>({
                ...item,
                "key":index,
            }))
            setDataTable(add_key_data)
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
            setData({});
            setDataTable([])
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    };
    return (
        <>  
            <div className='title-page'>
                Расход химических реагентов
            </div>
            <div className='form-range'>
                    <ChemistryForm onSubmit={handleGetData}/>
            </div>
            {isLoading ? <Spinner /> : 
                (<div className='container-page chemistry'>
                    <Card title="Расход сернокислого алюминия" >
                        <Card.Grid hoverable={false} className='grid-title-column'>Величина</Card.Grid>
                        <Card.Grid hoverable={false} className='grid-title-column'>Значение</Card.Grid>
                        <Card.Grid>Объем потребления сырой воды,м³</Card.Grid>
                            <Card.Grid>{data["VOS1_V_KOAG_SUM"]?.volume || 'Нет данных'}</Card.Grid>
                        <Card.Grid>Расход реагента,м³(насосы P-07.01 A/B)</Card.Grid>
                            <Card.Grid>{data["VOS1_V_KOAG_SUM"]?.consumption || 'Нет данных'}</Card.Grid>
                        <Card.Grid>Удельное значение кг/тм³</Card.Grid>
                            <Card.Grid>{data["VOS1_V_KOAG_SUM"]?.res_value || 'Нет данных'}</Card.Grid>
                    </Card>
                    <Card title="Расход гипохлорита натрия">
                    <Card.Grid hoverable={false} className='grid-title-column'>Величина</Card.Grid>
                        <Card.Grid hoverable={false} className='grid-title-column'>Значение</Card.Grid>
                        <Card.Grid>Объем потребления сырой воды,м³</Card.Grid>
                            <Card.Grid>{data["VOS1_V_GHN_SUM"]?.volume || 'Нет данных'}</Card.Grid>
                        <Card.Grid>Расход реагента,м³(насосы P-09.01 A/B)</Card.Grid>
                            <Card.Grid>{data["VOS1_V_GHN_SUM"]?.consumption || 'Нет данных'}</Card.Grid>
                        <Card.Grid>Удельное значение кг/тм³</Card.Grid>
                            <Card.Grid>{data["VOS1_V_GHN_SUM"]?.res_value || 'Нет данных'}</Card.Grid>
                    </Card>
                    <ChemistryTable data={dataTable} otherData={data}/>
                </div>
             )}                 
        </>
    )
}

export default Chemistry