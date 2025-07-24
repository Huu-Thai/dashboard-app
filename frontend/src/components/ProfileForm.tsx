import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';

interface ProfileFormProps {
  form: any;
  onFinish: (values: any) => Promise<void>;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ form, onFinish, loading }) => {
  return (
    <Form
      form={form}
      name="profile"
      onFinish={onFinish}
      layout="vertical"
      className="profile-form"
    >
      <Row>
        <Col span={12} className='profile-col-left'>
          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[
              { required: true, message: 'Please input your full name!' }
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
          >
            <Input placeholder="Phone number" />
          </Form.Item>

          <Form.Item
            name="nok_name"
            label="N.O.K (Next of kin)"
          >
            <Input placeholder="Nok name" />
          </Form.Item>

          <Form.Item
            name="nok_phone_number"
            label="N.O.K Phone Number"
          >
            <Input placeholder="Nok Phone number" />
          </Form.Item>

        </Col>
        <Col span={12} className='profile-col-right'>
          <Form.Item
              name="address_line_1"
              label="Address Line #1"
            >
              <Input placeholder="Enter address line 1" />
            </Form.Item>
            <Form.Item
              name="address_line_2"
              label="Address Line #2"
            >
              <Input placeholder="Enter address line 2" />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
            >
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
            >
              <Input placeholder="Enter state" />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
            >
              <Input placeholder="Enter country" />
            </Form.Item>
        </Col>
      </Row>
      
      <Form.Item>
        <Button type="primary" className="profile-button" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>    
  );
}

export default ProfileForm;