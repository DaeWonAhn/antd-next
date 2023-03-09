import { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, MenuProps } from "antd";
import Link from "next/link";

const menuItems: MenuProps["items"] = [
  {
    label: <Link href="/">홈</Link>,
    key: "home",
  },
  {
    label: <Link href="/user/login">로그인</Link>,
    key: "a1",
  },
  {
    label: <Link href="/user/logout">로그아웃</Link>,
    key: "a2",
  },
  {
    label: <Link href="/board">게시판</Link>,
    key: "a3",
  },
  {
    label: <Link href="/user">USER</Link>,
    key: "a4",
  },
];

const Nav = () => {
  const [current, setCurrent] = useState("home");
  const [token, setToken] = useState<any>("");

  const onMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Menu onClick={onMenu} selectedKeys={[current]} items={menuItems} mode="horizontal" theme="dark" />
    </>
  );
};

export default Nav;
