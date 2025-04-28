import React,{useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home.jsx';
import WaterBalance from './pages/WaterBalance';
import Chemistry from './pages/Chemistry';
import Electricity from './pages/Electricity';
import NotFound from "./pages/NotFound";
import Header from './pages/Header';
import Login from './pages/LoginPage';
import Reliability from './pages/Reliability.jsx';
import AnaliticControl from './pages/AnaliticControl.jsx'
import AnaliticJournal from './pages/AnaliticJournal.jsx'
import AdminManage from './pages/AdminManage.jsx';
import Spinner from './components/Spinner.jsx';
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthContext } from "./components/AuthContext"; // Импортируем контекст

function App() {
  const { isLoading } = useContext(AuthContext); // Используем контекст
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
    
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute rolesArray={['admin','user']} />}>
            <Route path="/waterbalance" element={<WaterBalance />} />
            <Route path="/chemistry" element={<Chemistry />} />
            <Route path="/electricity" element={<Electricity />} />
            <Route path="/reliability" element={<Reliability />} />
          </Route>
          <Route path="/analitic-control" element={
              <ProtectedRoute rolesArray={['admin','operator','user']}> 
                <AnaliticControl />
              </ProtectedRoute> 
            }
          />
          <Route path="/analitic-journal" element={
              <ProtectedRoute rolesArray={['admin','operator','user']}> 
                <AnaliticJournal />
              </ProtectedRoute> 
            }
          />
          <Route path="/admin-manage" element={
            <ProtectedRoute rolesArray={['admin']}> 
              <AdminManage />
            </ProtectedRoute>
          }/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
