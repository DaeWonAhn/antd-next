import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";

const BoardSearchForm: React.FC = () => {
  const { token } = theme.useToken();

  const listStyle: React.CSSProperties = {
    textAlign: "center",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  return (
    <div>
      <Form.Item
        label=""
        style={listStyle}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="title search" style={{ width: 300 }} />
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </div>
  );
};

export default BoardSearchForm;
