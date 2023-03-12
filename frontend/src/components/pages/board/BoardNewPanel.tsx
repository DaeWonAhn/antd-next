import React from "react";
import { Button, Form, Input, InputNumber, Row, Col, Radio, message, Space } from "antd";
import dwClient from "@/lib/client";
import router from "next/router";
import { useGlobalContext } from "@/contexts/global";

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

const BoardNewPanel = () => {
  const { user } = useGlobalContext();

  const onFinish = (values: any) => {
    console.log("values: ", values);

    const postData: any = {
      title: values.board.title,
      content: values.board.content,
    };
    insertBoard(postData);
  };

  const insertBoard = async (postData: any) => {
    try {
      const res = await dwClient.post("/boards", postData);
      const data = res.data;
      message.info("등록되었습니다.");
      router.push("/board");
    } catch (err) {
      console.log(err);
    }
  };

  const { TextArea } = Input;

  const [form] = Form.useForm();

  return (
    <>
      <div style={{ height: "130px" }}>
        <Space direction="vertical" size={10}></Space>
      </div>

      {/* <Row justify="center"> */}
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
        validateMessages={validateMessages}
      >
        <Form.Item name={["board", "title"]} label="Title">
          <Input />
        </Form.Item>
        <Form.Item name={["board", "content"]} label="content">
          <TextArea />
        </Form.Item>

        <Form.Item label="Email">
          <Input value={user?.email} disabled />
        </Form.Item>

        {/* 
            <Form.Item label="Completed" name={["user", "completed"]}>
              <Radio.Group>
                <Radio value="true"> true </Radio>
                <Radio value="false"> false </Radio>
              </Radio.Group>
            </Form.Item>
              */}

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default BoardNewPanel;
