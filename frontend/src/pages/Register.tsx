import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (_: any, value: string) => {
    const numberCount = (value.match(/[0-9]/g) || []).length;
    const symbolCount = (value.match(/[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]/g) || []).length;
    
    if (numberCount < 2) {
      return Promise.reject(new Error('Password must contain at least 2 numbers'));
    }
    if (symbolCount < 2) {
      return Promise.reject(new Error('Password must contain at least 2 symbols'));
    }
    return Promise.resolve();
  };

  const onFinish = async (values: {
    full_name: string;
    email: string; 
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    try {
      const user: {error: boolean} = await axios.post('http://localhost:8000/api/auth/register', {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      if (!user.error) {
        message.success('Registration successful! Please login.');
        navigate('/dashboard');
      } else {
        message.success('Registration failed! Please register again.');
      }
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Row className="register-center">
        <Col span={12} className="m-auto">
          <div className="right-background"></div>
        </Col>
        <Col span={12} className="m-auto">
          <Card className="login-card" style={{ height: '100vh' }}>
            <Form
              name="register"
              onFinish={onFinish}
              className="register-form user-form"
              layout="vertical"
            >
              <h4>Register For</h4>
              <h2>Domain Checker</h2>
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input id="register-email" prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                id="register-password"
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' },
                  { validator: validatePassword }
                ]}
                hasFeedback
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item
                id="register-password-2"
                label="Re-Enter Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Register
                </Button>
              </Form.Item>
              <Form.Item className="user-form-note">
                Already have an account?
                <Button type="link" className="login-btn-link" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;