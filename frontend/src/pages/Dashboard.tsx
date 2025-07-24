import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './DashboardPage.css';

const Dashboard: React.FC = () => {
  return (
    <div className="page-content dashboard-container">
      <Card title="Dashboard">
        <Row gutter={16}>
          <Col span={8}>
            <Card className="dashboard-card-item">
              <Statistic
                title="Active Users"
                value={1128}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Pending Tasks"
                value={93}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Completed Projects"
                value={28}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;