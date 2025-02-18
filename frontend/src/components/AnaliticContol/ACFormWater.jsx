import React, {useEffect,useState} from 'react';
import { Form,Space,Button,DatePicker,Input,ConfigProvider} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import locale from 'antd/locale/ru_RU'


function ACFormWater({handleSend,name,reset,setReset}) {
    const [analiticFormWater] = Form.useForm();
    const [date, setDate] = useState();

    const handleSubmit = () => {
        analiticFormWater.validateFields().then((objform)=>{
            objform['location'] = name
            objform['recdt'] = new Date(objform.recdt).toISOString()
            handleSend(objform,"water")
        }).catch((error)=>{
            message.error(error.message)
        })
    }
    const handleReset = () => {
        analiticFormWater.resetFields();
        setDate(null)
    };
    const disabledDate = (current) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); 
        return current.valueOf() < yesterday.getTime();
    }

    const handleDateChange = (values) => {
        setDate(values)
        analiticFormWater.setFieldsValue({ recdt: values }); // Устанавливаем значение в форму
      };

    useEffect(()=>{
        if (reset){
            handleReset()
            setReset(false)
        }
    },[reset])
    
    return (
        <>
            <Form
                form={analiticFormWater}
                onFinish={handleSubmit}
                name="AnaliticWater" 
                >
                <Form.Item 
                    name="temperature" 
                    label="Температура" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите температуру' },
                        { pattern:/^-?\d+(\.\d+)?$/,message:"Введите корректное число" }
                        ]} >
                    <Input addonAfter='град.С'/>
                </Form.Item>
                <Form.Item 
                    name="ph" 
                    label="Водородный показатель,ph" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите pH'},
                        { pattern:/^-?\d+(\.\d+)?$/,message:"Введите корректное число" }
                    ]} >
                    <Input addonAfter='ед.pH'/>
                </Form.Item>
                <Form.Item 
                    name="color" 
                    label="Цветность" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите цветность'},
                        { pattern:/^-?\d+(\.\d+)?$/,message:"Введите корректное число" }
                    ]} >
                    <Input addonAfter='град.ХКШ'/>
                </Form.Item>
                <Form.Item 
                    name="aluminum" 
                    label="Ост.Алюминий" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите ост. Алюминий'},
                        { pattern:/^-?\d+(\.\d+)?$/,message:"Введите корректное число" }
                    ]} >
                    <Input addonAfter='мг/дм³'/>
                </Form.Item>
                <Form.Item 
                    name="turbidity" 
                    label="Мутность"
                    normalize={(value) => value?.trim()} 
                    rules={[
                        {required: true,message: 'Пожалуйста, введите Мутность'},
                        { pattern:/^-?\d+(\.\d+)?$/,message:"Введите корректное число" }
                    ]} >
                    <Input addonAfter='мг/дм³'/>
                </Form.Item>
                <Form.Item 
                    name="chlorides" 
                    label="Хлориды" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите Хлориды'},
                        { pattern:/^-?\d+(\.\d+)?$/,message:"Введите корректное число" }
                    ]} >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="recdt" 
                    label="Дата/Время пробы" 
                    rules={[{ required: true,message: 'Пожалуйста, введите дату и время пробы'}]} >
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                showTime={{format: "HH:mm"}}
                                format="DD-MM-YYYY HH:mm"
                                placeholder={["Дата/время пробы"]}
                                disabledDate={disabledDate}
                                value={date}
                                onChange={handleDateChange}
                            />
                        </ConfigProvider>
                </Form.Item>        
                <Form.Item className='buttons'>
                    <Space>
                        <Button icon={<EditOutlined />} type="primary" htmlType="submit">Отправить</Button>
                        <Button htmlType="button" onClick={handleReset}>Очистить</Button>
                    </Space>
                </Form.Item>    
            </Form>
        </>
            )

}

export default ACFormWater
