import React,{useState,useContext} from 'react';
import {Button,Drawer,message} from 'antd';
import {useNavigate,useLocation} from "react-router-dom";
import axios from 'axios';
import {MenuFoldOutlined,TableOutlined,UserOutlined,LogoutOutlined,EditOutlined,SnippetsOutlined,HomeOutlined} from '@ant-design/icons';
import '../css/Header.css'
import { AuthContext } from "../components/AuthContext";
import logo from '../images/favicon.svg';

function Header(){
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const { isAuth, setIsAuth, role, name} = useContext(AuthContext);
    

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setOpen(false);
    };
    
    const handleLogout = () => {
        axios.post("http://10.50.50.2/api/auth/logout",{}, {
            withCredentials: true,
        })
        .then((response)=>{
            setIsAuth(false)
            setOpen(false);
            message.success("Пользователь успешно вышел")
        })
        .catch((error) => {
            message.error(error.message)
        })
    }

    return (
        <header>
            {/* <img className="logo" src="/apple-touch-icon.png" alt="Прямое подключение"/> */}
            <img className="logo" src={logo} alt="Логотип"/>
            {/* <div className="header-title">Альянс-Аналитика</div> */}
            {location.pathname !== "/login" && (
                isAuth ? (<Button icon ={<MenuFoldOutlined />} type="primary" onClick={showDrawer}></Button>)
                :
                (<Button type="primary" onClick={() => navigate("/login")}>Войти</Button>) 
            )}
            {location.pathname === "/login" && <Button type="primary" onClick={() => navigate("/home")}>Главная страница</Button>}
            
            <Drawer
                title="Меню"
                placement="right" // выезд справа
                closable={true}   // отображать крестик для закрытия
                onClose={onClose} // функция закрытия
                open={open} // управление видимостью
                width={250} // задаёт ширину Drawer
            >
                <div className='menu'>
                    {/* <Button
                        type="text"
                        icon={<UserOutlined />}
                        onClick={() => handleNavigation('/profile')}
                        block
                        className="drawer-button"
                        >
                        Профиль
                    </Button> */}
                    <Button
                        type="text"
                        icon={<UserOutlined />}
                        block
                        className="drawer-button"
                        >
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                        }}>
                            <span style={{textAlign:'left'}}>Роль: {role}</span>
                            <span style={{textAlign:'left'}}>Пользователь: {name}</span>
                        </div>
                    </Button>
                    <Button
                        type="text"
                        icon={<HomeOutlined />}
                        onClick={() => handleNavigation('/home')}
                        block
                        className="drawer-button"
                    >
                        Главная страница
                    </Button>
                    <Button
                        type="text"
                        icon={<TableOutlined />}
                        onClick={() => handleNavigation('/waterbalance')}
                        block  // растягивает кнопку на всю ширину контейнера
                        className="drawer-button"
                        >
                        Водный баланс системы
                    </Button>
                    <Button
                        type="text"
                        icon={<TableOutlined />}
                        onClick={() => handleNavigation('/chemistry')}
                        block  
                        className="drawer-button"
                        >
                        Расход химических реагентов
                    </Button>
                    <Button
                        type="text"
                        icon={<TableOutlined />}
                        onClick={() => handleNavigation('/electricity')}
                        block  
                        className="drawer-button"
                        >
                        Расход электроэнергии
                    </Button>
                    <Button
                        type="text"
                        icon={<TableOutlined />}
                        onClick={() => handleNavigation('/reliability')}
                        block  
                        className="drawer-button"
                        >
                        Показатели надежности
                    </Button>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleNavigation('/analitic-control')}
                        block  
                        className="drawer-button"
                        >
                        Аналитический контроль
                    </Button>
                    <Button
                        type="text"
                        icon={<SnippetsOutlined />}
                        onClick={() => handleNavigation('/analitic-journal')}
                        block 
                        className="drawer-button"
                        >
                        Журнал
                    </Button>
                </div>
                <div className='exit'>
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={() => handleLogout('/logout')}
                        block
                        danger  // можно добавить стиль для кнопки выхода
                        className="drawer-button"
                        >
                        Выйти
                    </Button>
                </div>
            </Drawer>
        </header>
    )  
}
export default Header