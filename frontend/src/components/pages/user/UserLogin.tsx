import React, { useState } from "react";

import { useRouter } from "next/router";

import { Button, Checkbox, Form, Input, Space, Row, Col, Modal } from "antd";
import dwClient from "@/lib/client";
import axios from "axios";
import { useGlobalContext } from "@/contexts/global";

let userInfo: { email: any; password: any };

const UserLogin = () => {
  const router = useRouter();
  const { setUser } = useGlobalContext();

  const handleFinish = async (values: any) => {
    userInfo = {
      email: values.email,
      password: values.password,
    };

    await loginUser();
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loginUser = async () => {
    try {
      const res = await axios.post("/api/auth/login", userInfo);

      if (res.status === 201) {
        localStorage.setItem("token", res.data.access_token);

        setUser(res.data.user);

        router.push("/");
      }
    } catch (e: any) {
      Modal.warning({
        title: "로그인 실패",
        content: "아이디,비밀번호 확인해주세요",
      });
      console.error(`${e}`);
    }
  };

  return (
    <>
      <div style={{ height: "190px" }}>
        <Space direction="vertical" size={10}></Space>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        layout="horizontal"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserLogin;
