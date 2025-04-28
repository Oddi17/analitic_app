import React,{ useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminManageTable from '../components/AdminManage/AdminManageTable';
import { AuthContext } from "../components/AuthContext";
import {PlusOutlined} from '@ant-design/icons';
import { Modal,message, Button,Form} from 'antd';
import AddUserForm from '../components/AdminManage/AddUserForm';


export default function AdminManage(){
    const [tableData, setTableData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate();
    const { setIsAuth } = useContext(AuthContext);
    const [isOpenModal,setIsOpenModal] = useState(false)
    const [form] = Form.useForm();

    const handleSend = (user) => {
        axios.post(`http://10.50.50.2/api/auth/create/user`,user,{withCredentials:true})
        .then((response)=>{
            message.success("Пользователь успешно добавлен")
            handleCancelModal()
        })
        .catch((error)=>{
            if (error.status === 401){
                message.error("Пользователь не авторизован")
                setIsAuth(false)
                navigate("/login");
            }else if (error.status === 403){
                message.error("Недостаточно прав")
                setReset(true)
            }else{
                message.error(error.message)
            }
        })
        .finally(() => {
            //setIsLoading(false); 
        });  
    }
    const handleOpenModal= () => {
        setIsOpenModal(true);
    };
  
    const handleCancelModal = () => {
        setIsOpenModal(false);
        form.resetFields();
    };

    const getData = () => {
        setIsLoading(true);
            const url = `http://10.50.50.2/api/auth/show/user`
            axios.get(url,{withCredentials: true}).then((response)=>{
            setTableData(response.data)
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
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    };

    useEffect(() => {
        getData();
    }, []);

    return(
        <>
            <div className='adminmanage'>
                <div className='menu' style={{"marginBottom":"10px"}}>
                    <Button icon={<PlusOutlined />} type="primary" onClick={handleOpenModal}>Добавить пользователя</Button>
                </div>
                <div className='table'>
                    <AdminManageTable isLoading={isLoading} data={tableData}/>
                </div>
            </div>
            <Modal 
                title="Добавить пользователя" 
                open={isOpenModal} 
                onCancel={handleCancelModal} 
                footer={null} >
                    <AddUserForm 
                        handleSend={handleSend}
                        addForm={form} 
                    />
            </Modal>
        </>
    )

}