import React, { useState } from 'react';
import { Form,Space,Button,DatePicker,Select,ConfigProvider } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import "../../css/WaterBalanceForm.css";
import locale from 'antd/locale/ru_RU'

const { RangePicker } = DatePicker;
const { Option } = Select;

function WaterBalanceForm({onSubmit}) {
   
    const [findForm] = Form.useForm();
    const [dates, setDates] = useState([]);
    const [interval, setInterval] = useState("1_hour");

    const handleSearch = () => {
      findForm.validateFields().then((objform)=>{
        const start_time = new Date(objform.range_date_time[0]).toISOString()
        const end_time = new Date(objform.range_date_time[1]).toISOString()
        const sample = objform.sampling 
        onSubmit(start_time,end_time,sample) 
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
      setDates(values);
      findForm.setFieldsValue({ range_date_time: values }); // Устанавливаем значение в форму
    };

    return (
        <Form
            form={findForm}
            onFinish={handleSearch}
            name="findDiff" 
            initialValues={{sampling:"1_hour"}}>
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
              <Form.Item name="sampling" label="">  
                <Select  value={interval} onChange={setInterval} style={{ width: 100 }}>
                  <Option value="1_hour">Час</Option>
                  <Option value="2_hour">Два часа</Option>
                  <Option value="day">День</Option>
                  <Option value="month">Месяц</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">Найти</Button>
                </Space>
              </Form.Item>
          </Form>        
    )
}

export default WaterBalanceForm