import { Content } from "antd/es/layout/layout";
import React from "react";
import UserList from "@/components/pages/user/UserList";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const index = () => {
  return (
    <>
      <div className="site-layout-content">
        <UserList></UserList>
      </div>
    </>
  );
};

export default index;
