import { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, MenuProps } from "antd";
import Link from "next/link";
import Item from "antd/es/list/Item";
import { MenuItemType, SubMenuType, MenuItemGroupType, MenuDividerType } from "antd/es/menu/hooks/useItems";
import { useGlobalContext } from "@/contexts/global";

const menuItems: MenuProps["items"] = [
  {
    label: <Link href="/">홈</Link>,
    key: "home",
  },

  {
    label: <Link href="/board/">게시판</Link>,
    key: "board",
  },
  {
    label: <Link href="/user">사용자</Link>,
    key: "user`",
  },
];

const Nav = () => {
  const { user } = useGlobalContext();

  const [menu, setMenu] = useState<any>("");
  const [current, setCurrent] = useState("home");

  const onMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setMenu([
      ...menuItems,
      !user && {
        label: <Link href="/user/login">로그인</Link>,
        key: "login",
      },
    ]);
  }, [user]);

  return (
    <>
      <Menu onClick={onMenu} selectedKeys={[current]} items={menu} mode="horizontal" theme="dark" />
    </>
  );
};

export default Nav;
