import { DataType } from "@/types";
import { Modal } from "antd";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const logout = () => {
  const Router = useRouter();
  const [user, setUser] = useState<DataType>();

  useEffect(() => {
    localStorage.getItem("user");
    let user = localStorage.getItem("user") || "{}";
    setUser(JSON.parse(user));

    console.log("user: ", user);

    if (user !== "{}") {
      localStorage.clear();
      Router.push("/");

      Modal.warning({
        title: "로그아웃",
        content: "로그아웃 되었습니다",
      });
    } else {
      Modal.warning({
        title: "로그인해주세요",
        content: "로그인이 필요합니다",
      });
      Router.push("/user/login");
    }
  }, []);
  return (
    <div>
      <p>1</p>
    </div>
  );
};

export default logout;
