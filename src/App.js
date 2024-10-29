import React from 'react';
import { Card, Typography, Space, Divider, Button } from 'antd';
import { MailOutlined, LoadingOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const contactEmails = [
  'pablo@advia.tech',
  'jaime@advia.tech',
  'miguelon@advia.tech'
];

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, #fff 0%, #f8f3df 50%, #f8f3df 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <Card 
        style={{ 
          maxWidth: 800,
          width: '100%',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: '48px' }}
      >
        {/* Company Name */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <Title 
            level={1} 
            style={{ 
              fontSize: '4.5rem', 
              marginBottom: 0,
              background: 'linear-gradient(135deg, #171717 0%, #404040 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Advia
          </Title>
        </div>

        {/* Under Construction Message */}
        <Card
          style={{ 
            marginBottom: 40,
            background: '#f8f3df',
            border: '1px solid #e8e3cf'
          }}
        >
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                Under Construction
                <LoadingOutlined spin style={{ color: '#8b7355' }} />
              </Space>
            </Title>
            <Paragraph style={{ fontSize: '16px', marginBottom: 0 }}>
              We are currently building our webpage. Please check back soon!
            </Paragraph>
          </Space>
        </Card>

        {/* Contact Section */}
        <div>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            <Space>
              <MailOutlined />
              Contact Us
            </Space>
          </Title>
          
          <Space direction="vertical" style={{ width: '100%' }}>
            {contactEmails.map((email) => (
              <Button
                key={email}
                type="text"
                size="large"
                block
                style={{
                  height: 'auto',
                  padding: '16px',
                  textAlign: 'left',
                  background: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px'
                }}
                className="email-button"
              >
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: '16px' }}>{email}</Text>
                  <ArrowRightOutlined style={{ color: '#d4d4d4' }} />
                </Space>
              </Button>
            ))}
          </Space>
        </div>

        {/* Optional: Add a footer */}
        <Divider style={{ margin: '40px 0 24px' }} />
        <Paragraph type="secondary" style={{ textAlign: 'center', margin: 0 }}>
          Coming Soon • 2024
        </Paragraph>
      </Card>

      {/* Add custom styles */}
      <style jsx global>{`
        .email-button:hover {
          background: #f8f3df !important;
        }
        .email-button:hover .anticon-arrow-right {
          color: #8b7355 !important;
          transform: translateX(4px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}