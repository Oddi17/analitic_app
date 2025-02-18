import React from 'react';
import {useNavigate} from "react-router-dom";
import waterdrop from '../images/water_drop.svg';
import {ThunderboltOutlined,ReadOutlined,ExperimentOutlined,EditOutlined,SettingOutlined} from '@ant-design/icons';
import '../css/Home.css'

const Home = () => {
  const navigate = useNavigate();
  return (
      <div className="carousel-container">
          <div className='mycard' onClick={()=>navigate('/waterbalance')}>
            <img src={waterdrop} alt="Water Drop" className="card-image"/>
            <div className='main'>Водный баланс системы</div>
            <div className='description'>Нажмите чтобы открыть</div>
          </div>
          <div className='mycard' onClick={()=>navigate('/electricity')}>
            <ThunderboltOutlined className="card-image" />
            <div className='main'>Расход электроэнергии</div>
            <div className='description'>Нажмите чтобы открыть</div>
          </div>
          <div className='mycard' onClick={()=>navigate('/chemistry')}>
            <ExperimentOutlined className="card-image" />
            <div className='main'>Расход химических реагентов</div>
            <div className='description'>Нажмите чтобы открыть</div>
          </div>
          <div className='mycard' onClick={()=>navigate('/reliability')}>
            <SettingOutlined className="card-image" />
            <div className='main'>Показатели надежности</div>
            <div className='description'>Нажмите чтобы открыть</div>
          </div>
          <div className='mycard' onClick={()=>navigate('/analitic-control')}>
            <EditOutlined className="card-image" />
            <div className='main'>Аналитический контроль</div>
            <div className='description'>Нажмите чтобы открыть</div>
          </div>
          <div className='mycard' onClick={()=>navigate('/analitic-journal')}>
            <ReadOutlined className="card-image" />
            <div className='main'>Журнал</div>
            <div className='description'>Нажмите чтобы открыть</div>
          </div>
      </div>
      );
  };
  
  export default Home;