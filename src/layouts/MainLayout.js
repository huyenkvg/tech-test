
import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import UserMenu from '../components/nav-menu/UserMenu';
const { Header, Content, Footer } = Layout;
const MainLayout = (props) => {
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" >
          <UserMenu/>
          </div>
        
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
        {...props}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
            fontSize: '20px',
          }}
        >
            <Breadcrumb.Item>{localStorage.getItem('user') || 'huyenkvg'}'s Repositories</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >      
          {props.children}  
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Nguyen Thi Thanh Huyen
      </Footer>
    </Layout>
  );
};
export default MainLayout;