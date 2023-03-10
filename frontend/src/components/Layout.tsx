import React, { useState } from "react";
import { useGlobalContext } from "@/contexts/global";
import { Avatar, Button, Col, Layout as BaseLayout, Menu, message, Modal, Row, Space, theme } from "antd";

import Nav from "./Nav";
import { useRouter } from "next/router";
import Side from "./Side";

type LayoutProps = {
  children: React.ReactNode;
};

const { Header, Content, Footer } = BaseLayout;

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const { user, setUser } = useGlobalContext();

  const handleLogoutButtonClick = () => {
    localStorage.removeItem("token");
    setUser(null);

    message.info("로그아웃 되었습니다.");

    router.push("/");
  };

  return (
    <>
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
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer>An Daewon</Footer>
    </>
  );
};

export default Layout;
