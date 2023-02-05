
import { Col, Row } from 'antd';
import { useEffect } from 'react';
import './App.css';
import TableX from './components/table/Table';
import { authen, getListRepos, get_repos } from './apis/Oct';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Repo from './pages/repo/Repo';
import LoginForm from './pages/login/LoginForm';
const { Header, Content, Footer } = Layout;



const App = () => {
  const user = localStorage.getItem('user') ? localStorage.getItem('user') : {};

  const privateRoutes = [
  ]
  const publicRoutes = [
    { path: '/', element: <Home /> },
    { path: '/:user/:name', element: <Repo /> },
    { path: '/login', element: <LoginForm /> },
  ]

  useEffect(() => {

  }, [])

  return (
    // <MainLayout/>
    // <Home />
    <Router >
      <Routes>
        {
          publicRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </Router> 

  );
};
export default App;