import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";

const { Option } = Select;

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const formStyle = {
    /*
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
    */
  };

  const getFields = () => {
    const children = [];

    /*
    for (let i = 0; i < 2; i++) {
      children.push(
        <Form.Item
          name={`field-${i}`}
          label={`Field ${i}`}
          rules={[
            {
              required: true,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" style={{ width: 500 }} />
        </Form.Item>
      );
    }
    */

    children.push(
      <Form.Item
        label="제목 검색"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="제목을 입력하세요" style={{ width: 400 }} />
      </Form.Item>
    );

    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      {/* <Row style={{ textAlign: "center" }}>{getFields()}</Row> */}
      <Row>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          {getFields()}{" "}
        </Col>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const BoardSearchForm: React.FC = () => {
  const { token } = theme.useToken();

  const listStyle: React.CSSProperties = {
    lineHeight: "200px",
    textAlign: "center",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  return (
    <div>
      <AdvancedSearchForm />
    </div>
  );
};

export default BoardSearchForm;
