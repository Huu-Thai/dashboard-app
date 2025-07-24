import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Layout, Menu, message, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
const { Header, Content, Sider } = Layout;

interface SidebarProps {
  profile: object | null
};

const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  // const [profile, setProfile] = useState<any>(null);
  const { logout } = useContext(AuthContext);

  const accessProfile = () => {
    navigate('/profile');
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // setProfile(response.data);
    } catch (error) {
      message.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div style={{ float: 'right', marginRight: 16 }}>
              <Row>
                <Col span={4}>
                  <UserOutlined style={{ fontSize: '32px'}} />
                </Col>
                <Col span={20}>
                  <Menu>
                    <Menu.Item className="profile-item" key="1" onClick={accessProfile}>
                      {/* {profile?.full_name} */}
                    </Menu.Item>
                    <Menu.Item className="profile-item" key="2"
                      onClick={logout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </div>
          </Header>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Home
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>

        </Header>
        <Content style={{ margin: '16px' }} />
      </Layout>
    </Layout>
  );
}

export default Sidebar;