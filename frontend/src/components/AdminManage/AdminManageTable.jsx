import React,{useState} from 'react';
import {Table,Select,message,Modal,Form} from 'antd';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ChangePassword from './ChangePassword';

const { confirm } = Modal;

function AdminManageTable({data}){
    const [isLoading,setIsLoading] = useState(false)
    const [isOpenModal,setIsOpenModal] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [form] = Form.useForm();

    const handleOpenModal= (id_user) => {
        setIsOpenModal(true);
        setCurrentId(id_user)
    };
  
    const handleCancelModal = () => {
        setIsOpenModal(false);
        setCurrentId()
        form.resetFields();
    };

    const handleDelete = (id_user) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: "Вы уверены, что хотите удалить пользователя?",
            content: "Это действие нельзя отменить!",
            okText: "Да, удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk() {
                setIsLoading(true)
                axios.delete(`http://10.50.50.2/api/auth/delete/user/${id_user}`,{withCredentials: true})
                .then((response)=>{ 
                    message.success("Пользователь успешно удален")
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
                    setIsLoading(false); 
                });
            },
            onCancel() {
                message.info("Удаление отменено");
            },
        })
         
    }
    const handleChangePassword = (user_password,user_id)=>{
        axios.put(`http://10.50.50.2/api/auth/change/user/password`,{
            "id":user_id,
            "password":user_password
        },{withCredentials: true})
        .then((response)=>{ 
            message.success("Пароль пользователя успешно изменен")
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
            setIsLoading(false); 
        });
    }


    const handleChange = (user_role,user_id) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: "Вы уверены, что хотите сменить роль пользователя?",
            okText: "Да,изменить",
            cancelText: "Отмена",
            okType: "default",
            onOk() {
                setIsLoading(true)
                axios.put(`http://10.50.50.2/api/auth/change/user/role`,{
                    "id":user_id,
                    "role":user_role
                },{withCredentials: true})
                .then((response)=>{ 
                    message.success("Роль пользователя успешно изменена")
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
                    setIsLoading(false); 
                });
            },
            onCancel() {
                message.info("Изменение роли отменено");
            },
        })
    }

    const columns = [
        {
            title: 'Имя пользователя',
            dataIndex: 'first_name',
            key: 'first_name',
            width: '265px',
            align: "center",
        },
        {
            title: 'Логин пользователя' ,
            dataIndex: "login",
            key: "login",
            width: '180px',
            align: "center",
        },
        {
            title: 'Роль пользователя',
            dataIndex : 'role',
            key: "role",
            align: "center",
            width: '150px',
            render: (_,device) => (
                device.role === 'admin' ? "админ" : (
                <Select
                    defaultValue= {device.role}
                    style={{ width: 120 }}
                    onChange={(value=>handleChange(value,device.id))}
                    options={[
                        { value: 'operator', label: 'оператор' },
                        { value: 'user', label: 'инженер' },
                    ]}/>
            )
        )
        },
        {
            title: 'Пароль',
            dataIndex : 'key',
            align: "center",
            key: 'action',
            width: '150px',
            render: (_,device) => (
                <>
                    <a onClick={()=>handleOpenModal(device.id)}>Сменить пароль</a>
                </>
            )
        },
        {
            title: 'Действия',
            dataIndex : 'key',
            align: "center",
            key: 'action',
            width: '150px',
            render: (_,device) => (
                <>
                    <a onClick={()=>handleDelete(device.id)}>Удалить</a>
                </>
            )
        },
    ]

    const defaultTitle = () => 'Управление пользователями';
    return (
        <>
            <Table
                bordered
                loading = {isLoading}
                columns={columns} 
                dataSource={data}
                title={defaultTitle}
                pagination={false}
                scroll={{ y: 500 }} 
            />
            <Modal
                title="Изменить пароль пользователя" 
                open={isOpenModal} 
                onCancel={handleCancelModal} 
                footer={null} >
                    <ChangePassword
                        id_user={currentId}
                        handleChange={handleChangePassword}
                        changeForm={form} 
                    />
            </Modal>    
        </>
       
        
    )
}
export default AdminManageTable