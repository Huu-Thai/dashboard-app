import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './LoginPage.css'

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: values.email,
        password: values.password,
      });
      login(response.data.access_token);
      navigate('/dashboard');
      message.success('Login successful');
    } catch (error) {
      message.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Row className="login-center">
        <Col span={12} className="m-auto">
          <div className="right-background"></div>
        </Col>
        <Col span={12} className="m-auto">
          <Card className="login-card" style={{ height: '100vh' }}>
            <Form
              name="login"
              className="user-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <h2>Domain Checker</h2>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Enter valid email address!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Log in
                </Button>
              </Form.Item>
              <Form.Item className="user-form-note">
                Already have an account?
                <Button type="link" className="login-btn-link" onClick={() => navigate('/register')}>
                  Register here
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;