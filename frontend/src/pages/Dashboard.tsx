import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import axios from 'axios';
import './DashboardPage.css';

interface DashboardStats {
  users: number;
  revenue: number;
  growth: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/dashboard/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content dashboard-container">
      <Card title="Dashboard">
        <Row gutter={16}>
          <Col span={8}>
            <Card className="dashboard-card-item">
              <Statistic title="Users" value={stats?.users} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Revenue" value={stats?.revenue} prefix="$" />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Growth" value={stats?.growth} suffix="%" />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;