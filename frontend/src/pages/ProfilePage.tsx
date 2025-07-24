import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Card, message, Avatar, Row, Col, Layout, TabsProps, Tabs } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ProfilePage.css';
import AuthContext from '../context/AuthContext';
import ProfileForm from '../components/ProfileForm';
const { Header } = Layout;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('overview');
  const { profile } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const result = await axios.put('http://localhost:8000/api/auth/profile', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result) 
        form.setFieldsValue(result);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const tabList = [{ key: 'overview', label: 'Overview' }];

  const tabContentList: Record<string, React.ReactNode> = {
    overview: <ProfileForm form={form} onFinish={onFinish} loading={loading} />,
  };

  useEffect(() => {
    form.setFieldsValue(profile);
  }, [profile]);

  return (
    <>
      <div className="profile-container page-content">
        <Card
          title="Profile"
          tabList={tabList}
          activeTabKey={activeTabKey}
          tabProps={{
            size: 'middle',
          }}
        >
          {tabContentList[activeTabKey]}
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;