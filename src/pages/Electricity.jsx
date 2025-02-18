import React,{useState,useContext} from 'react';
import {Card,message} from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ElectricityForm from '../components/Electricity/ElectricityForm';
import Spinner from '../components/Spinner'
import { AuthContext } from "../components/AuthContext";


function Electricity(){
    const [data, setData] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGetData = (start_time,end_time) => {
        getData(start_time,end_time)
    }

    const getData = (start_time,end_time) => {
        setIsLoading(true);
        const url = `http://10.50.50.2/api/report/electricity?start_time=${start_time}&end_time=${end_time}`
        axios.get(url,{withCredentials: true}).then((response)=>{ 
            setData(response.data)
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
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    };
    return (
        <>  
            <div className='title-page'>
                Расход электроэнергии
            </div>
            <div className='form-range'>
                    <ElectricityForm onSubmit={handleGetData}/>
            </div>
            {isLoading ? <Spinner /> : 
                (<div className='container-page electricity'>
                    <Card title="Расход электроэнергии">
                        <Card.Grid hoverable={false} className='grid-title-column'>Величина</Card.Grid>
                        <Card.Grid hoverable={false} className='grid-title-column'>Значение</Card.Grid>
                            <Card.Grid>Объем сырой воды,м³</Card.Grid>
                            <Card.Grid>{data["VOS1_WSUM"]?.volume || 'Нет данных'}</Card.Grid>
                            <Card.Grid>Расход электроэнергии,кВтч</Card.Grid>
                            <Card.Grid>{data["VOS1_WSUM"]?.consumption || 'Нет данных'}</Card.Grid>
                            <Card.Grid>Удельный расход электроэнергии,кВтч/м³</Card.Grid>
                            <Card.Grid>{data["VOS1_WSUM"]?.res_value || 'Нет данных'}</Card.Grid>
                    </Card>
                </div>
             )}                 
        </>
    )
}

export default Electricity