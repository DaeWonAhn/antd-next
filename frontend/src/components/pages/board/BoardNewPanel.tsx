import React from "react";
import { Button, Form, Input, InputNumber, Row, Col, Radio } from "antd";
import dwClient from "@/lib/client";

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
      console.log("post success");
      // router.push("/boards");
    } catch (err) {
      console.log(err);
    }
  };

  const { TextArea } = Input;

  const [form] = Form.useForm();
  /*


  restful 명명
  복수형

    axios.get("url", {
      params: {
        ...values
      }
    })
    .then(function (response) {
      // response  
    }).catch(function (error) {
      // 오류발생시 실행
    }).then(function() {
      // 항상 실행
    });
  };
  */

  return (
    <>
      <Row justify="center">
        <Col span={10}>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
          >
            <Form.Item name={["board", "title"]} label="Title">
              <Input />
            </Form.Item>
            <Form.Item name={["board", "content"]} label="content">
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </Form.Item>

            {/* 
            <Form.Item label="Completed" name={["user", "completed"]}>
              <Radio.Group>
                <Radio value="true"> true </Radio>
                <Radio value="false"> false </Radio>
              </Radio.Group>
            </Form.Item>
              */}

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
export default BoardNewPanel;
