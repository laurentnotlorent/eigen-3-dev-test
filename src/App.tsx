import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Layout, Menu, Typography, Flex, Button, Carousel, Col, Row, Input, Space} from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { IoHome } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import type { SearchProps } from 'antd/es/input/Search';
import './styles/dashboard.css';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<Article[]>([]);
  const maxCardsToShow: number = 6;

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '700px',
    height: '100%',
    maxHeight: '100vh',
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


  const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 300,
  };


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<any>('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: 'cd8dae03f4c2411e8f069e9c0a6c58ee',
          }
        });
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Layout className='container'>
      <Header style={{ backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GiHamburgerMenu
            onClick={() => setCollapsed(!collapsed)}
            size={25}
            style={{ marginRight: 20 }}
          />
          <div className='brand'>News</div>
        </div>
        
      </Header>
      <Layout>
      <Sider collapsed={collapsed} theme='light'>
        <Menu items={[
          {
            label: 'Home',
            key: 'home',
            icon: <IoHome />,
          }
        ]}/>
      </Sider>
        <Content className='content'>
        <Carousel autoplay className="carousel-container">
            {newsData.slice(0, 5).map((article: Article, index: number) => (
              <div key={index} className="carousel-item" onClick={() => window.open(article.url, "_blank")}>
                <img src={article.urlToImage} alt={article.title} />
              </div>
            ))}
        </Carousel>


        <div className='card-container'>
        <Row gutter={[16, 16]}>
            {newsData.slice(0, maxCardsToShow).map((article: Article, index: number) => (
              <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                <Card hoverable style={cardStyle}>
                  <Flex justify="space-between">
                    <img
                      alt="avatar"
                      src={article.urlToImage}
                      style={imgStyle}
                    />
                    <Flex vertical align="flex-end" justify="space-between" style={{ padding: 16 }}>
                      <Typography.Title level={5}>
                        {article.title}
                      </Typography.Title>
                      <Typography.Paragraph>
                        {article.description}
                      </Typography.Paragraph>
                      <Button type="primary" href={article.url} target="_blank">
                        Read More
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
          
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
