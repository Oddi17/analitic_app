import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotFound.css";


export default function NotFound(){
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/home");
    };
    return (
        <div className="not-found">
          <h1>404</h1>
          <p>Ууупс! Страница, которую вы ищите, не существует</p>
          <button onClick={handleGoBack} className="back-button">
            Вернуться на главную
          </button>
        </div>
      );
}