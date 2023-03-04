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
            <Menu
                onClick={onMenu}
                selectedKeys={[current]}
                items={menuItems}
                mode="horizontal"
                theme="dark"
            />
        </>
    );
};

export default Nav;
