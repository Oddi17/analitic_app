import React,{ useState } from "react";
import { Form,Space,Button,Input,Select,message } from 'antd';
import {EditOutlined} from '@ant-design/icons';



export default function ChangePassword({handleChange,changeForm,id_user}) {
    const handleSubmitAdd = () => {
        changeForm.validateFields().then((objform)=>{
            //objform["id"] = id_user
            handleChange(objform.password,id_user)
        }).catch((error)=>{
            message.error(error.message)
        })
    }

    return (
        <Form 
            form={changeForm}
            onFinish={handleSubmitAdd}
            name="ChangePassword"
            >
            <Form.Item
                name="password" 
                label="Новый пароль пользователя" 
                normalize={(value) => value?.trim()}
                rules={[
                    { required: true,message: 'Пожалуйста, введите новый пароль пользователя' },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item className='buttons'>
                <Space>
                    <Button icon={<EditOutlined />} type="primary" htmlType="submit">Изменить пароль</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}
