import React, { useContext,useEffect}  from 'react';
import { Outlet,Navigate,useLocation} from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import {message} from 'antd';

function ProtectedRoute({redirectPath='/home',rolesArray=[],children}) {
  const location = useLocation();
  const {isAuth,role} = useContext(AuthContext);
  useEffect(() => {
    if (!isAuth && location.pathname !== '/home') {
      message.error('Пожалуйста, войдите в систему');
    }
  }, [isAuth, location]);

  useEffect(() => {
    if (isAuth && rolesArray.length > 0 && !rolesArray.includes(role)) {
      message.error('Доступ запрещен');
    }
  }, [isAuth, role, rolesArray]);

  if (!isAuth) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  if (rolesArray.length > 0 && !rolesArray.includes(role)) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  // if (!isAuth) {
  //   if (location.pathname !== "/home"){
  //     message.error("Пожалуйста, войдите в систему")
  //   }
  //   return <Navigate to="/home" state={{from:location}} replace />
  // }

  // if (rolesArray && !rolesArray.includes(role)){
  //   message.error("Доступ запрещен")
  //   return <Navigate to={redirectPath} state={{from:location}} replace />
  // }
  return children ? children : <Outlet />
}

export default ProtectedRoute;