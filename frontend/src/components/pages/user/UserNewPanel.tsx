import React from "react";
import { Button, Form, Input, InputNumber, Row, Col, Radio, Space } from "antd";
import form from "antd/es/form";
import axios from "axios";
import { useRouter } from "next/router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const UserNewPanel = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("values: ", values);
    const userEmail = values.user.email;
    const userAge = values.user.age;
    const userPass = values.user.password;

    const postData = {
      email: userEmail,
      age: userAge,
      password: userPass,
    };

    insertUser(postData);
  };

  const insertUser = async (postData: any) => {
    try {
      const res = await axios.post("/api/users", postData);
      const data = res.data;
      console.log("post success");
      router.push("/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ height: "190px" }}>
        <Space direction="vertical" size={10}></Space>
      </div>

      <Row justify="center">
        <Col span={9}>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 500 }}
            validateMessages={validateMessages}
          >
            <Form.Item name={["user", "email"]} label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name={["user", "password"]}
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name={["user", "age"]} label="Age">
              <InputNumber min={1} max={100} defaultValue={23} />
            </Form.Item>

            <Form.Item label="Phone">
              <Input.Group compact>
                <Input style={{ width: "30%" }} placeholder="010" name="phone1" />
                <Input style={{ width: "40%" }} placeholder="1234" name="phone2" />
                <Input style={{ width: "30%" }} placeholder="5678" name="phone3" />
              </Input.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserNewPanel;
