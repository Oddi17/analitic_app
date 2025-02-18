import React,{useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ReliabilityForm from '../components/Reliability/ReliabilityForm';
import ReliabilityTable from '../components/Reliability/ReliabilityTable';
import Spinner from '../components/Spinner';
import { AuthContext } from "../components/AuthContext";
import { message } from "antd";


function Reliability(){
    const [dataTable, setDataTable] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGetData = (start_time,end_time) => {
        getData(start_time,end_time)
    }

    const getData = (start_time,end_time) => {
        setIsLoading(true);
        const url = `http://10.50.50.2/api/report/reliability?start_time=${start_time}&end_time=${end_time}`
        axios.get(url,{withCredentials: true}).then((response)=>{ 
            const add_key_data = response.data.map((item,index)=>({
                ...item,
                "key":index,
            }))
            // setDataTable(response.data)
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
            setDataTable([]);
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    };
    return (
        <>  
            <div className='form-range reliability-form'>
                <ReliabilityForm onSubmit={handleGetData}/>
            </div>
            {isLoading ? <Spinner /> : 
                (<div className='container-page reliability'>
                    <ReliabilityTable data={dataTable}/> 
                </div>
             )}                 
        </>
    )
}

export default Reliability