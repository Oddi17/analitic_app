import React, { useState } from 'react';
import { Form,Space,Button,DatePicker,ConfigProvider } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import locale from 'antd/locale/ru_RU'

const { RangePicker } = DatePicker;

function ElectricityForm({onSubmit}) {
   
    const [elecForm] = Form.useForm();
    const [dates, setDates] = useState([]);

    const handleSearch = () => {
      elecForm.validateFields().then((objform)=>{
        const start_time = new Date(objform.range_date_time[0]).toISOString()
        const end_time = new Date(objform.range_date_time[1]).toISOString()
        onSubmit(start_time,end_time) 
      })
    }

    const handleDateChange = (values) => {
      if (values){
        const start = values[0] 
        const end = values[1]
        if (start.isSame(end)){
          values = [start,null]
        }
      }
      setDates(values)
      elecForm.setFieldsValue({ range_date_time: values }); // Устанавливаем значение в форму
    };

    return (
        <Form
            form={elecForm}
            onFinish={handleSearch}
            name="findElectricity">
              <Form.Item  name="range_date_time" label="" 
                          rules={[{ required: true, message: 'Пожалуйста, введите временной интервал' }]}>
                  <ConfigProvider locale={locale}>
                    <RangePicker
                          showTime={{ format: "HH:00", minuteStep: 60 }} // Убираем минуты и секунды
                          format="DD-MM-YYYY HH:00" // Отображаем только часы
                          value={dates}
                          placeholder={["Начальные дата/время","Конечные дата/время"]}
                          onChange={handleDateChange}
                          />
                  </ConfigProvider>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">Найти</Button>
                </Space>
              </Form.Item>
          </Form>        
    )
}

export default ElectricityForm