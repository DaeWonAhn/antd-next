import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Col, Layout, Menu, MenuProps, message, Row, Space } from "antd";

import { useGlobalContext } from "@/contexts/global";
import { LayoutProps } from "@/types";

import Nav from "./Nav";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";

const { Footer, Header, Content, Sider } = Layout;

const LayoutForm = ({ children }: LayoutProps) => {
  const router = useRouter();

  const { user, setUser } = useGlobalContext();

  const handleLogoutButtonClick = () => {
    localStorage.removeItem("token");
    setUser(null);

    message.info("로그아웃 되었습니다.");

    router.push("/");
  };

  const items2: MenuProps["items"] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Row>
          <Col flex={1}>
            <Nav />
          </Col>
          <Col>
            {user && (
              <Space>
                <Avatar>{user.email}</Avatar>
                <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
              </Space>
            )}
          </Col>
        </Row>
      </Header>

      <Layout>
        <Sider width={200} style={{ background: "white" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>

        <Layout>
          <Content style={{ padding: "0 50px", background: "white" }}>
            <div className="site-layout-content">{children}</div>
          </Content>
        </Layout>
      </Layout>

      <Footer>An Daewon</Footer>
    </Layout>
  );
};

export default LayoutForm;
