import React,{useEffect,useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography,message,Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../components/AuthContext";
import axios from 'axios';
import "../css/LoginPage.css"

const { Text, Title} = Typography;

export default function Login(){
    const [formlogin] = Form.useForm();
    const navigate = useNavigate();
    const {isAuth, setIsAuth,setRole,setName} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        formlogin.validateFields().then((values) => {
          axios
            .post("http://10.50.50.2/api/auth/login", values, {
              withCredentials: true,
            })
            .then((response) => {
                message.success("Пользователь успешно зашел")
                setIsAuth(true)
                setRole(response.data.role)
                setName(response.data.username)
                navigate("/home");
            })
            .catch((error) => {
                setIsAuth(false)
                if (error.status == 401){
                    message.error("Неправильный логин или пароль")
                }else if (error.status == 404){
                    message.error("Неправильный логин или пароль")
                }else{
                    message.error(error.message)
                }
            })
            .finally(()=>{
                setIsLoading(false)
            })
        });
    };

    useEffect(()=>{
        if (isAuth) {
            navigate("/home")
        }
    },[isAuth,navigate])

    return (
        <div className='loginpage'>
            {isLoading && 
                <Spin size="large" className="spin">
                    <div></div>
                </Spin>
            }
            <section>
                <div className="container">
                    <div className="header">
                        <Title className="title">Вход</Title>
                        <Text className="text">
                            С возвращением в Альянс-Аналитика!
                            Пожалуйста, введите свои данные ниже, чтобы войти.
                        </Text>
                    </div>
                    <Form
                        form={formlogin}
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                        layout="vertical"
                        requiredMark="optional"
                    >
                        <Form.Item
                            name="login"
                            rules={[
                            {
                                required: true,
                                message: "Пожалуйста, введите свой логин!",
                            },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Логин"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: "Пожалуйста, введите свой пароль!",
                            },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Пароль"
                            />
                        </Form.Item>
                        <Form.Item className='buttons'>
                            <Button block="true" type="primary" htmlType="submit">
                                Войти
                            </Button>
                            {/* <div style={styles.footer}>
                                <Text style={styles.text}>У вас нет учетной записи?</Text>{" "}
                                <Link href="">Зарегистрироваться</Link>
                            </div> */}
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </div>    
    )
}
