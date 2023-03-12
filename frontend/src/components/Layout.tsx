import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Col, Layout, Menu, MenuProps, message, Row, Space } from "antd";

import { useGlobalContext } from "@/contexts/global";
import { LayoutProps } from "@/types";

import Nav from "./Nav";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

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
      const navItems: any = ["게시판", "USER", "관리자"];

      let children: string | null | any = null;

      const navChiles1: any = [{ title: "게시판", url: "/board" }];
      const navChiles2: any = [{ title: "사용자 list", url: "/user" }];
      const navChiles3: any = [{ title: "권한관리", url: "" }];

      children = index === 0 ? navChiles1 : index === 1 ? navChiles2 : navChiles3;

      let childrenItmTitle: string | null = null;
      let childrenItmUrl: string | null = null;

      return {
        // start

        /*
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        */
        key: `sub${key}`,
        icon: React.createElement(icon),

        label: `${navItems[index]}`,

        children: children.map((items: any, index: string | number) => {
          if (index == 0) {
            const { title, url } = items;
            childrenItmTitle = title;
            childrenItmUrl = url;
          }
          if (index == 1) {
            const { title } = items;
            childrenItmTitle = title;
          }

          return {
            key: childrenItmTitle,
            label: <Link href={childrenItmUrl}>{childrenItmTitle}</Link>,
          };
        }),
        /*
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          console.log("subKey: ", subKey);
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
        */

        // end
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
                <Avatar size="large">
                  <LaptopOutlined /> {user.email}
                </Avatar>

                <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
              </Space>
            )}

            {!user && (
              <Space>
                <Button onClick={() => router.push("/user/login")}>로그인</Button>
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

      {/* <Footer>An Daewon</Footer> */}
    </Layout>
  );
};

export default LayoutForm;
