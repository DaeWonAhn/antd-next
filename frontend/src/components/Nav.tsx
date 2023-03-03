import { useState } from "react";
import { Breadcrumb, Layout, Menu, theme, MenuProps } from "antd";
import Link from "next/link";

const menuItems: MenuProps["items"] = [
    {
        label: <Link href="/">홈</Link>,
        key: "home",
    },
    {
        label: <Link href="/board">게시판</Link>,
        key: "a",
    },
    {
        label: <Link href="/user">USER</Link>,
        key: "b",
    },
];

const Nav = () => {
    const [current, setCurrent] = useState("home");
    const onMenu: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };
    return (
        <>
            <Layout className="layout">
                <Menu
                    onClick={onMenu}
                    selectedKeys={[current]}
                    items={menuItems}
                    mode="horizontal"
                    theme="dark"
                />
                {/* 
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
            */}
            </Layout>
        </>
    );
};

export default Nav;
