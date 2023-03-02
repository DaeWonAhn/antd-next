import React from "react";
import Nav from "./Nav";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
