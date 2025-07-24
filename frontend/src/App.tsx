import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, message, ConfigProvider, Row, Col } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import AuthContext from './context/AuthContext';
import { theme } from './theme/themeConfig';
import './App.css';
import './theme/globalStyles.css';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setProfile(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      message.error('Failed to fetch profile');
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    fetchProfile();
    setAuthToken(token);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout');

      localStorage.removeItem('token');
      setAuthToken(null);
      message.success('Logged out successfully');
    } catch (error) {
      message.error('Logout failed');
    }
  };

  useEffect(() => {
    if (!profile)
      fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout, profile }}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          {authToken ? (
            <Layout className="side-container" style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={240}>
                <Row>
                  <Header className="site-layout-background site-layout-header" style={{ padding: 0 }}>
                    <Row>
                      <div className="logo" >
                        <h1>Domain Checker</h1>
                      </div>
                    </Row>
                    <Row>
                      <Col span={4}>
                        <UserOutlined className="avatar" style={{ fontSize: '32px'}} />
                      </Col>
                      <Col span={20}>
                        <Menu className="profile-group">
                          <Menu.Item className="profile-item" key="1">
                            <Link to="/profile">{profile?.full_name}</Link>
                          </Menu.Item>
                          <Menu.Item className="profile-item profile-logout" key="2"
                            onClick={logout}
                          >
                            Logout
                          </Menu.Item>
                        </Menu>
                      </Col>
                    </Row>
                  </Header>
                </Row>
                <Row>
                  <Menu className="menu-group" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                      <Link to="/dashboard">Home</Link>
                    </Menu.Item>
                  </Menu>
                </Row>  
              </Sider>
              <Layout className="site-layout">
                <Content>
                  <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </ConfigProvider>
    </AuthContext.Provider>
  );
};

export default App;